package org.bbelovic.techresourcetracker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnologyResourceRepository extends JpaRepository<TechnologyResource, Long> {
    @Query(value = "SELECT new org.bbelovic.techresourcetracker.TechResourceDetails(tr) " +
            "FROM TechnologyResource tr LEFT JOIN FETCH tr.tags t WHERE tr.status = 'NEW' ORDER BY tr.createdOn DESC")
    Page<TechResourceDetails> findFirst10ByStatusOrderByCreatedOnDesc(Pageable pageable);
    List<TechnologyResource> findFirst10ByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status);

    Page<TechnologyResource> findByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status, Pageable pageable);
}
