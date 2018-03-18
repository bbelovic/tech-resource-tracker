package org.bbelovic.techresourcetracker;

import java.util.Collection;
import java.util.Objects;

import static java.lang.String.format;

public final class TechResourceDetailsDTO {
    private final long id;
    private final String title;
    private final String link;
    private final Collection<TagDTO> tagDTOs;

    public TechResourceDetailsDTO(long id, String title, String link, Collection<TagDTO> tagDTOs) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.tagDTOs = tagDTOs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechResourceDetailsDTO that = (TechResourceDetailsDTO) o;
        return id == that.id &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link) &&
                Objects.equals(tagDTOs, that.tagDTOs);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, link, tagDTOs);
    }

    @Override
    public String toString() {
        return format("TechResourceDetailsDTO[id=%d, title='%s', link='%s', tagDTOs=%s]",
                id, title, link, tagDTOs);
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public Collection<TagDTO> getTagDTOs() {
        return tagDTOs;
    }
}
