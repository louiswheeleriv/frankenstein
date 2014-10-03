package com.example.frankenstein;

public class Stage {

	long stage_id;
	String location;
	String description;
	
	public Stage(){
		
	}
	
	public long getStageId(){
		return stage_id;
	}
	
	public void setStageId(long stage_id){
		this.stage_id = stage_id;
	}
	
	public String getLocation(){
		return location;
	}
	
	public void setLocation(String location){
		this.location = location;
	}
	
	public String getDescription(){
		return description;
	}
	
	public void setDescription(String description){
		this.description = description;
	}
	
}
