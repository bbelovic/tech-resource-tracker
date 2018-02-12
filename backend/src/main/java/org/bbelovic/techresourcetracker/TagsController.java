package org.bbelovic.techresourcetracker;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import static java.util.Arrays.asList;
import static org.springframework.http.HttpStatus.OK;

@Controller
public class TagsController {
    @GetMapping("/tags")
    public ResponseEntity<List<TagDTO>> tags() {
        List<TagDTO> dtos = asList(new TagDTO(1L, "xml"), new TagDTO(2L, "javascript"));
        return new ResponseEntity<>(dtos, OK);
    }
}
