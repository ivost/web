package com.example;

import lombok.Data;

/**
 * Created by ivo on 4/16/16.
 */
@Data
public class Status {

    int code;
    String message;

    public Status() {}

    public Status(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
