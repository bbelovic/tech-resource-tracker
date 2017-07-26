package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
public class TechResourcesController {
    @GetMapping(value = "/tech-resources123", produces = APPLICATION_JSON_UTF8_VALUE)
    public Collection<TechnologyResource> resources() {
        return Collections.emptyList();
    }
}
