package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*

 http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#build-tool-plugins-maven-packaging

https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html

spring.main.web_environment=false
spring.main.banner_mode=off

environments:
    dev:
        name: Developer Setup
        url: http://dev.bar.com
    default:
        name: My Cool App
        url: http://foo.bar.com

 */


@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
	}
}
