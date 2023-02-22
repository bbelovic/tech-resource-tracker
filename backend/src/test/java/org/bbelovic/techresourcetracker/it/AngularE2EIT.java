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

import static java.lang.String.format;
import static java.util.concurrent.TimeUnit.MINUTES;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class AngularE2EIT {

    private static final Logger LOGGER = LoggerFactory.getLogger(AngularE2EIT.class);
    private static final String TESTS_EXECUTED_REGEX = ".*(\\d+) passing.*";

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
                    .filter(s -> s.matches(TESTS_EXECUTED_REGEX))
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
        var pattern = Pattern.compile(TESTS_EXECUTED_REGEX);
        var matcher = pattern.matcher(logOutput);
        if (matcher.matches()) {
            var expectedPassingCount = "2";
            var actualPassingCount = matcher.group(1);
            assertEquals(expectedPassingCount, actualPassingCount,
                    format("Executed test count [%s] should be equal to total test count [%s]", expectedPassingCount, actualPassingCount));
        }
    }

    private void failSuccessMessageNotFound() {
        fail("Test execution success message not found in container output!");
    }
}
