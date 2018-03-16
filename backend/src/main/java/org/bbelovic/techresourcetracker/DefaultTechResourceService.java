package org.bbelovic.techresourcetracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.NEW;
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

    public List<TechResourceDetails> findFirst10ByStatusOrderByCreatedOnDesc() {
        final List<TechResourceDetails> detailsList = resourceRepository.findTechResourceDetailsByStatusOrderByCreatedOnDesc(NEW, new PageRequest(0, 10));
        for (final TechResourceDetails detail: detailsList) {
            final TechnologyResource technologyResource = new TechnologyResource();
            technologyResource.setId(detail.getId());
            final List<Tag> list = tagRepository.findTagsByResource(technologyResource);
            detail.addTags(list);
        }
        return detailsList;
    }

    @Override
    @Transactional
    public void save(TechnologyResource technologyResource) {
        log.info("Saving resource [{}].", technologyResource);
        resourceRepository.save(technologyResource);
    }

    @Override
    @Transactional
    public void markTechResourceAsRead(long id) {
        log.info("Marking resource with id [{}] as read.", id);
        TechnologyResource technologyResource = resourceRepository.findOne(id);
        technologyResource.setStatus(PROCESSED);
        resourceRepository.save(technologyResource);
    }
}
