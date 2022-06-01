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
    private static final String TESTS_EXECUTED_REGEX = "Executed (\\d+) of (\\d+) specs? SUCCESS in.*";

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
            waitingConsumer.waitUntil(outputFrame -> outputFrame.getUtf8String().contains("SUCCESS in"), 2, MINUTES);

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
            var executedCount = matcher.group(1);
            var totalCount = matcher.group(2);
            assertEquals(executedCount, totalCount,
                    format("Executed test count [%s] should be equal to total test count [%s]", executedCount, totalCount));
        }
    }

    private void failSuccessMessageNotFound() {
        fail("Test execution success message not found in container output!");
    }
}
