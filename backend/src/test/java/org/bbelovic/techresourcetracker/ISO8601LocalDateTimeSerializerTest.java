package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.Collections;

import static java.util.Collections.emptySet;
import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.PROCESSED;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.ARTICLE;

public class ISO8601LocalDateTimeSerializerTest {
    @Test
    public void should_serialize_local_date_time_to_json_string() throws Exception {
        String expected = "{\"id\":10,\"title\":\"test title\"," +
                "\"link\":\"www.blabol.com\",\"createdOn\":\"2018-01-01T10:20:30\"," +
                "\"status\":\"PROCESSED\",\"type\":\"ARTICLE\",\"tags\":[{\"id\":1,\"name\":\"java\"}]}";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(LocalDateTime.class, new ISO8601LocalDateTimeSerializer());
        mapper.registerModule(module);
        Tag tag = new Tag();
        tag.setName("java");
        tag.setId(1L);

        TechnologyResource resource = new TechnologyResource();
        tag.getTechnologyResources().add(resource);
        resource.setId(10L);
        resource.setLink("www.blabol.com");
        resource.setTitle("test title");
        resource.setCreatedOn(LocalDateTime.of(2018, 1, 1, 10, 20, 30));
        resource.setStatus(PROCESSED);
        resource.setType(ARTICLE);
        resource.setTags(Collections.singleton(tag));
        String actual = mapper.writeValueAsString(resource);
        Assert.assertEquals(expected, actual);
    }
}
