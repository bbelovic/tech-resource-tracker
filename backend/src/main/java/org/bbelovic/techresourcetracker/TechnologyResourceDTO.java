package org.bbelovic.techresourcetracker;

import java.io.Serializable;
import java.time.LocalDateTime;

public class TechnologyResourceDTO implements Serializable {
    private Long id;
    private String title;
    private String link;
    private LocalDateTime createdOn;
    private TechnologyResourceStatus status;
    private TechnologyResourceType type;
    
}
