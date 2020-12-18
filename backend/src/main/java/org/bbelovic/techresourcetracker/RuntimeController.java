package org.bbelovic.techresourcetracker;

import org.springframework.boot.info.BuildProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
public class RuntimeController {
    private static final String DATE_TIME_FORMAT = "d-L-y @ HH:mm";
    private final BuildProperties buildProperties;

    public RuntimeController(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @GetMapping(value = "/runtime", produces = APPLICATION_JSON_VALUE)
    @PostMapping(value = "/runtime", produces = APPLICATION_JSON_VALUE)
    public RuntimeInformation getRuntimeInformation() {
        var runtimeName = System.getProperty("java.runtime.name");
        int featureVersion = Runtime.version().feature();
        var formattedBuildTime = formatBuildTime();
        return new RuntimeInformation(runtimeName, featureVersion, formattedBuildTime);
    }

    private String formatBuildTime() {
        var buildTimeInstant = buildProperties.getTime();
        var buildTime = OffsetDateTime.ofInstant(buildTimeInstant, ZoneId.of("UTC"));
        return DateTimeFormatter.ofPattern(DATE_TIME_FORMAT).format(buildTime);
    }
}
