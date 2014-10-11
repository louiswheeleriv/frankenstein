package edu.cs320.frankensteinforandroid;

import org.json.JSONObject;

import android.util.Log;

public class Production {

	long productionId;
	String name;
	String info;
	
	public Production(long productionId, String name, String info){
		this.productionId = productionId;
		this.name = name;
		this.info = info;
	}

	public long getProductionId() {
		return productionId;
	}

	public void setProductionId(long productionId) {
		this.productionId = productionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
	public String getFullInfo(){
		return ("Production ID: " + productionId + "\n" +
				"Name: " + name + "\n" +
				"Info: " + info);
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
	
}
