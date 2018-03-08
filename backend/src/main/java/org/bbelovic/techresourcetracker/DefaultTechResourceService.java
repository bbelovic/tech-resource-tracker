package org.bbelovic.techresourcetracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.PROCESSED;

@Service
public class DefaultTechResourceService implements TechResourceService {
    private static final Logger log = LoggerFactory.getLogger(DefaultTechResourceService.class);
    private final TechnologyResourceRepository resourceRepository;

    @Autowired
    public DefaultTechResourceService(TechnologyResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<TechResourceDetails> findFirst10ByStatusOrderByCreatedOnDesc() {
        return Collections.emptyList();
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
