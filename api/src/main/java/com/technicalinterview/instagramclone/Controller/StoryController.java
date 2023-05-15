package com.technicalinterview.instagramclone.Controller;

import com.technicalinterview.instagramclone.Entity.Story;
import com.technicalinterview.instagramclone.Service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class StoryController {

    @Autowired
    private StoryService storyService;


    @PostMapping("/stories")
    private String submitStory(@RequestBody Story story) {
        return storyService.submitDataIntoDB(story);
    }



    @GetMapping("/get")
    private CollectionModel<EntityModel<Story>> retrieveStory() {
        List<EntityModel<Story>> storyModels = new ArrayList<>();
        List<Story> stories = storyService.retrieveStory();

        for (Story story : stories) {
            EntityModel<Story> storyModel = EntityModel.of(story,
                    linkTo(methodOn(StoryController.class).getStoryByUserId(story.getUserId())).withSelfRel());
            storyModels.add(storyModel);
        }

        return CollectionModel.of(storyModels,
                linkTo(methodOn(StoryController.class).retrieveStory()).withSelfRel());
    }

    @GetMapping("/getAll/{userId}")
    private CollectionModel<EntityModel<Story>> getStoryByUserId(@PathVariable String userId) {
        List<EntityModel<Story>> storyModels = new ArrayList<>();
        Optional<Story> storyOptional = storyService.retrieveStoryByUserId(userId);
        if (storyOptional.isPresent()) {
            Story story = storyOptional.get();
            EntityModel<Story> storyModel = EntityModel.of(story,
                    linkTo(methodOn(StoryController.class).retrieveStory()).withRel("all-stories"));
            storyModels.add(storyModel);
        }
        return CollectionModel.of(storyModels,
                linkTo(methodOn(StoryController.class).getStoryByUserId(userId)).withSelfRel());
    }




    @PutMapping("/update/{id}")
    public Story updateStoryByUserId(@PathVariable String id, @RequestBody Story story) {
        return storyService.updateStoryByUserId(id, story);
    }

    @DeleteMapping("/delete/{id}")
    public Story deleteStoryByUserId(@PathVariable String id) {
        return storyService.deleteStory(id);
    }

}
