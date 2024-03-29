package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.nio.file.Paths;

import static java.util.concurrent.TimeUnit.MINUTES;
import static org.junit.jupiter.api.Assertions.fail;

public class AngularE2EIT {

    private static final Logger LOGGER = LoggerFactory.getLogger(AngularE2EIT.class);

    @Test
    public void executeAngularE2ETest() {

        try (var composeContainer = new DockerComposeContainer(Paths.get("../docker-compose.yml").toFile())) {
            Slf4jLogConsumer slf4jLogConsumer = new Slf4jLogConsumer(LOGGER);
            var toStringConsumer = new ToStringConsumer();
            var waitingConsumer = new WaitingConsumer();
            var composedConsumer = toStringConsumer.andThen(slf4jLogConsumer).andThen(waitingConsumer);
            composeContainer.withLogConsumer("e2e-tests_1", composedConsumer);
            composeContainer.start();
            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("All specs passed"), 3, MINUTES);
        } catch (Exception e) {
            fail("Test failed unexpectedly", e);
        }
    }
}
