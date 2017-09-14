package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@CrossOrigin
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

    @PostMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> createNewTechnologyResource(@RequestBody TechnologyResource resource) {
        TechnologyResource technologyResource = new TechnologyResource();
        technologyResource.setTitle(resource.getTitle());
        TechnologyResource persistedResource = resourceRepository.save(technologyResource);
        return new ResponseEntity<>(persistedResource, CREATED);
    }
}
