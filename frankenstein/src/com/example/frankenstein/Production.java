package com.example.frankenstein;

import java.util.ArrayList;
import java.util.List;

public class Production {

	long production_id;
	String name;
	String description;
	
	List<Performance> performances = new ArrayList<Performance>();
	
	public Production(){
		
	}
	
	public long getProductionId(){
		return production_id;
	}
	
	public void setProductionId(long production_id){
		this.production_id = production_id;
	}
	
	public String getName(){
		return name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public String getDescription(){
		return description;
	}
	
	public void setDescription(String description){
		this.description = description;
	}
	
	public List<Performance> getPerformances(){
		return performances;
	}
	
	public void setPerformances(List<Performance> performances){
		this.performances = performances;
	}
	
}
