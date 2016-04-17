package com.example;

import com.example.config.Config;
import com.example.config.ConnectionSettings;
import com.example.domain.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by ivo on 4/16/16.
 */
@Service
@Component
@Path("/status")
public class StatusService {

    @Autowired
    private ConnectionSettings connection;

    @Autowired
    private Config config;

    /**
     * This will fire during startup
     */
    @PostConstruct
    public void openConnection() {
        System.out.println("=== PostConstruct openConnection: " + connection.getRemoteAddress());
        System.out.println("=== server[0]: " + config.getServers().get(0));
    }

    @GET
    @Produces("application/json")
    public Status getStatus() {
        return new Status(1, "OK");
    }
}