package org.bbelovic.techresourcetracker.user.service;

import org.bbelovic.techresourcetracker.user.entity.User;
import org.bbelovic.techresourcetracker.user.repository.UserDetailsRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class DefaultUserDetailsService implements UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;

    public DefaultUserDetailsService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userDetailsRepository.findByUsername(username);

        return user;
    }
}
