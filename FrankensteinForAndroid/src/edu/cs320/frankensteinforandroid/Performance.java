package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.json.JSONArray;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

public class Performance implements Parcelable{

	long performanceId;
	String info;
	Stage stage;
	Production production;
	Date startTime;
	
	List<Actor> actors;
	List<Crew> crew;
	
	public Performance(){
		
	}
	
	public Performance(long performanceId, String info, Stage stage, Production production, Date startTime, List<Actor> actors, List<Crew> crew){
		this.performanceId = performanceId;
		this.info = info;
		this.stage = stage;
		this.production = production;
		this.startTime = startTime;
		this.actors = actors;
		this.crew = crew;
	}

	public long getPerformanceId() {
		return performanceId;
	}

	public void setPerformanceId(long performanceId) {
		this.performanceId = performanceId;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Stage getStage() {
		return stage;
	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}

	public Production getProduction() {
		return production;
	}

	public void setProduction(Production production) {
		this.production = production;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public List<Actor> getActors() {
		return actors;
	}

	public void setActors(List<Actor> actors) {
		this.actors = actors;
	}

	public List<Crew> getCrew() {
		return crew;
	}

	public void setCrew(List<Crew> crew) {
		this.crew = crew;
	}
	
	public String getFullInfo(){
		String fullInfo = ("PERFORMANCE INFO\n" + info + "\n\n" +
				"STAGE\nLocation: " + stage.getLocation() + "\n" +
				"Info: " + stage.getInfo() + "\n\n" +
				"TIME\n" + startTime + "\n\n" +
				"ACTORS\n");
		
		for(int i = 0; i < actors.size(); i++){
			Actor a = actors.get(i);
			fullInfo += ("Name: " + a.getName() + "\n" +
						 "Bio: " + a.getBio() + "\n\n");
		}
		
		fullInfo += "CREW\n";
		
		for(int i = 0; i < crew.size(); i++){
			Crew c = crew.get(i);
			fullInfo += ("Name: " + c.getName() + "\n" +
						 "Job: " + c.getResponsibilities() + "\n" +
						 "Bio: " + c.getBio() + "\n\n");
		}
		
		return fullInfo;
	}
	
	@Override
	public String toString(){
		return ("Location: " + stage.getLocation() + "\n" +
				"Time: " + startTime.toString());
	}

	@Override
	public int describeContents() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void writeToParcel(Parcel dest, int flags) {
		// TODO Auto-generated method stub
		
	}
	
}
