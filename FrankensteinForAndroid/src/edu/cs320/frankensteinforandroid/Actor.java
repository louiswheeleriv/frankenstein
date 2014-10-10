package edu.cs320.frankensteinforandroid;

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
	
}
