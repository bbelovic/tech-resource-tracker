package org.bbelovic.techresourcetracker;

import org.springframework.beans.factory.annotation.Autowired;
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
    private final TechResourceService techResourceService;

    @Autowired
    public TechResourcesController(final TechResourceService techResourceService) {
        this.techResourceService = techResourceService;
    }

    @GetMapping(value = "/tech-resources")
    public ResponseEntity<List<TechResourceDetails>> resources() {
        List<TechResourceDetails> details = techResourceService.getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(NEW, 0, 10);
        return new ResponseEntity<>(details, OK);
    }

    @GetMapping(value = "/tech-resources/{id}")
    public ResponseEntity<TechnologyResourceDTO> getTechnologyResourceById(@PathVariable long id) {
        TechnologyResource resource = techResourceService.getTechResourceById(id);
        if (resource == null) {
            return new ResponseEntity<>(NOT_FOUND);
        }
        TechnologyResourceDTO resourceDTO = prepareTechnologyResourceDTO(resource);
        return new ResponseEntity<>(resourceDTO, OK);
    }

    @GetMapping(value = "/tech-resources/page/{pageId}/pageSize/{size}")
    public ResponseEntity<List<TechResourceDetails>> getPagedTechnologyResources(@PathVariable int pageId, @PathVariable int size) {
        List<TechResourceDetails> details = techResourceService.getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(NEW, pageId, size);
        return new ResponseEntity<>(details, OK);
    }

    @PostMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResourceDTO> createNewTechnologyResource(@RequestBody TechnologyResourceDTO resourceDto) {
        TechnologyResource resourceToSave = prepareTechnologyResource(resourceDto);
        TechnologyResource persistedResource = techResourceService.save(resourceToSave);
        TechnologyResourceDTO responseDTO = prepareTechnologyResourceDTO(persistedResource);
        return new ResponseEntity<>(responseDTO, CREATED);
    }

    @PutMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> updateTechnologyResource(@RequestBody TechnologyResourceDTO resourceDto) {
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
