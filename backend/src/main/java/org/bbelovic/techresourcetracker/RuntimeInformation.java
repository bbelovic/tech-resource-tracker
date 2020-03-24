package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RuntimeInformation(@JsonProperty("vendorName") String vendorName,
                                 @JsonProperty("feature") int feature) {
}
