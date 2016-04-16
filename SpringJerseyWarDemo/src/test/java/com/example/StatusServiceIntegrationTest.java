package com.example;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DemoApplication.class)
@IntegrationTest("server.port=8088")
@WebAppConfiguration
public class StatusServiceIntegrationTest {

	private RestTemplate restTemplate = new TestRestTemplate();

	@Test
	public void statusShouldBeOK() {
		ResponseEntity<Status> entity =
				restTemplate.getForEntity("http://localhost:8088/status", Status.class);
		Status status = entity.getBody();
		System.out.println(entity.toString());
		assertThat("HTTP OK", entity.getStatusCode().is2xxSuccessful());
		assertThat("status 1", status.getCode(), is(1));
	}
}
