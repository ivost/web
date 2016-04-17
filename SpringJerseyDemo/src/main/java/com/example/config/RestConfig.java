package com.example.config;

import com.example.StatusService;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

/**
 * Created by ivo on 4/16/16.
 * Jersey configuration
 */
@Configuration
public class RestConfig extends ResourceConfig {

    public RestConfig() {

        System.out.println("=== Jersey ResourceConfig ");

        register(StatusService.class);
    }
}