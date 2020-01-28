package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.NEW;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.PRESENTATION;

public class ISO8601LocalDateTimeDeserializerTest {
    @Test
    public void should_deserialize_local_date_time_from_json_string() throws Exception {
        var json =
                """
                {"id":10,"title":"test title",
                "link":"www.blabol.com","createdOn":"2018-01-01T10:20:30", "type":"PRESENTATION",
                "status":"NEW", "tags":[{"id":1, "name":"java"}]}
               """;
        var mapper = new ObjectMapper();
        var module = new SimpleModule();
        module.addDeserializer(LocalDateTime.class, new ISO8601LocalDateTimeDeserializer());
        mapper.registerModule(module);

        var expected = new TechnologyResourceDTO(10L, "test title", "www.blabol.com",
                LocalDateTime.of(2018, 1, 1, 10, 20, 30), NEW, PRESENTATION,
                Collections.singleton(new TagDTO(1L, "java")));
        Object dtoValue = mapper.readerFor(TechnologyResourceDTO.class).readValue(json);
        assertThat(dtoValue).isEqualTo(expected);
    }
}
