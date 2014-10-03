package com.example.frankenstein;

public class Actor {

	long actor_id;
	String name;
	String bio;
	
	public Actor(){
		
	}
	
	public long getActorId(){
		return actor_id;
	}
	
	public void setActorId(long actor_id){
		this.actor_id = actor_id;
	}
	
	public String getName(){
		return name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public String getBio(){
		return bio;
	}
	
	public void setBio(String bio){
		this.bio = bio;
	}
	
}
