package org.bbelovic.techresourcetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnologyResourceRepository extends JpaRepository<TechnologyResource, Long> {
    List<TechnologyResource> findFirst10ByOrderByIdAsc();
}
