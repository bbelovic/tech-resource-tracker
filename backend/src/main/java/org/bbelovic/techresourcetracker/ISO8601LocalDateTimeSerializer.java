package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.time.LocalDateTime;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME;

public class ISO8601LocalDateTimeSerializer extends StdSerializer<LocalDateTime> {
    public ISO8601LocalDateTimeSerializer() {
        this(null);
    }
    public ISO8601LocalDateTimeSerializer(Class<LocalDateTime> t) {
        super(t);
    }

    @Override
    public void serialize(LocalDateTime localDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeString(ISO_LOCAL_DATE_TIME.format(localDateTime));
    }
}
