package org.bbelovic.techresourcetracker;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service defining basic CRUD operations for {@code TechnologyResource}s.
 */
public interface TechResourceService {
    /**
     * Retrieves {@code TechnologyResource} by its id.
     *
     * @param id unique identifier of particular {@code TechnologyResource}.
     * @return an {@code Optional} holding {@code TechnologyResource} instance with given id or an empty {@code Optional}
     * when no {@code TechnologyResource} for given id has been found.
     */
    @Transactional(readOnly = true)
    Optional<TechnologyResource> getTechResourceById(Long id);

    /**
     * Retrieves collection of {@code TechnologyResource}s with given status and for specified username.
     * Returned collection is paged according to paging requirements.
     *
     * @param status   status of {@code TechnologyResource}
     * @param username username specifying user who owns {@code TechnologyResource}
     * @param pageId   page number
     * @param pageSize number of entities returned per page
     * @return collection of {@code TechnologyResource}s with given status and for specified username.
     */
    List<TechResourceDetails> getTechResourceDetailsPageByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status,
                                                                                     String username, int pageId,
                                                                                     int pageSize);

    /**
     * Persists resource into underlying persistent storage.
     *
     * @param technologyResource resource to be persisted.
     */
    TechnologyResource save(TechnologyResource technologyResource);

    /**
     * Marks resource with given id as {@code PROCESSED}
     *
     * @param id tech resource unique id
     */
    void markTechResourceAsRead(long id);
}
