package edu.cs320.frankensteinforandroid;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

public class DataUtils {
	
	static List<Actor> actors;
	static List<Crew> crew;

	//
	// JSON parsing functions
	//
	
	public static List<Performance> parseJSONIntoPerformances(String jsonString){
		List<Performance> performances = new ArrayList<Performance>();
		JSONArray jsonArray;
		
		try {
			//JSONObject jsonObject = new JSONObject(jsonString);
			//jsonArray = jsonObject.getJSONArray("performances");
			jsonArray = new JSONArray(jsonString);
			
			for(int i = 0; i < jsonArray.length(); i++){
				JSONObject jsonObj = jsonArray.getJSONObject(i);
				performances.add(parsePerformanceFromJSON(jsonObj));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return performances;
	}
	
	public static Performance parsePerformanceFromJSON(JSONObject jsonObject){
		try{
			
			String jsonInfo = jsonObject.getString("performance_info");
			String jsonStartTimeString = jsonObject.getString("performance_start_time");
			
			JSONObject jsonProductionObject = jsonObject.getJSONObject("performance_production");
			JSONObject jsonStageObject = jsonObject.getJSONObject("performance_stage");
			
			JSONArray jsonActorArray = jsonObject.getJSONArray("performance_actors");
			JSONArray jsonCrewArray = jsonObject.getJSONArray("performance_crews");
			
			Production jsonProduction = parseProductionFromJSON(jsonProductionObject);
			Stage jsonStage = parseStageFromJSON(jsonStageObject);
			Date jsonStartTime = parseDate(jsonStartTimeString);
			
			List<Actor> jsonActors = new ArrayList<Actor>();
			for(int i = 0; i < jsonActorArray.length(); i++){
				JSONObject jsonActorObject = jsonActorArray.getJSONObject(i);
				jsonActors.add(parseActorFromJSON(jsonActorObject, jsonInfo));
			}
			
			List<Crew> jsonCrew = new ArrayList<Crew>();
			for(int i = 0; i < jsonCrewArray.length(); i++){
				JSONObject jsonCrewObject = jsonCrewArray.getJSONObject(i);
				jsonCrew.add(parseCrewFromJSON(jsonCrewObject, jsonInfo));
			}
			
			Performance perf = new Performance(jsonInfo, jsonStage, jsonProduction, jsonStartTime, jsonActors, jsonCrew);
			return perf;
			
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Production parseProductionFromJSON(JSONObject jsonObject){
		try{
			String jsonName = jsonObject.getString("production_name");
			String jsonInfo = jsonObject.getString("production_info");
			
			Production production = new Production(jsonName, jsonInfo);
			return production;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Stage parseStageFromJSON(JSONObject jsonObject){
		try{
			String jsonLocation = jsonObject.getString("stage_location");
			String jsonInfo = jsonObject.getString("stage_description");
			
			Stage stage = new Stage(jsonLocation, jsonInfo);
			return stage;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Actor parseActorFromJSON(JSONObject jsonObject, String performanceInfo){
		try{
			String jsonName = jsonObject.getString("name");
			String jsonBio = jsonObject.getString("bio");
			String jsonRole = jsonObject.getString("role");
			String jsonAppearanceTime = jsonObject.getString("appearance_time");
			
			Actor actor = new Actor(jsonName, jsonBio);
			actor.addRoleAndAppearanceTime(performanceInfo, jsonRole, jsonAppearanceTime);
			
			return actor;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Crew parseCrewFromJSON(JSONObject jsonObject, String performanceInfo){
		try{
			String jsonName = jsonObject.getString("name");
			String jsonBio = jsonObject.getString("bio");
			String jsonResponsibility = jsonObject.getString("responsibilities");
			
			Crew crew = new Crew(jsonName, jsonBio);
			crew.addResponsibility(performanceInfo, jsonResponsibility);
			
			return crew;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static boolean alreadyHaveActor(Actor actor){
		for(int i = 0; i < actors.size(); i++){
			if(actors.get(i).getName().equalsIgnoreCase(actor.getName())){
				return true;
			}
		}
		return false;
	}
	
	public static boolean alreadyHaveCrew(Crew crewSpecified){
		for(int i = 0; i < crew.size(); i++){
			if(crew.get(i).getName().equalsIgnoreCase(crewSpecified.getName())){
				return true;
			}
		}
		return false;
	}
	
	public static Actor mergeActor(String performanceInfo, Actor actorInPerformance){
		for(int i = 0; i < actors.size(); i++){
			if(actors.get(i).getName().equalsIgnoreCase(actorInPerformance.getName())){
				actors.get(i).addRoleAndAppearanceTimeBulk(actorInPerformance.getRoles(), actorInPerformance.getAppearanceTimes());
				return actors.get(i);
			}
		}
		return null;
	}
	
	public static Crew mergeCrew(String performanceInfo, Crew crewInPerformance){
		for(int i = 0; i < crew.size(); i++){
			if(crew.get(i).getName().equalsIgnoreCase(crewInPerformance.getName())){
				crew.get(i).addResponsibilityBulk(crewInPerformance.getResponsibilities());
				return crew.get(i);
			}
		}
		return null;
	}
	
	//
	// Date parsing functions
	//
	
	public static Date parseDate(String input) throws java.text.ParseException{

		//NOTE: SimpleDateFormat uses GMT[-+]hh:mm for the TZ which breaks
		//things a bit.  Before we go on we have to repair this.
		//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssz");
		SimpleDateFormat df = new SimpleDateFormat("HH:mm, MM/dd/yyyy");
		
		//this is zero time so we need to add that TZ indicator for
		/*
		if(input.endsWith("Z")){
			input = input.substring(0, input.length() - 1) + "GMT-00:00";
		}else{
			int inset = 6;

			String s0 = input.substring(0, input.length() - inset);
			String s1 = input.substring(input.length() - inset, input.length());

			input = s0 + "GMT" + s1;
		}
		*/

		return df.parse(input);

	}

	public static String dateToString(Date date){

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssz");

		TimeZone tz = TimeZone.getTimeZone("UTC");

		df.setTimeZone(tz);

		String output = df.format(date);

		int inset0 = 9;
		int inset1 = 6;

		String s0 = output.substring(0, output.length() - inset0);
		String s1 = output.substring(output.length() - inset1, output.length());

		String result = s0 + s1;

		result = result.replaceAll("UTC", "+00:00");

		return result;

	}
	
	//
	// Sorting functions
	//
	
	public static ArrayList sortPerformanceList(List<Performance> inputPerformances){
		ArrayList<Performance> sortedPerformances = new ArrayList<Performance>();
		
		while(!inputPerformances.isEmpty()){
			int firstPerformanceIndex = 0;
			
			for(int i = 1; i < inputPerformances.size(); i++){
				if(inputPerformances.get(firstPerformanceIndex).getStartTime().compareTo(inputPerformances.get(i).getStartTime()) > 0){
					firstPerformanceIndex = i;
				}
			}
			
			sortedPerformances.add(inputPerformances.remove(firstPerformanceIndex));
		}
		
		return sortedPerformances;
	}
	
	public static ArrayList sortActorList(List<Actor> inputActors){
		ArrayList<Actor> sortedActors = new ArrayList<Actor>();
		
		while(!inputActors.isEmpty()){
			int firstActorIndex = 0;
			
			for(int i = 1; i < inputActors.size(); i++){
				if(inputActors.get(firstActorIndex).getName().compareTo(inputActors.get(i).getName()) > 0){
					firstActorIndex = i;
				}
			}
			
			sortedActors.add(inputActors.remove(firstActorIndex));
		}
		
		return sortedActors;
	}
	
	public static ArrayList sortCrewList(List<Crew> inputCrew){
		ArrayList<Crew> sortedCrew = new ArrayList<Crew>();
		
		while(!inputCrew.isEmpty()){
			int firstCrewIndex = 0;
			
			for(int i = 1; i < inputCrew.size(); i++){
				if(inputCrew.get(firstCrewIndex).getName().compareTo(inputCrew.get(i).getName()) > 0){
					firstCrewIndex = i;
				}
			}
			
			sortedCrew.add(inputCrew.remove(firstCrewIndex));
		}
		
		return sortedCrew;
	}
	
}
