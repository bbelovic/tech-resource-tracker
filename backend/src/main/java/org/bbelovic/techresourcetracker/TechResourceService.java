package org.bbelovic.techresourcetracker;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TechResourceService {
    @Transactional(readOnly = true)
    Optional<TechnologyResource> getTechResourceById(Long id);

    List<TechResourceDetails> getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status, String username, int pageId, int pageSize);
    /**
     * Persists resource into underlying persistent storage.
     * @param technologyResource resource to be persisted.
     */
    TechnologyResource save(TechnologyResource technologyResource);
    /**
     * Marks resource with given id as {@code PROCESSED}
     * @param id tech resource unique id
     */
    void markTechResourceAsRead(long id);
}
