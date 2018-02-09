package org.bbelovic.techresourcetracker;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static java.lang.String.format;
import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "tags", schema = "public")
public class Tag {
    private static final String SEQUENCE_NAME = "tags_id_seq";
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, sequenceName = SEQUENCE_NAME, schema = "public", allocationSize = 1)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "tags", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<TechnologyResource> technologyResources = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TechnologyResource> getTechnologyResources() {
        return technologyResources;
    }

    public void setTechnologyResources(Set<TechnologyResource> technologyResources) {
        this.technologyResources = technologyResources;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(id, tag.id) &&
                Objects.equals(name, tag.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return format("Tag[id=%d, name='%s']", id, name);
    }
}
