package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Crew {

	long crewId;
	String name;
	String bio;
	String responsibilities;
	
	public Crew(long crewId, String name, String bio, String responsibilities){
		this.crewId = crewId;
		this.name = name;
		this.bio = bio;
		this.responsibilities = responsibilities;
	}

	public long getCrewId() {
		return crewId;
	}

	public void setCrewId(long crewId) {
		this.crewId = crewId;
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

	public String getResponsibilities() {
		return responsibilities;
	}

	public void setResponsibilities(String responsibilities) {
		this.responsibilities = responsibilities;
	}
	
	public String getFullInfo(){
		return ("Crew ID: " + crewId + "\n" +
				"Name: " + name + "\n" +
				"Bio: " + bio + "\n" +
				"Responsibilities: " + responsibilities);
	}
	
	public static Crew parseCrewFromJSON(JSONObject jsonObject){
		try{
			long jsonId = jsonObject.getLong("id");
			String jsonName = jsonObject.getString("crew_name");
			String jsonBio = jsonObject.getString("crew_bio");
			String jsonResponsibilities = jsonObject.getString("crew_responsibility");
			
			Crew crew = new Crew(jsonId, jsonName, jsonBio, jsonResponsibilities);
			return crew;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
}
