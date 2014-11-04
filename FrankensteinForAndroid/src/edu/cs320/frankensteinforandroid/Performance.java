package edu.cs320.frankensteinforandroid;

import java.text.Format;
import java.text.SimpleDateFormat;
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
import android.text.format.DateFormat;
import android.util.Log;

public class Performance implements Parcelable{

	String performance_info;
	Stage performance_stage;
	Production performance_production;
	Date performance_start_time;
	
	List<Actor> performance_actors = new ArrayList<Actor>();
	List<Crew> performance_crews = new ArrayList<Crew>();
	List<String> performance_significant_events = new ArrayList<String>();
	
	public Performance(){}
	
	public Performance(String info, Stage stage, Production production, Date startTime, List<Actor> actors, List<Crew> crew, List<String> events){
		this.performance_info = info;
		this.performance_stage = stage;
		this.performance_production = production;
		this.performance_start_time = startTime;
		this.performance_actors = actors;
		this.performance_crews = crew;
		this.performance_significant_events = events;
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
	
	public List<String> getEvents(){
		return performance_significant_events;
	}
	
	public void setEvents(List<String> events){
		this.performance_significant_events = events;
	}
	
	public void addEvent(String event){
		this.performance_significant_events.add(event);
	}
	
	public String getFullInfo(){
		Format formatter = new SimpleDateFormat("h:mm a, MM/dd/yyyy");
		String dateString = formatter.format(performance_start_time);
		String fullInfo = (performance_info + "\n\n" +
				"STAGE\nLocation: " + performance_stage.getLocation() + "\n" +
				"Info: " + performance_stage.getInfo() + "\n" +
				"TIME\n" + dateString + "\n\n" +
				"ACTORS\n");
		
		for(int i = 0; i < performance_actors.size(); i++){
			Actor a = performance_actors.get(i);
			List<String> roles = a.getRoles().get(getInfo());
			List<Integer> appTimes = a.getAppearanceTimes().get(getInfo());
			
			fullInfo += "Name: " + a.getName() + "\n";
			for(int j = 0; j < roles.size(); j++){
				fullInfo += "Role: " + roles.get(j) + "\n";
				if(appTimes.get(j) == 0){
					fullInfo += "Appearance Time: Beginning" + "\n";
				}else if(appTimes.get(j) == 1){
					fullInfo += "Appearance Time: 1 minute in" + "\n";
				}else{
					fullInfo += "Appearance Time: " + appTimes.get(j) + " minutes in" + "\n";
				}
				
			}
			fullInfo += "\n";
		}
		
		if(performance_actors.size() == 0){
			fullInfo += "No actors listed for this performance\n\n";
		}
		
		fullInfo += "CREW\n";
		
		for(int i = 0; i < performance_crews.size(); i++){
			Crew c = performance_crews.get(i);
			
			List<String> jobs = c.getResponsibilities().get(getInfo());
			
			fullInfo += "Name: " + c.getName() + "\n";
			for(int j = 0; j < jobs.size(); j++){
				fullInfo += "Job: " + jobs.get(j) + "\n";
			}
		}
		
		if(performance_crews.size() == 0){
			fullInfo += "No crew listed for this performance\n\n";
		}
		
		fullInfo += "EVENTS\n";
		
		for(int i = 0; i < performance_significant_events.size(); i++){
			fullInfo += performance_significant_events.get(i) + "\n";
		}
		
		if(performance_significant_events.size() == 0){
			fullInfo += "No events listed for this performance\n\n";
		}
		
		return fullInfo;
	}
	
	@Override
	public String toString(){
		String s = getInfo();
		s += "\n";

		Format formatter = new SimpleDateFormat("E h:mm a");
		String dateString = formatter.format(performance_start_time);
		s += dateString;
		
		return s;
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
