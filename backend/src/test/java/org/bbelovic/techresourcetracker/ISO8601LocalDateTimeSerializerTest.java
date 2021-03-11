package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.PROCESSED;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.ARTICLE;

public class ISO8601LocalDateTimeSerializerTest {
    @Test
    public void should_serialize_local_date_time_to_json_string() throws Exception {
        var expected =
                """
                {"id":10,"title":"test title","link":"www.blabol.com","createdOn":"2018-01-01T10:20:30","status":"PROCESSED","type":"ARTICLE","tags":[{"id":1,"name":"java"}],"username":"jdoe"}
                """.strip();
        var mapper = new ObjectMapper();
        var module = new SimpleModule();
        module.addSerializer(LocalDateTime.class, new ISO8601LocalDateTimeSerializer());
        mapper.registerModule(module);
        var tag = new Tag();
        tag.setName("java");
        tag.setId(1L);

        var resource = new TechnologyResource();
        tag.getTechnologyResources().add(resource);
        resource.setId(10L);
        resource.setLink("www.blabol.com");
        resource.setTitle("test title");
        resource.setCreatedOn(LocalDateTime.of(2018, 1, 1, 10, 20, 30));
        resource.setStatus(PROCESSED);
        resource.setType(ARTICLE);
        resource.setTags(Collections.singleton(tag));
        resource.setUsername("jdoe");
        var actual = mapper.writeValueAsString(resource);
        assertThat(actual).isEqualTo(expected);
    }
}
