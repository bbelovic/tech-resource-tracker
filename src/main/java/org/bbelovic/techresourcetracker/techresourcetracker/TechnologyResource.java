package org.bbelovic.techresourcetracker.techresourcetracker;

import java.io.Serializable;

public class TechnologyResource implements Serializable {

    private long id;
    public TechnologyResource() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
