package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Stage {

	String stage_location;
	String stage_description;
	
	public Stage(String location, String info){
		this.stage_location = location;
		this.stage_description = info;
	}

	public String getLocation() {
		return stage_location;
	}

	public void setLocation(String location) {
		this.stage_location = location;
	}

	public String getInfo() {
		return stage_description;
	}

	public void setInfo(String info) {
		this.stage_description = info;
	}
	
	public String getFullInfo(){
		return ("Location: " + stage_location + "\n" +
				"Description: " + stage_description);
	}
	
}
