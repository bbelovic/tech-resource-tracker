package org.bbelovic.techresourcetracker;

public interface TechResourceService {
    /**
     * Persists resource into underlying persistent storage.
     * @param technologyResource resource to be persisted.
     */
    void save(TechnologyResource technologyResource);
    /**
     * Marks resource with given id as {@code PROCESSED}
     * @param id tech resource unique id
     */
    void markTechResourceAsRead(long id);
}
