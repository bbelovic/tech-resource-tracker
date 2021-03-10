package org.bbelovic.techresourcetracker;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import static java.lang.String.format;

public class TechResourceDetails {
    private final Long id;
    private final String username;
    private final String title;
    private final String link;
    private final List<Tag> tags;

    public TechResourceDetails(Long id, String username, String title, String link) {
        this.id = id;
        this.username = username;
        this.title = title;
        this.link = link;
        this.tags = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechResourceDetails that = (TechResourceDetails) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(username, that.username) &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, title, link);
    }

    @Override
    public String toString() {
        return format("TechResourceDetails[id=%d, username=%s, title=%s, link=%s]", id, username, title, link);
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void addTags(Collection<? extends Tag> tags) {
        this.tags.addAll(tags);
    }
}