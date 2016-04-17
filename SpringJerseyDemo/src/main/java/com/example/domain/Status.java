package com.example.domain;

import lombok.Data;

/**
 * Created by ivo on 4/17/16.
 */
@Data
public class Status {
    /**
     * Created by ivo on 4/16/16.
     * <p>
     * TRYME:
     * <p>
     * http://www.baeldung.com/swagger-2-documentation-for-spring-rest-api
     * <p>
     * http://jakubstas.com/spring-jersey-swagger-configuration/#.VxKpQJMrJE4
     * <p>
     * http://www.insaneprogramming.be/blog/2015/09/04/spring-jaxrs/
     * <p>
     * https://dzone.com/articles/using-jax-rs-with-spring-boot-instead-of-mvc
     * <p>
     * https://github.com/swagger-api/swagger-codegen/blob/master/README.md#java-jax-rs-jersey-v118
     * <p>
     * brew install swagger-codegen
     * <p>
     * swagger-codegen generate \
     * -i http://petstore.swagger.io/v2/swagger.json \
     * -l jaxrs \
     * -o samples/server/petstore/jaxrs-jersey
     */

    int code;
    String message;

    public Status() {
    }

    public Status(int code, String message) {
        this.code = code;
        this.message = message;
    }

}

