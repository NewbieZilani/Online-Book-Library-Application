package com.example.Online.Book.Library.service;

import com.example.Online.Book.Library.dto.BookDto;
import com.example.Online.Book.Library.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto) throws Exception;
    UserDto getUser(String email);
    UserDto getUserByUserId(Long id) throws Exception;
    List<UserDto> getAllUser() throws Exception;

}
