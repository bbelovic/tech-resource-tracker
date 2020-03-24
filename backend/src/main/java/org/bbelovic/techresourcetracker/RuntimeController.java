package org.bbelovic.techresourcetracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
public class RuntimeController {

    @GetMapping(value = "/runtime", produces = APPLICATION_JSON_VALUE)
    public RuntimeInformation getRuntimeInformation() {
        var vendorName = System.getProperty("java.vendor");
        int featureVersion = Runtime.version().feature();
        return new RuntimeInformation(vendorName, featureVersion);
    }
}
