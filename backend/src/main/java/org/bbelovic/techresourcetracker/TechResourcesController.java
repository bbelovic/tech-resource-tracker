package org.bbelovic.techresourcetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;
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
    public ResponseEntity<List<TechResourceDetailsDTO>> resources() {
        var resourceDetails = techResourceService.getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(NEW, 0, 10);
        var resourceDetailsDTOs = resourceDetails.stream()
                .map(this::convertToDetailsDTO).collect(toList());
        return new ResponseEntity<>(resourceDetailsDTOs, OK);
    }

    @GetMapping(value = "/tech-resources/{id}")
    public ResponseEntity<TechnologyResourceDTO> getTechnologyResourceById(@PathVariable long id) {
        var resourceOptional = techResourceService.getTechResourceById(id);
        return resourceOptional.map(this::convertTechnologyResourceToDTO)
                .map(dto -> new ResponseEntity<>(dto, OK))
                .orElse(new ResponseEntity<>(NOT_FOUND));
    }

    @GetMapping(value = "/tech-resources/page/{pageId}/pageSize/{size}")
    public ResponseEntity<List<TechResourceDetailsDTO>> getPagedTechnologyResources(@PathVariable int pageId, @PathVariable int size) {
        List<TechResourceDetails> details = techResourceService.getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(NEW, pageId, size);
        List<TechResourceDetailsDTO> resourceDetailsDTOs = details.stream().map(this::convertToDetailsDTO).collect(toList());
        return new ResponseEntity<>(resourceDetailsDTOs, OK);
    }

    @PostMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResourceDTO> createNewTechnologyResource(@RequestBody TechnologyResourceDTO resourceDTO) {
        var resourceToSave = convertTechnologyResourceFromDTO(resourceDTO);
        var persistedResource = techResourceService.save(resourceToSave);
        var responseDTO = convertTechnologyResourceToDTO(persistedResource);
        return new ResponseEntity<>(responseDTO, CREATED);
    }

    @PutMapping(value = "/tech-resources", headers = "Content-Type=application/json;charset=UTF-8")
    public ResponseEntity<TechnologyResource> updateTechnologyResource(@RequestBody TechnologyResourceDTO resourceDTO) {
        var resourceToUpdate = convertTechnologyResourceFromDTO(resourceDTO);
        techResourceService.save(resourceToUpdate);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @PutMapping(value = "/markAsRead/{id}")
    public ResponseEntity<TechnologyResource> markAsRead(@PathVariable long id) {
        techResourceService.markTechResourceAsRead(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    private TechnologyResource convertTechnologyResourceFromDTO(@RequestBody TechnologyResourceDTO resourceDTO) {
        var technologyResource = new TechnologyResource();
        technologyResource.setId(resourceDTO.id());
        technologyResource.setType(resourceDTO.type());
        technologyResource.setStatus(resourceDTO.status());
        technologyResource.setCreatedOn(resourceDTO.createdOn());
        technologyResource.setLink(resourceDTO.link());
        technologyResource.setTitle(resourceDTO.title());
        technologyResource.setUsername(resourceDTO.username());
        resourceDTO.tags().forEach(tagDTO -> {
            var tag = new Tag();
            tag.setId(tagDTO.id());
            tag.setName(tagDTO.name());
            technologyResource.addTag(tag);
        });
        return technologyResource;
    }

    private TechnologyResourceDTO convertTechnologyResourceToDTO(TechnologyResource persistedResource) {
        Set<TagDTO> tagDTOs = persistedResource.getTags()
                .stream()
                .map(tag -> new TagDTO(tag.getId(), tag.getName()))
                .collect(toSet());
        return new TechnologyResourceDTO(persistedResource.getId(),
                persistedResource.getTitle(), persistedResource.getLink(), persistedResource.getCreatedOn(),
                persistedResource.getStatus(), persistedResource.getType(), persistedResource.getUsername(), tagDTOs);
    }

    private TechResourceDetailsDTO convertToDetailsDTO(TechResourceDetails details) {
        List<TagDTO> tagDTOs = details.getTags()
                .stream()
                .map(tag -> new TagDTO(tag.getId(), tag.getName()))
                .collect(toList());
        return new TechResourceDetailsDTO(details.getId(), details.getTitle(), details.getLink(), tagDTOs);
    }
}
