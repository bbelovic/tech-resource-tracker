package org.bbelovic.techresourcetracker.it;


import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.output.ToStringConsumer;
import org.testcontainers.containers.output.WaitingConsumer;

import java.nio.file.Paths;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicReference;

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

            var cypressStatus = new AtomicReference<CypressStatus>();
            try {
                waitingConsumer.waitUntil(outputFrame -> {
                    var output = outputFrame.getUtf8String();
                    if (output.contains("All specs passed")) {
                        cypressStatus.set(CypressStatus.PASSED);
                        return true;
                    }
                    if (isCypressFailure(output)) {
                        cypressStatus.set(CypressStatus.FAILED);
                        return true;
                    }
                    return false;
                }, 3, MINUTES);
            } catch (TimeoutException e) {
                fail("Timed out waiting for Cypress to finish. Captured output:\n" + toStringConsumer.toUtf8String(), e);
            }

            var cypressOutput = toStringConsumer.toUtf8String();
            if (cypressStatus.get() != CypressStatus.PASSED) {
                fail("Cypress tests failed:\n" + cypressOutput);
            }
        } catch (Exception e) {
            fail("Test failed unexpectedly", e);
        }
    }

    private static boolean isCypressFailure(String output) {
        return output.contains(" failing")
                || output.contains("AssertionError")
                || output.contains("Timed out retrying")
                || output.contains("CypressError");
    }

    private enum CypressStatus {
        PASSED,
        FAILED
    }
}
