package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

public record TechResourceDetailsDTO(@JsonProperty("id") long id, @JsonProperty("username") String username,
                                     @JsonProperty("title") String title, @JsonProperty("link") String link,
                                     @JsonProperty("tagDTOs") Collection<TagDTO> tagDTOs) {
}
