package com.civicconnect.dto;

import com.civicconnect.model.enums.Status;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    private Status status;
}
