package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*

 http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#build-tool-plugins-maven-packaging

 https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html

Actuator HTTP endpoints are only available for Spring MVC-based applications.
If you want to use Jersey and still use the actuator you will need to enable
Spring MVC(by depending on spring-boot-starter-web,for example).
By default,both Jersey and the Spring MVC dispatcher servlet are mapped
to the same path(/).You will need to change the path for one of them
(by configuring server.servlet-path for Spring MVC or
spring.jersey.application-path for Jersey).
For example, if you add server.servlet-path=/system into application.properties,
the actuator HTTP endpoints will be available under/system.


 */



@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }
}
