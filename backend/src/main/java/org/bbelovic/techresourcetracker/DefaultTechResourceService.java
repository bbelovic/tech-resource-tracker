package org.bbelovic.techresourcetracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.PROCESSED;

@Service
public class DefaultTechResourceService implements TechResourceService {
    private static final Logger log = LoggerFactory.getLogger(DefaultTechResourceService.class);
    private final TechnologyResourceRepository resourceRepository;
    private final TagRepository tagRepository;

    @Autowired
    public DefaultTechResourceService(TechnologyResourceRepository resourceRepository, TagRepository tagRepository) {
        this.resourceRepository = resourceRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TechnologyResource> getTechResourceById(Long id) {
        log.info("Loading technology resource with id [{}].", id);
        var resource = resourceRepository.findById(id);
        log.trace("Returning resource [{}] for id [{}].", resource, id);
        return resource;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TechResourceDetails> getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status,
                                                                                            String username, int pageId, int pageSize) {
        log.info("Getting [{}] resources on page [{}] for user [{}] with status [{}] ordered by creation date descending.", pageSize, pageId, username, status);
        final var detailsList = resourceRepository.findTechResourceDetailsByStatusOrderByCreatedOnDesc(status, username, PageRequest.of(pageId, pageSize));
        for (final var detail: detailsList) {
            final var newResource = new TechnologyResource();
            newResource.setId(detail.getId());
            final var tagsByResource = tagRepository.findTagsByResource(newResource);
            detail.addTags(tagsByResource);
        }
        log.trace("Retrieved resources: [{}]", detailsList);
        return detailsList;
    }

    @Override
    @Transactional
    public TechnologyResource save(TechnologyResource technologyResource) {
        log.info("Saving resource [{}].", technologyResource);
        var persistedResource = resourceRepository.save(technologyResource);
        log.trace("Saved resource: [{}].", persistedResource);
        return persistedResource;
    }

    @Override
    @Transactional
    public void markTechResourceAsRead(long id) {
        log.info("Marking resource with id [{}] as read.", id);
        var resourceOptional = resourceRepository.findById(id);
        resourceOptional.ifPresent(technologyResource -> {
            technologyResource.setStatus(PROCESSED);
            resourceRepository.save(technologyResource);
        });
    }
}
