package org.bbelovic.techresourcetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("select t.name from Tag t where t.")
    List<String> findTagNamesByResourceId();
}
