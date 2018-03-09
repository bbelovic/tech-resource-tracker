package org.bbelovic.techresourcetracker;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class TechResourceDetails {
    private Long id;
    private String title;
    private String link;
    private Set<Tag> tags;

    public TechResourceDetails(TechnologyResource resource) {
        this.id = resource.getId();
        this.title = resource.getTitle();
        this.link = resource.getLink();
        this.tags = new HashSet<>(resource.getTags());
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechResourceDetails that = (TechResourceDetails) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link) &&
                Objects.equals(tags, that.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, link, tags);
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

    public Set<Tag> getTags() {
        return new HashSet<>(tags);
    }
}