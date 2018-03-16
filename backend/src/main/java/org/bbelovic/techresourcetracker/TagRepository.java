package org.bbelovic.techresourcetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("select t from Tag t where :resource member of t.technologyResources")
    List<Tag> findTagsByResource(@Param("resource") TechnologyResource resource);
}
