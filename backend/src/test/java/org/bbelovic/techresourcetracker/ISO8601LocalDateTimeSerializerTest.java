package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.PROCESSED;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.ARTICLE;

public class ISO8601LocalDateTimeSerializerTest {
    @Test
    public void should_serialize_local_date_time_to_json_string() throws Exception {
        String expected = "{\"id\":10,\"title\":\"test title\"," +
                "\"link\":\"www.blabol.com\",\"createdOn\":\"2018-01-01T10:20:30\"," +
                "\"status\":\"PROCESSED\",\"type\":\"ARTICLE\"}";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(LocalDateTime.class, new ISO8601LocalDateTimeSerializer());
        mapper.registerModule(module);
        TechnologyResource resource = new TechnologyResource();
        resource.setId(10L);
        resource.setLink("www.blabol.com");
        resource.setTitle("test title");
        resource.setCreatedOn(LocalDateTime.of(2018, 1, 1, 10, 20, 30));
        resource.setStatus(PROCESSED);
        resource.setType(ARTICLE);
        String actual = mapper.writeValueAsString(resource);
        Assert.assertEquals(expected, actual);
    }
}
