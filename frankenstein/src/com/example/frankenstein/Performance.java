package com.example.frankenstein;

public class Performance {

	long performance_id;
	String description;
	long stage_id;
	int startTime;
	long production_id;
	
	public Performance(){
		
	}

	public long getPerformanceId() {
		return performance_id;
	}

	public void setPerformanceId(long performance_id) {
		this.performance_id = performance_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getStageId() {
		return stage_id;
	}

	public void setStageId(long stage_id) {
		this.stage_id = stage_id;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public long getProductionId() {
		return production_id;
	}

	public void setProductionId(long production_id) {
		this.production_id = production_id;
	}
	
}
