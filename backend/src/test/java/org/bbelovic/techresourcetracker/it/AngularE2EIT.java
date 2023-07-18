package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.nio.file.Paths;
import java.util.Arrays;
import java.util.regex.Pattern;

import static java.util.concurrent.TimeUnit.MINUTES;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

public class AngularE2EIT {

    private static final Logger LOGGER = LoggerFactory.getLogger(AngularE2EIT.class);
    private static final String ALL_SPECS_PASSED_REGEX = ".*All specs passed!.*";

    @Test
    public void executeAngularE2ETest() {

        DockerComposeContainer composeContainer = null;
        try {
            Slf4jLogConsumer slf4jLogConsumer = new Slf4jLogConsumer(LOGGER);
            var composeFile = Paths.get("../docker-compose.yml").toFile();
            var toStringConsumer = new ToStringConsumer();
            var waitingConsumer = new WaitingConsumer();
            var composedConsumer = toStringConsumer.andThen(slf4jLogConsumer).andThen(waitingConsumer);
            composeContainer = new DockerComposeContainer(composeFile)
                    .withLogConsumer("e2e-tests_1", composedConsumer);
            composeContainer.start();
            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("Run Finished"), 3, MINUTES);

            var utf8String = toStringConsumer.toUtf8String();
            var actual = Arrays.stream(utf8String.split("\n"))
                    .filter(s -> s.matches(ALL_SPECS_PASSED_REGEX))
                    .findFirst();
            actual.ifPresentOrElse(this::assertContainerOutput, this::failSuccessMessageNotFound);

        } catch (Exception e) {
            fail("Test failed unexpectedly", e);
        } finally {
            if (composeContainer != null) {
                composeContainer.stop();
            }
        }
    }

    private void assertContainerOutput(String logOutput) {
        var pattern = Pattern.compile(ALL_SPECS_PASSED_REGEX);
        var matcher = pattern.matcher(logOutput);
        assertTrue(matcher.matches(), "Expected all specs to pass, but some failed.");
    }

    private void failSuccessMessageNotFound() {
        fail("Test execution success message not found in container output!");
    }
}
