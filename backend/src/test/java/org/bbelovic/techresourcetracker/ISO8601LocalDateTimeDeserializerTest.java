package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;

public class ISO8601LocalDateTimeDeserializerTest {
    @Test
    public void should_deserialize_local_date_time_from_json_string() throws Exception {
        String json = "{\"id\":10,\"title\":\"test title\"," +
                "\"link\":\"www.blabol.com\",\"createdOn\":\"2018-01-01T10:20:30\"}";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addDeserializer(LocalDateTime.class, new ISO8601LocalDateTimeDeserializer());
        mapper.registerModule(module);

        TechnologyResource expected = new TechnologyResource();
        expected.setId(10L);
        expected.setTitle("test title");
        expected.setLink("www.blabol.com");
        expected.setCreatedOn(LocalDateTime.of(2018, 1, 1, 10, 20, 30));

        Object actual = mapper.readerFor(TechnologyResource.class).readValue(json);
        Assert.assertEquals(expected, actual);

    }
}
