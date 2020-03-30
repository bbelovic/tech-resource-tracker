package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RuntimeInformation(@JsonProperty("runtimeName") String runtimeName,
                                 @JsonProperty("feature") int feature,
                                 @JsonProperty("formattedBuildTime") String formattedBuildTime) {
}
