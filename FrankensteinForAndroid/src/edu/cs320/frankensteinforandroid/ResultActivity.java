package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.os.Build;

public class ResultActivity extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_result);
		
		Intent intent = getIntent();
		String searchType = intent.getStringExtra(SearchActivity.EXTRA_SEARCHTYPE);
		String inputValue = intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE);
		String resultList = intent.getStringExtra(SearchActivity.EXTRA_RESULTLIST);
		
		List<Performance> performances = parsePerformances(resultList);
		List<String> performanceTitles = getPerformanceTitlesFromPerformances(performances);
		
		ListView listView = (ListView) findViewById(R.id.listView_searchResults);
		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, performanceTitles);
		
		listView.setAdapter(adapter);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.result, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	public List<Performance> parsePerformances(String jsonString){
		// TODO: Finish this function once we know the format
		// Currently just returns a made up list
		
		List<Performance> performances = new ArrayList<Performance>();
		
		Production production = new Production(1, "Frankenstein", "production info");
		Stage stage1 = new Stage(1, "location 1", "stage1 description");
		Stage stage2 = new Stage(2, "location 2", "stage2 description");
		Date date1 = new Date();
		Date date2 = new Date();
		date2.setHours(date2.getHours() + 3);
		Date date3 = new Date();
		date3.setHours(date3.getHours() + 6);
		
		performances.add(new Performance(1, "Info about performance 1", stage1, production, date1));
		performances.add(new Performance(2, "Info about performance 2", stage1, production, date2));
		performances.add(new Performance(3, "Info about performance 3", stage2, production, date1));
		performances.add(new Performance(4, "Info about performance 4", stage1, production, date3));
		performances.add(new Performance(5, "Info about performance 5", stage2, production, date2));
		
		return performances;
	}
	
	public List<String> getPerformanceTitlesFromPerformances(List<Performance> performances){
		List<String> performanceTitles = new ArrayList<String>();
		
		for(int i = 0; i < performances.size(); i++){
			performanceTitles.add(performances.get(i).toTitleString());
		}
		
		return performanceTitles;
	}
}
