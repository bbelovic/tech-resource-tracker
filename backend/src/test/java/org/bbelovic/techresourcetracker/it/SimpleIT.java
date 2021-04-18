package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.io.File;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.MINUTES;

public class SimpleIT {
    @Test
    public void test() {

        DockerComposeContainer composeContainer = null;
        //PG - LOG:  database system is ready to accept connections
        //Selenium - Started Selenium Standalone , $MODULE_WORKING_DIR$

        try {
            WaitingConsumer waitingConsumer = new WaitingConsumer();
            waitingConsumer.andThen(new ToStringConsumer());
            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("spec SUCCESS in"), 1, MINUTES);
            composeContainer = new DockerComposeContainer(new File("/home/bbelovic/DEVEL/tech-resource-tracker/docker-compose.yml"))
                    .withLogConsumer("e2e-tests_1", waitingConsumer);
            composeContainer.start();

            ToStringConsumer toStringConsumer = new ToStringConsumer();
//            Assertions.assertTrue(containerByServiceName.isPresent());
        } catch (TimeoutException e) {
            e.printStackTrace();
        } finally {
            composeContainer.stop();
        }
    }
}
