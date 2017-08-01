package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnologyResourceRepository extends CrudRepository<TechnologyResource, Long> {
}
