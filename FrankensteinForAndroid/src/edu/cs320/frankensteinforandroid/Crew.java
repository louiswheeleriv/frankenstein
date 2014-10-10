package edu.cs320.frankensteinforandroid;

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
	
}
