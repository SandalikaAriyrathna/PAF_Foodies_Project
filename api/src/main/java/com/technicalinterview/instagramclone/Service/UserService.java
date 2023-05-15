package com.technicalinterview.instagramclone.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technicalinterview.instagramclone.Entity.Users;
import com.technicalinterview.instagramclone.Repository.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;
	
	public Users submitMetaDataOfUser(Users user) {
		return userRepo.save(user);
	}
	
	public Users displayUserMetaData(String userid) {
		return userRepo.findByUserId(userid);
	}

	public Users updateUser(int id, Users users) {
        Users userVar = userRepo.findById(id).get();
        userVar.setProfileImage(users.getProfileImage());
        userVar.setUserName(users.getUserName());
		userVar.setName(users.getName());
        userRepo.save(userVar);
        return userVar;
    }

	public Users deleteUser(int id){
        Users user = userRepo.findById(id).get();
        userRepo.delete(user);
        return user;
    }

    
}
