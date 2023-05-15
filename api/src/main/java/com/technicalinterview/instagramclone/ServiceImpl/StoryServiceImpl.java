package com.technicalinterview.instagramclone.ServiceImpl;

import com.technicalinterview.instagramclone.Entity.Story;
import com.technicalinterview.instagramclone.Entity.Users;
import com.technicalinterview.instagramclone.Repository.StoryRepo;
import com.technicalinterview.instagramclone.Repository.UserRepo;
import com.technicalinterview.instagramclone.Service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    StoryRepo storyRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public String submitDataIntoDB(Story story) {
       Users user = userRepo.findByUserId(story.getUserId());
        if (user != null && user.getUserName() != null) {
            story.setUserName(user.getUserName());
        }

        return storyRepo.save(story).getUserName();
    }


    @Override
    public List<Story> retrieveStory() {
        List<Story> storyList = storyRepo.findAll();
        for (Story story : storyList) {
            Users user = userRepo.findByUserId(story.getUserId());
            if (user != null) {
                story.setUserName(user.getUserName());
            }
        }
        return storyList;
    }

    @Override
    public Optional<Story> retrieveStoryByUserId(String userId) {
        Optional<Story> storyOptional = storyRepo.findByUserId(userId);
        if (storyOptional.isPresent()) {
            Story story = storyOptional.get();
            Users user = userRepo.findByUserId(story.getUserId());
            if (user != null) {
                story.setUserName(user.getUserName());
            }
        }
        return storyOptional;
    }

    @Override
    public Story updateStoryByUserId(String id, Story story) {
        Story story1 = storyRepo.findByStoryId(id).get();
//        Story storyv = storyRepo.findByStoryId(storyId).get();
        story1.setTitle(story.getTitle());
//        User user = userRepo.findByUserId(story.getUserId());
////        story.setUserName(user.getUserName());
//        if (user != null && user.getUserName() != null) {
//            story1.setUserName(user.getUserName());
//        }
        storyRepo.save(story1);
        return story1;
    }

    @Override
    public Story deleteStory(String id) {
        Story story = storyRepo.findByStoryId(id).get();
        storyRepo.delete(story);
        return story;
    }
}
