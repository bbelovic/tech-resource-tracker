package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

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

    @PostMapping(value = "/tech-resources")
    public ResponseEntity<TechnologyResource> createNewTechnologyResource() {
        TechnologyResource technologyResource = new TechnologyResource();
        technologyResource.setTitle("new title");
        TechnologyResource persistedResource = resourceRepository.save(technologyResource);
        return new ResponseEntity<>(persistedResource, CREATED);
    }
}
