package com.example.frankenstein;

public class Crew {
	
	long crew_id;
	String name;
	String bio;
	String responsibilities;
	
	public Crew(){
		
	}
	
	public long getCrewId(){
		return crew_id;
	}
	
	public void setCrewId(long crew_id){
		this.crew_id = crew_id;
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
	
	public String getResponsibilities(){
		return responsibilities;
	}
	
	public void setResponsibilities(String responsibilities){
		this.responsibilities = responsibilities;
	}

}
