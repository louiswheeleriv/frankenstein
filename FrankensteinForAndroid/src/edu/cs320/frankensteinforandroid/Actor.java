package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Actor {

	long actorId;
	String name;
	String bio;
	
	public Actor(long actorId, String name, String bio){
		this.actorId = actorId;
		this.name = name;
		this.bio = bio;
	}

	public long getActorId() {
		return actorId;
	}

	public void setActorId(long actorId) {
		this.actorId = actorId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}
	
	public String getFullInfo(){
		return ("Actor ID: " + actorId + "\n" +
				"Name: " + name + "\n" +
				"Bio: " + bio);
	}
	
	public static Actor parseActorFromJSON(JSONObject jsonObject){
		try{
			long jsonId = jsonObject.getLong("id");
			String jsonName = jsonObject.getString("actor_name");
			String jsonBio = jsonObject.getString("actor_bio");
			
			Actor actor = new Actor(jsonId, jsonName, jsonBio);
			return actor;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
}
