package org.bbelovic.techresourcetracker;

public interface TechResourceService {
    /**
     * Marks resource with given id as {@code PROCESSED}
     * @param id tech resource unique id
     */
    void markTechResourceAsRead(long id);
}
