package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.OutputFrame;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.io.File;
import java.util.function.Consumer;

import static java.util.concurrent.TimeUnit.MINUTES;

public class SimpleIT {
    @Test
    public void test() {

        DockerComposeContainer composeContainer = null;
        //PG - LOG:  database system is ready to accept connections
        //Selenium - Started Selenium Standalone , $MODULE_WORKING_DIR$

        try {
            ToStringConsumer toStringConsumer = new ToStringConsumer();
//            WaitingConsumer waitingConsumer = new WaitingConsumer();
//            Consumer<OutputFrame> composed = toStringConsumer.andThen(waitingConsumer);
            composeContainer = new DockerComposeContainer(new File("/home/bbelovic/DEVEL/tech-resource-tracker/docker-compose.yml"))

                    .withLogConsumer("e2e-tests_1", toStringConsumer);
//            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("spec SUCCESS in"), 1, MINUTES);
            composeContainer.start();

            String utf8String = toStringConsumer.toUtf8String();
            Assertions.assertTrue(utf8String.contains("spec SUCCESS in"), "Expecting to contain [SUCCESS] message but got: [" + utf8String + "]");

        } catch (Exception e) {
            Assertions.fail("Test failed unexpectedly", e);
        } finally {
            composeContainer.stop();
        }
    }
}
