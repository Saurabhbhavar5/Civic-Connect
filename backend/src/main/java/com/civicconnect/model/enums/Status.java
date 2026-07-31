package com.civicconnect.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Status {
    PENDING,
    IN_PROGRESS,
    RESOLVED,
    REJECTED;

    @JsonCreator
    public static Status fromString(String value) {
        return Status.valueOf(value.trim().toUpperCase().replace(" ", "_"));
    }
}