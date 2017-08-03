package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TechResourcesController {
    private TechnologyResourceRepository resourceRepository;

    @Autowired
    public TechResourcesController(TechnologyResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @GetMapping(value = "/tech-resources")
    public List<TechnologyResource> resources() {
        return resourceRepository.findAll();
    }
}
