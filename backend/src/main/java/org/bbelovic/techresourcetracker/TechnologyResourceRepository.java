package org.bbelovic.techresourcetracker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnologyResourceRepository extends JpaRepository<TechnologyResource, Long> {

    @Query("select new org.bbelovic.techresourcetracker.TechResourceDetails(t.id, t.username, t.title, t.link) from TechnologyResource t " +
            "where status = :status and username = :username order by t.createdOn desc")
    List<TechResourceDetails> findTechResourceDetailsByStatusOrderByCreatedOnDesc(@Param("status") TechnologyResourceStatus status,
                                                                                  @Param("username") String username, Pageable pageable);

    Page<TechnologyResource> findByStatusOrderByCreatedOnDesc(TechnologyResourceStatus status, Pageable pageable);
}
