package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Stage {

	long stageId;
	String location;
	String info;
	
	public Stage(long stageId, String location, String info){
		this.stageId = stageId;
		this.location = location;
		this.info = info;
	}

	public long getStageId() {
		return stageId;
	}

	public void setStageId(long stageId) {
		this.stageId = stageId;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
	public String getFullInfo(){
		return ("Stage ID: " + stageId + "\n" +
				"Location: " + location + "\n" +
				"Info: " + info);
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
	
}
