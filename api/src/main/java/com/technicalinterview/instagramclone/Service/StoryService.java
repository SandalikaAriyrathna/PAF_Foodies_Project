package com.technicalinterview.instagramclone.Service;
import com.technicalinterview.instagramclone.Entity.Story;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface StoryService {
    String submitDataIntoDB(Story story);

    List<Story> retrieveStory();

    Optional<Story> retrieveStoryByUserId(String userId);

    Story updateStoryByUserId(String id, Story story);

    Story deleteStory(String id);
}

