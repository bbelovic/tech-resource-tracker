package org.bbelovic.techresourcetracker.user.repository;

import org.bbelovic.techresourcetracker.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
