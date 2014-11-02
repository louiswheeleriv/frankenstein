package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.json.JSONArray;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

public class Performance implements Parcelable{

	String performance_info;
	Stage performance_stage;
	Production performance_production;
	Date performance_start_time;
	
	List<Actor> performance_actors = new ArrayList<Actor>();
	List<Crew> performance_crews = new ArrayList<Crew>();
	
	public Performance(){
		
	}
	
	public Performance(String info, Stage stage, Production production, Date startTime, List<Actor> actors, List<Crew> crew){
		this.performance_info = info;
		this.performance_stage = stage;
		this.performance_production = production;
		this.performance_start_time = startTime;
		this.performance_actors = actors;
		this.performance_crews = crew;
	}

	public String getInfo() {
		return performance_info;
	}

	public void setInfo(String info) {
		this.performance_info = info;
	}

	public Stage getStage() {
		return performance_stage;
	}

	public void setStage(Stage stage) {
		this.performance_stage = stage;
	}

	public Production getProduction() {
		return performance_production;
	}

	public void setProduction(Production production) {
		this.performance_production = production;
	}

	public Date getStartTime() {
		return performance_start_time;
	}

	public void setStartTime(Date startTime) {
		this.performance_start_time = startTime;
	}

	public List<Actor> getActors() {
		return performance_actors;
	}

	public void setActors(List<Actor> actors) {
		this.performance_actors = actors;
	}

	public List<Crew> getCrew() {
		return performance_crews;
	}

	public void setCrew(List<Crew> crew) {
		this.performance_crews = crew;
	}
	
	public String getFullInfo(){
		String fullInfo = ("PERFORMANCE INFO\n" + performance_info + "\n\n" +
				"STAGE\nLocation: " + performance_stage.getLocation() + "\n" +
				"Info: " + performance_stage.getInfo() + "\n\n" +
				"TIME\n" + performance_start_time + "\n\n" +
				"ACTORS\n");
		
		for(int i = 0; i < performance_actors.size(); i++){
			Actor a = performance_actors.get(i);
			fullInfo += ("Name: " + a.getName() + "\n" +
						 "Bio: " + a.getBio() + "\n" +
						 "Role: " + a.getRoles().get(getInfo()) + "\n");
		}
		
		fullInfo += "CREW\n";
		
		for(int i = 0; i < performance_crews.size(); i++){
			Crew c = performance_crews.get(i);
			fullInfo += ("Name: " + c.getName() + "\n" +
						 "Bio: " + c.getBio() + "\n" +
						 "Responsibility: " + c.getResponsibilities().get(getInfo()) + "\n");
		}
		
		return fullInfo;
	}
	
	@Override
	public String toString(){
		return ("Location: " + performance_stage.getLocation() + "\n" +
				"Time: " + performance_start_time.toString());
	}
	
	public boolean hasActor(String name){
		for(int i = 0; i < performance_actors.size(); i++){
			if(performance_actors.get(i).getName().equals(name)){
				return true;
			}
		}
		return false;
	}
	
	public boolean hasCrew(String name){
		for(int i = 0; i < performance_crews.size(); i++){
			if(performance_crews.get(i).getName().equals(name)){
				return true;
			}
		}
		return false;
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
