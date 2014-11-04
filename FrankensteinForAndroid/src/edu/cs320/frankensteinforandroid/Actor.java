package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONObject;

import android.util.Log;

public class Actor {

	String actor_name;
	String actor_bio;
	Map<String, List<String>> roles;
	Map<String, List<Integer>> appearanceTimes;
	
	public Actor(String name, String bio){
		this.actor_name = name;
		this.actor_bio = bio;
		this.roles = new HashMap<String, List<String>>();
		this.appearanceTimes = new HashMap<String, List<Integer>>();
	}

	public Map<String, List<String>> getRoles() {
		return roles;
	}

	public void setRoles(Map<String, List<String>> roles) {
		this.roles = roles;
	}

	public Map<String, List<Integer>> getAppearanceTimes() {
		return appearanceTimes;
	}

	public void setAppearanceTimes(Map<String, List<Integer>> appearanceTimes) {
		this.appearanceTimes = appearanceTimes;
	}
	
	public void addRoleAndAppearanceTime(String performanceInfo, String role, int appearanceTime){
		List<String> newRoles = new ArrayList<String>();
		
		if(roles.get(performanceInfo) != null){
			newRoles = roles.get(performanceInfo);
		}
		
		newRoles.add(role);
		
		List<Integer> newAppearanceTimes = new ArrayList<Integer>();
		
		if(appearanceTimes.get(performanceInfo) != null){
			newAppearanceTimes = this.appearanceTimes.get(performanceInfo);
		}
		
		newAppearanceTimes.add(appearanceTime);
		
		this.roles.put(performanceInfo, newRoles);
		this.appearanceTimes.put(performanceInfo, newAppearanceTimes);
	}
	
	public void addRoleAndAppearanceTimeBulk(Map<String, List<String>> roles, Map<String, List<Integer>> appearanceTimes){
		Map<String, List<String>> newRoles = new HashMap<String, List<String>>();
		Map<String, List<Integer>> newAppearanceTimes = new HashMap<String, List<Integer>>();
		
		if(this.roles != null){
			newRoles = this.roles;
			for(String s : roles.keySet()){
				List<String> roleList = new ArrayList<String>();
				if(newRoles.get(s) != null){
					roleList = newRoles.get(s);
					roleList.addAll(roles.get(s));
					Set<String> roleSet = new HashSet<String>();
					roleSet.addAll(roleList);
					roleList.clear();
					roleList.addAll(roleSet);
					newRoles.put(s, roleList);
				}else{
					newRoles.put(s, roles.get(s));
				}
			}
		}else{
			newRoles.putAll(roles);
		}
		
		if(this.appearanceTimes != null){
			newAppearanceTimes = this.appearanceTimes;
			for(String s : appearanceTimes.keySet()){
				List<Integer> appearanceTimeList = new ArrayList<Integer>();
				if(newAppearanceTimes.get(s) != null){
					appearanceTimeList = newAppearanceTimes.get(s);
					appearanceTimeList.addAll(appearanceTimes.get(s));
					Set<Integer> appearanceTimeSet = new HashSet<Integer>();
					appearanceTimeSet.addAll(appearanceTimeList);
					appearanceTimeList.clear();
					appearanceTimeList.addAll(appearanceTimeSet);
					newAppearanceTimes.put(s, appearanceTimeList);
				}else{
					newAppearanceTimes.put(s, appearanceTimes.get(s));
				}
			}
		}else{
			newAppearanceTimes.putAll(appearanceTimes);
		}
		
		this.roles = newRoles;
		this.appearanceTimes = newAppearanceTimes;
	}

	public String getName() {
		return actor_name;
	}

	public void setName(String name) {
		this.actor_name = name;
	}

	public String getBio() {
		return actor_bio;
	}

	public void setBio(String bio) {
		this.actor_bio = bio;
	}
	
	public String toString(){
		return actor_name;
	}
	
	public String getFullInfo(){
		return ("Name: " + actor_name + "\n" +
				"Bio: " + actor_bio);
	}
	
	public String getActorPerformanceInfo(List<Performance> performances){
		String actorPerformancesInfo = getFullInfo();
		List<Performance> performancesWithActor = new ArrayList<Performance>();
		
		// Find which performances feature this actor
		for(int i = 0; i < performances.size(); i++){
			if(performances.get(i).hasActor(getName())){
				performancesWithActor.add(performances.get(i));
			}
		}
		
		// Now add performance info to the output
		if(!performancesWithActor.isEmpty()){
			actorPerformancesInfo += "\nPERFORMANCES";
		}
		
		for(int i = 0; i < performancesWithActor.size(); i++){
			actorPerformancesInfo += "\nInfo: " + performancesWithActor.get(i).getInfo();
			actorPerformancesInfo += "\n" + performancesWithActor.get(i).getStage().getFullInfo();
			actorPerformancesInfo += "Time: " + performancesWithActor.get(i).getStartTime();
			actorPerformancesInfo += "\nActor Role: " + roles.get(performancesWithActor.get(i).getInfo());
			actorPerformancesInfo += "\n";
		}
		
		return actorPerformancesInfo;
	}
	
}
