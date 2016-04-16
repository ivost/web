package com.example;

import lombok.Data;

/**
 * Created by ivo on 4/16/16.
 *
 * TRYME:
 *
 * http://www.baeldung.com/swagger-2-documentation-for-spring-rest-api
 *
 * http://jakubstas.com/spring-jersey-swagger-configuration/#.VxKpQJMrJE4
 *
 * http://www.insaneprogramming.be/blog/2015/09/04/spring-jaxrs/
 *
 * https://dzone.com/articles/using-jax-rs-with-spring-boot-instead-of-mvc
 *
 * https://github.com/swagger-api/swagger-codegen/blob/master/README.md#java-jax-rs-jersey-v118
 *
 * brew install swagger-codegen
 *
 swagger-codegen generate \
 -i http://petstore.swagger.io/v2/swagger.json \
 -l jaxrs \
 -o samples/server/petstore/jaxrs-jersey
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
