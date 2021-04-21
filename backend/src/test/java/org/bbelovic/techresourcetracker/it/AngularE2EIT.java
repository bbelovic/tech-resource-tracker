package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.OutputFrame;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.io.File;
import java.util.Arrays;
import java.util.function.Consumer;

import static java.util.concurrent.TimeUnit.MINUTES;

public class AngularE2EIT {

    @Test
    public void executeAngularE2ETest() {

        DockerComposeContainer composeContainer = null;
        try {
            ToStringConsumer toStringConsumer = new ToStringConsumer();
            WaitingConsumer waitingConsumer = new WaitingConsumer();
            Consumer<OutputFrame> composedConsumer = toStringConsumer.andThen(waitingConsumer);
            composeContainer = new DockerComposeContainer(new File("/home/bbelovic/DEVEL/tech-resource-tracker/docker-compose.yml"))
                    .withLogConsumer("e2e-tests_1", composedConsumer);
            composeContainer.start();
            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("spec SUCCESS in"), 1, MINUTES);

            String utf8String = toStringConsumer.toUtf8String();
            long actual = Arrays.stream(utf8String.split("\n"))
                    .filter(s -> s.matches("Executed (\\d+) of (\\d+) spec SUCCESS in.*"))
                    .count();
            Assertions.assertEquals(1, actual, "Expected exactly 1 line with success message in output");

        } catch (Exception e) {
            Assertions.fail("Test failed unexpectedly", e);
        } finally {
            if (composeContainer != null) {
                composeContainer.stop();
            }
        }
    }
}
