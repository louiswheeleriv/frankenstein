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

	//
	// JSON parsing functions
	//
	
	public static List<Performance> parseJSONIntoPerformances(String jsonString){
		List<Performance> performances = new ArrayList<Performance>();
		JSONArray jsonArray;
		
		try {
			JSONObject jsonObject = new JSONObject(jsonString);
			jsonArray = jsonObject.getJSONArray("performances");
			
			for(int i = 0; i < jsonArray.length(); i++){
				JSONObject jsonObj = jsonArray.getJSONObject(i);
				performances.add(DataUtils.parsePerformanceFromJSON(jsonObj));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return performances;
	}
	
	public static Performance parsePerformanceFromJSON(JSONObject jsonObject){
		try{
			
			long jsonId = jsonObject.getLong("id");
			String jsonInfo = jsonObject.getString("performance_info");
			JSONObject jsonStageObject = jsonObject.getJSONObject("performance_stage");
			JSONObject jsonProductionObject = jsonObject.getJSONObject("performance_production");
			String jsonStartTimeString = jsonObject.getString("performance_start_time");
			JSONArray jsonActorArray = jsonObject.getJSONArray("performance_actors");
			JSONArray jsonCrewArray = jsonObject.getJSONArray("performance_crews");
			
			Stage jsonStage = parseStageFromJSON(jsonStageObject);
			Production jsonProduction = parseProductionFromJSON(jsonProductionObject);
			Date jsonStartTime = parseDate(jsonStartTimeString);
			
			List<Actor> jsonActors = new ArrayList<Actor>();
			for(int i = 0; i < jsonActorArray.length(); i++){
				JSONObject jsonActorObject = jsonActorArray.getJSONObject(i);
				jsonActors.add(parseActorFromJSON(jsonActorObject));
			}
			
			List<Crew> jsonCrew = new ArrayList<Crew>();
			for(int i = 0; i < jsonCrewArray.length(); i++){
				JSONObject jsonCrewObject = jsonCrewArray.getJSONObject(i);
				jsonCrew.add(parseCrewFromJSON(jsonCrewObject));
			}
			
			Performance perf = new Performance(jsonId, jsonInfo, jsonStage, jsonProduction, jsonStartTime, jsonActors, jsonCrew);
			return perf;
			
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Production parseProductionFromJSON(JSONObject jsonObject){
		try{
			long jsonId = jsonObject.getLong("id");
			String jsonName = jsonObject.getString("production_name");
			String jsonInfo = jsonObject.getString("production_description");
			
			Production production = new Production(jsonId, jsonName, jsonInfo);
			return production;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
	}
	
	public static Stage parseStageFromJSON(JSONObject jsonObject){
		try{
			long jsonId = jsonObject.getLong("id");
			String jsonLocation = jsonObject.getString("stage_location");
			String jsonInfo = jsonObject.getString("stage_description");
			
			Stage stage = new Stage(jsonId, jsonLocation, jsonInfo);
			return stage;
		}catch(Exception e){
			Log.d("ERROR", e.getMessage());
		}
		return null;
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
	
	//
	// Date parsing functions
	//
	
	public static Date parseDate(String input) throws java.text.ParseException{

		//NOTE: SimpleDateFormat uses GMT[-+]hh:mm for the TZ which breaks
		//things a bit.  Before we go on we have to repair this.
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssz");

		//this is zero time so we need to add that TZ indicator for 
		if(input.endsWith("Z")){
			input = input.substring(0, input.length() - 1) + "GMT-00:00";
		}else{
			int inset = 6;

			String s0 = input.substring(0, input.length() - inset);
			String s1 = input.substring(input.length() - inset, input.length());

			input = s0 + "GMT" + s1;
		}

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
				if(inputPerformances.get(firstPerformanceIndex).getStartTime().compareTo(inputPerformances.get(i).getStartTime()) == 1){
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
				if(inputActors.get(firstActorIndex).getName().compareTo(inputActors.get(i).getName()) == 1){
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
				if(inputCrew.get(firstCrewIndex).getName().compareTo(inputCrew.get(i).getName()) == 1){
					firstCrewIndex = i;
				}
			}
			
			sortedCrew.add(inputCrew.remove(firstCrewIndex));
		}
		
		return sortedCrew;
	}
	
}
