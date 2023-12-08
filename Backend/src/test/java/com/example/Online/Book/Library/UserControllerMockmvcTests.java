package com.example.Online.Book.Library;

import com.example.Online.Book.Library.dto.UserDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerMockmvcTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void testRegisterAndRetrieveUsers() throws Exception {
		// Register a new user
		UserDto userDto = new UserDto();
		userDto.setUserId(9L);
		userDto.setAddress("Dhaka");
		userDto.setEmail("asd@gmail.com");
		userDto.setFirstName("Khalid");
		userDto.setLastName("Vai");
		userDto.setPassword("123");
		userDto.setRole("CUSTOMER");

		ObjectMapper objectMapper = new ObjectMapper();
		String userDtoJson = objectMapper.writeValueAsString(userDto);

		mockMvc.perform(post("/users/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userDtoJson))
				.andExpect(status().isCreated());

		// Retrieve all users
		mockMvc.perform(get("/users/9"))
				.andExpect(status().isOk());
	}
}
