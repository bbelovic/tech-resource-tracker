package org.bbelovic.techresourcetracker;

import java.util.Objects;

public class TechResourceDetails {
    private Long id;
    private String title;
    private String link;

    public TechResourceDetails(Long id, String title, String link) {
        this.id = id;
        this.title = title;
        this.link = link;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechResourceDetails that = (TechResourceDetails) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, link);
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
}