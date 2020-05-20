package org.bbelovic.techresourcetracker.user.service;

import org.bbelovic.techresourcetracker.user.entity.User;
import org.bbelovic.techresourcetracker.user.repository.UserDetailsRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DefaultUserDetailsService implements UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;
    private final PasswordEncoder passwordEncoder;

    public DefaultUserDetailsService(UserDetailsRepository userDetailsRepository, PasswordEncoder passwordEncoder) {
        this.userDetailsRepository = userDetailsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String username) {
        return userDetailsRepository.findByUsername(username);
    }

    public User registerUser(@NotNull User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userDetailsRepository.save(user);
    }
}
