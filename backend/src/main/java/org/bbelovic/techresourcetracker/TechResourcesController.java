package org.bbelovic.techresourcetracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.NEW;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@CrossOrigin
public class TechResourcesController {
    private static final Logger log = LoggerFactory.getLogger(TechResourcesController.class);
    private TechnologyResourceRepository resourceRepository;

    @Autowired
    public TechResourcesController(TechnologyResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @GetMapping(value = "/tech-resources")
    public List<TechnologyResource> resources() {
        List<TechnologyResource> resources = resourceRepository.findFirst10ByStatusOrderByCreatedOnDesc(NEW);
        log.info("Found resources :{}.", resources);
        return resources;
    }

    @PostMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> createNewTechnologyResource(@RequestBody TechnologyResource resource) {
        log.info("Persisting resource [{}].", resource);
        TechnologyResource technologyResource = new TechnologyResource();
        technologyResource.setTitle(resource.getTitle());
        technologyResource.setLink(resource.getLink());
        technologyResource.setCreatedOn(resource.getCreatedOn());
        technologyResource.setStatus(resource.getStatus());
        TechnologyResource persistedResource = resourceRepository.save(technologyResource);
        log.info("Persisted entity: [{}]", persistedResource);
        return new ResponseEntity<>(persistedResource, CREATED);
    }

    @PutMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> updateTechnologyResource(@RequestBody TechnologyResource resource) {
        log.info("Updating resource: [{}].", resource);
        resourceRepository.save(resource);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @GetMapping(value = "/user")
    public Principal user(Principal user) {
        return user;
    }
}
