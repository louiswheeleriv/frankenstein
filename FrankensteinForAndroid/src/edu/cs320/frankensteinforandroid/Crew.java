package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONObject;

import android.util.Log;

public class Crew {

	String crew_name;
	String crew_bio;
	Map<String, List<String>> crew_responsibilities;
	
	public Crew(String name, String bio){
		this.crew_name = name;
		this.crew_bio = bio;
		this.crew_responsibilities = new HashMap<String, List<String>>();
	}

	public String getName() {
		return crew_name;
	}

	public void setName(String name) {
		this.crew_name = name;
	}

	public String getBio() {
		return crew_bio;
	}

	public void setBio(String bio) {
		this.crew_bio = bio;
	}

	public Map<String, List<String>> getResponsibilities() {
		return crew_responsibilities;
	}

	public void setResponsibilities(Map<String, List<String>> responsibilities) {
		this.crew_responsibilities = responsibilities;
	}
	
	public void addResponsibility(String performanceInfo, String responsibility){
		List<String> newResponsibilities = new ArrayList<String>();
		
		if(crew_responsibilities.get(performanceInfo) != null){
			newResponsibilities = this.crew_responsibilities.get(performanceInfo);
		}
		
		newResponsibilities.add(responsibility);
		
		this.crew_responsibilities.put(performanceInfo, newResponsibilities);
	}
	
	public void addResponsibilityBulk(Map<String, List<String>> responsibilities){
		Map<String, List<String>> newResps = new HashMap<String, List<String>>();
		
		if(this.crew_responsibilities != null){
			newResps = crew_responsibilities;
			for(String s : responsibilities.keySet()){
				List<String> respList = new ArrayList<String>();
				if(newResps.get(s) != null){
					respList = newResps.get(s);
					respList.addAll(responsibilities.get(s));
					Set<String> respSet = new HashSet<String>();
					respSet.addAll(respList);
					respList.clear();
					respList.addAll(respSet);
					newResps.put(s, respList);
				}else{
					newResps.put(s, responsibilities.get(s));
				}
			}
		}else{
			newResps.putAll(responsibilities);
		}
		
		crew_responsibilities = newResps;
	}
	
	public String toString(){
		return crew_name;
	}
	
	public String getFullInfo(){
		return ("Name: " + crew_name + "\n" +
				"Bio: " + crew_bio);
	}
	
	public String getCrewPerformanceInfo(List<Performance> performances){
		String crewPerformancesInfo = getFullInfo();
		List<Performance> performancesWithCrew = new ArrayList<Performance>();
		
		// Find which performances feature this actor
		for(int i = 0; i < performances.size(); i++){
			if(performances.get(i).hasCrew(getName())){
				performancesWithCrew.add(performances.get(i));
			}
		}
		
		// Now add performance info to the output
		if(!performancesWithCrew.isEmpty()){
			crewPerformancesInfo += "PERFORMANCES";
		}
		
		for(int i = 0; i < performancesWithCrew.size(); i++){
			crewPerformancesInfo += "\nInfo: " + performancesWithCrew.get(i).getInfo();
			crewPerformancesInfo += "\nStage: " + performancesWithCrew.get(i).getStage().getFullInfo();
			crewPerformancesInfo += "\nTime: " + performancesWithCrew.get(i).getStartTime();
			crewPerformancesInfo += "\nCrew Responsibility: " + crew_responsibilities.get(performancesWithCrew.get(i).getInfo());
		}
		
		return crewPerformancesInfo;
	}
	
}
