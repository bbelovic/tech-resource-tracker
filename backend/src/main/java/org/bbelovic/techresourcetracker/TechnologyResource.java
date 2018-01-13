package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import static java.lang.String.format;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "technology_resources", schema = "public")
public class TechnologyResource implements Serializable {

    private static final String SEQ_NAME = "technology_resources_id_seq";
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQ_NAME)
    @SequenceGenerator(name = SEQ_NAME, sequenceName = SEQ_NAME, allocationSize = 1, schema = "public")
    private Long id;

    private String title;
    private String link;
    @JsonDeserialize(using = ISO8601LocalDateTimeDeserializer.class)
    @JsonSerialize(using = ISO8601LocalDateTimeSerializer.class)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    @Column(name = "created_on")
    private LocalDateTime createdOn;
    @Enumerated(STRING)
    private TechnologyResourceStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public TechnologyResourceStatus getStatus() {
        return status;
    }

    public void setStatus(TechnologyResourceStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TechnologyResource that = (TechnologyResource) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(link, that.link) &&
                Objects.equals(createdOn, that.createdOn) &&
                status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, link, createdOn, status);
    }

    @Override
    public String toString() {
        return format("TechnologyResource[id=%d, title='%s', link='%s', createdOn='%s', status='%s']",
                id, title, link, createdOn, status);
    }
}
