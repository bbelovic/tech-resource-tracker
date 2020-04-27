package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TagDTO(@JsonProperty("id") Long id, @JsonProperty("name") String name) {
}
