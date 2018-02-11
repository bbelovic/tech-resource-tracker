package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

import static java.lang.String.format;

public class TechnologyResourceDTO implements Serializable {
    private final Long id;
    private final String title;
    private final String link;
    private final LocalDateTime createdOn;
    private final TechnologyResourceStatus status;
    private final TechnologyResourceType type;
    private final Set<TagDTO> tags;

    @JsonCreator
    public TechnologyResourceDTO(@JsonProperty("id") Long id,
                                 @JsonProperty("title") String title,
                                 @JsonProperty("link") String link,
                                 @JsonProperty("createdOn") LocalDateTime createdOn,
                                 @JsonProperty("status") TechnologyResourceStatus status,
                                 @JsonProperty("type") TechnologyResourceType type,
                                 @JsonProperty("tags") Set<TagDTO> tags) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.createdOn = createdOn;
        this.status = status;
        this.type = type;
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechnologyResourceDTO that = (TechnologyResourceDTO) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link) &&
                Objects.equals(createdOn, that.createdOn) &&
                status == that.status &&
                type == that.type &&
                Objects.equals(tags, that.tags);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, link, createdOn, status, type, tags);
    }

    @Override
    public String toString() {
        return format("TechnologyResourceDTO[id=%d, title='%s', link='%s', createdOn=%s, status=%s, type=%s, tags=%s]",
                id, title, link, createdOn, status, type, tags);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public TechnologyResourceStatus getStatus() {
        return status;
    }

    public TechnologyResourceType getType() {
        return type;
    }

    public Set<TagDTO> getTags() {
        return tags;
    }
}
