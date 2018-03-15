package org.bbelovic.techresourcetracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.NEW;
import static org.springframework.http.HttpStatus.*;

@RestController
@CrossOrigin
public class TechResourcesController {
    private static final Logger log = LoggerFactory.getLogger(TechResourcesController.class);
    private TechnologyResourceRepository resourceRepository;
    private TechResourceService techResourceService;

    @Autowired
    public TechResourcesController(TechnologyResourceRepository resourceRepository, TechResourceService techResourceService) {
        this.resourceRepository = resourceRepository;
        this.techResourceService = techResourceService;
    }

    @GetMapping(value = "/tech-resources")
    public ResponseEntity<List<TechResourceDetails>> resources() {
        List<TechResourceDetails> details = techResourceService.findFirst10ByStatusOrderByCreatedOnDesc();
        log.info("Returning 10 newest technology details: {}.", details);
        return new ResponseEntity<>(details, OK);
    }

    @GetMapping(value = "/tech-resources/{id}")
    public ResponseEntity<TechnologyResource> getTechnologyResourceById(@PathVariable long id) {
        log.info("Getting technology resource with id [{}].", id);
        TechnologyResource resource = resourceRepository.findOne(id);
        if (resource == null) {
            return new ResponseEntity<>(NOT_FOUND);
        }
        return new ResponseEntity<>(resource, OK);
    }

    @GetMapping(value = "/tech-resources/page/{pageId}/pageSize/{size}")
    public ResponseEntity<List<TechnologyResource>> getPagedTechnologyResources(@PathVariable int pageId, @PathVariable int size) {
        log.info("Loading technology resource by page with pageId [{}] and page size [{}].", pageId, size);
        Page<TechnologyResource> page = resourceRepository.findByStatusOrderByCreatedOnDesc(NEW, new PageRequest(pageId, size));
        return new ResponseEntity<>(page.getContent(), OK);
    }

    @PostMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResourceDTO> createNewTechnologyResource(@RequestBody TechnologyResourceDTO resourceDto) {
        log.info("Persisting resource [{}].", resourceDto);
        TechnologyResource resourceToSave = prepareTechnologyResource(resourceDto);
        TechnologyResource persistedResource = resourceRepository.save(resourceToSave);
        log.info("Persisted entity: [{}]", persistedResource);
        TechnologyResourceDTO responseDTO = prepareTechnologyResourceDTO(persistedResource);
        return new ResponseEntity<>(responseDTO, CREATED);
    }

    @PutMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> updateTechnologyResource(@RequestBody TechnologyResourceDTO resourceDto) {
        log.info("Updating resource: [{}].", resourceDto);
        TechnologyResource resourceToUpdate = prepareTechnologyResource(resourceDto);
        techResourceService.save(resourceToUpdate);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @PutMapping(value = "/markAsRead/{id}")
    public ResponseEntity<TechnologyResource> markAsRead(@PathVariable long id) {
        techResourceService.markTechResourceAsRead(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @GetMapping(value = "/user")
    public Principal user(Principal user) {
        return user;
    }

    private TechnologyResource prepareTechnologyResource(@RequestBody TechnologyResourceDTO resourceDto) {
        TechnologyResource resourceToUpdate = new TechnologyResource();
        resourceToUpdate.setId(resourceDto.getId());
        resourceToUpdate.setId(resourceDto.getId());
        resourceToUpdate.setType(resourceDto.getType());
        resourceToUpdate.setStatus(resourceDto.getStatus());
        resourceToUpdate.setCreatedOn(resourceDto.getCreatedOn());
        resourceToUpdate.setLink(resourceDto.getLink());
        resourceToUpdate.setTitle(resourceDto.getTitle());
        resourceDto.getTags().forEach(tagDTO -> {
            Tag tag = new Tag();
            tag.setId(tagDTO.getId());
            tag.setName(tagDTO.getName());
            resourceToUpdate.addTag(tag);
        });
        return resourceToUpdate;
    }

    private TechnologyResourceDTO prepareTechnologyResourceDTO(TechnologyResource persistedResource) {
        Set<TagDTO> tagDTOS = persistedResource.getTags()
                .stream()
                .map(tag -> new TagDTO(tag.getId(), tag.getName()))
                .collect(Collectors.toSet());
        return new TechnologyResourceDTO(persistedResource.getId(),
                persistedResource.getTitle(), persistedResource.getLink(), persistedResource.getCreatedOn(),
                persistedResource.getStatus(), persistedResource.getType(), tagDTOS);
    }
}
