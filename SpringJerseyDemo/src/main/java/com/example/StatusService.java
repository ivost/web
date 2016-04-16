package com.example;

import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by ivo on 4/16/16.
 */
@Component
@Path("/status")
public class StatusService {
    @GET
    @Produces("application/json")
    public Status getStatus() {
        return new Status(1, "OK");
    }
}