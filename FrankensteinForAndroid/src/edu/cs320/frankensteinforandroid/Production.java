package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Production {

	String production_name;
	String production_info;
	
	public Production(String name, String info){
		this.production_name = name;
		this.production_info = info;
	}

	public String getName() {
		return production_name;
	}

	public void setName(String name) {
		this.production_name = name;
	}

	public String getInfo() {
		return production_info;
	}

	public void setInfo(String info) {
		this.production_info = info;
	}
	
	public String getFullInfo(){
		return ("Name: " + production_name + "\n" +
				"Info: " + production_info);
	}
	
}
