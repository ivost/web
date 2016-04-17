package com.example;

import com.example.domain.Status;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.EmbeddedWebApplicationContext;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DemoApplication.class)
@IntegrationTest("server.port=0")
//@WebIntegrationTest("server.port:0")
@WebAppConfiguration
public class StatusServiceIntegrationTest {

	@Autowired
	EmbeddedWebApplicationContext server;

	@Value("${local.server.port}")
	int port;

	private RestTemplate restTemplate = new TestRestTemplate();

	@Test
	public void statusShouldBeOK() {
		String url = "http://localhost:" + port + "/status";
		System.out.println("Status test - port: " + port);
		ResponseEntity<Status> entity =
				restTemplate.getForEntity(url, Status.class);
        Status status = entity.getBody();
		assertThat("HTTP OK", entity.getStatusCode().is2xxSuccessful());
		assertThat("status 1", status.getCode(), is(1));
	}
}
