package edu.cs320.frankensteinforandroid;

import java.util.Date;

import android.os.Parcel;
import android.os.Parcelable;

public class Performance implements Parcelable{

	long performanceId;
	String info;
	Stage stage;
	Production production;
	Date startTime;
	
	public Performance(long performanceId, String info, Stage stage, Production production, Date startTime){
		this.performanceId = performanceId;
		this.info = info;
		this.stage = stage;
		this.production = production;
		this.startTime = startTime;
	}

	public long getPerformanceId() {
		return performanceId;
	}

	public void setPerformanceId(long performanceId) {
		this.performanceId = performanceId;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Stage getStage() {
		return stage;
	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}

	public Production getProduction() {
		return production;
	}

	public void setProduction(Production production) {
		this.production = production;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	
	public String toString(){
		return ("Performance ID: " + performanceId + "\n" +
				"Production: " + production.getName() + "\n" +
				"Info: " + info + "\n" +
				"Location: " + stage.getLocation() + "\n" +
				"Stage Info: " + stage.getInfo() + "\n" +
				"Start Time: " + startTime.toString());
	}
	
	public String toTitleString(){
		return ("id: " + performanceId + ", stageId: " + stage.getStageId() + ", time: " + startTime.toString());
	}

	@Override
	public int describeContents() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void writeToParcel(Parcel dest, int flags) {
		// TODO Auto-generated method stub
		
	}
	
}
