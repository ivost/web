package com.example;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

/**
 * Created by ivo on 4/16/16.
 */
@Configuration
public class RestConfig extends ResourceConfig {
    public RestConfig() {
        register(StatusService.class);
    }
}