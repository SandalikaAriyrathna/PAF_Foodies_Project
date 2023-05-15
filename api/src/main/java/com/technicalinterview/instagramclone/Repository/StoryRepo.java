package com.technicalinterview.instagramclone.Repository;

import com.technicalinterview.instagramclone.Entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoryRepo extends JpaRepository<Story, Long> {

    Optional<Story> findByUserId(String userId);

    Optional<Story> findByStoryId(String storyId);
}

