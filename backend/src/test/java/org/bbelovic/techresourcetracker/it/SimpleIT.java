package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;
import java.util.Optional;

public class SimpleIT {
    @Test
    public void test() {

        DockerComposeContainer composeContainer = new DockerComposeContainer(new File("/home/bbelovic/DEVEL/tech-resource-tracker/docker-compose.yml"))
                .withExposedService("selenium_1", 4444, Wait.forLogMessage("*.Started Selenium Standalone*.", 1));
        //PG - LOG:  database system is ready to accept connections
        //Selenium - Started Selenium Standalone , $MODULE_WORKING_DIR$

        composeContainer.start();
        Optional containerByServiceName = composeContainer.getContainerByServiceName("e2e-tests");
        Assertions.assertTrue(containerByServiceName.isPresent());
    }
}
