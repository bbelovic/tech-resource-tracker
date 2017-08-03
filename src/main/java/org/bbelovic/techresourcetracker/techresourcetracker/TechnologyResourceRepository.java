package org.bbelovic.techresourcetracker.techresourcetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnologyResourceRepository extends JpaRepository<TechnologyResource, Long> {
}
