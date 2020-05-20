package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.Set;

public record TechnologyResourceDTO(@JsonProperty("id") Long id,
                                    @JsonProperty("title") String title,
                                    @JsonProperty("link") String link,
                                    @JsonProperty("createdOn") LocalDateTime createdOn,
                                    @JsonProperty("status") TechnologyResourceStatus status,
                                    @JsonProperty("type") TechnologyResourceType type,
                                    @JsonProperty("tags") Set<TagDTO> tags) {
}
