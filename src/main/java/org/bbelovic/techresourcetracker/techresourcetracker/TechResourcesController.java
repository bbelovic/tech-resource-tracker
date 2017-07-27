package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class TechResourcesController {
    @GetMapping(value = "/tech-resources")
    public List<TechnologyResource> resources() {
        return Collections.singletonList(new TechnologyResource());
    }
}
