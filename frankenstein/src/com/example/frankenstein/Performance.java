package com.example.frankenstein;

import java.util.ArrayList;
import java.util.List;

public class Performance {

	long performance_id;
	String description;
	int startTime;
	
	List<Actor> actors = new ArrayList<Actor>();
	List<Crew> crew = new ArrayList<Crew>();
	Stage stage = new Stage();
	Production production = new Production();
	
	public Performance(){
		
	}

	public long getPerformanceId() {
		return performance_id;
	}

	public void setPerformanceId(long performance_id) {
		this.performance_id = performance_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Stage getStage() {
		return stage;
	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public Production getProduction() {
		return production;
	}

	public void setProduction(Production production) {
		this.production = production;
	}
	
	public List<Actor> getActors(){
		return actors;
	}
	
	public void setActors(List<Actor> actors){
		this.actors = actors;
	}
	
	public List<Crew> getCrew(){
		return crew;
	}
	
	public void setCrew(List<Crew> crew){
		this.crew = crew;
	}
	
}
