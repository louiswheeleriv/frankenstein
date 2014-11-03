package edu.cs320.frankensteinforandroid;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

public class SearchActivity extends Activity {

	public final static String EXTRA_SEARCHTYPE = "edu.cs320.frankensteinforandroid.SEARCHTYPE";
	public final static String EXTRA_INPUTVALUE = "edu.cs320.frankensteinforandroid.INPUTVALUE";
	public final static String EXTRA_RESULTLIST = "edu.cs320.frankensteinforandroid.RESULTLIST";
	
	Map<Integer, List<String>> searchOptions;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_search);
		searchOptions = getSearchOptions();
		
		Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
		spinner.setOnItemSelectedListener(new OnItemSelectedListener(){
			
			@Override
		    public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
				Spinner spinnerSearchType = (Spinner) findViewById(R.id.spinner_searchType);
				Spinner spinnerInputValue = (Spinner) findViewById(R.id.spinner_inputValue);
				LinearLayout timeSelection = (LinearLayout) findViewById(R.id.linearLayout_timeSelection);
				
				if(spinnerSearchType.getSelectedItemPosition() == 4){
					spinnerInputValue.setVisibility(View.GONE);
					timeSelection.setVisibility(View.VISIBLE);
				}else{
					spinnerInputValue.setVisibility(View.VISIBLE);
					timeSelection.setVisibility(View.GONE);
					
					ArrayAdapter<String> spinnerAdapter = getArrayAdapter(searchOptions.get(spinnerSearchType.getSelectedItemPosition()));
					spinnerInputValue.setAdapter(spinnerAdapter);
				}
		    }

		    @Override
		    public void onNothingSelected(AdapterView<?> parentView) {}
		});
			
	}
	
	public ArrayAdapter<String> getArrayAdapter(List<String> strings){
		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, strings);
		return adapter;
	}
	
	/**
	 * @param type: 0-stages, 1-actors, 2-crew, 3-events
	 * @return a list of options of that type
	 */
	public Map<Integer, List<String>> getSearchOptions(){
		
		Thread t = new Thread(new Runnable(){
			@Override
			public void run(){
				TextView text = (TextView) findViewById(R.id.textView_jsonResponseHidden);
				
				String url = (DataUtils.SERVER_ADDRESS + DataUtils.SERVER_PREFIX + DataUtils.SERVER_SUFFIX);
				text.setText(DataUtils.sendServerRequest(url));
			}
		});
		t.start();
		try {
			t.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		TextView jsonResponseTextView = (TextView) findViewById(R.id.textView_jsonResponseHidden);
		String jsonResponse = (String) jsonResponseTextView.getText();
		List<Performance> allPerformances = DataUtils.parseJSONIntoPerformances(jsonResponse);
		
		Map<Integer, List<String>> searchOptions = new HashMap<Integer, List<String>>();
		
		// Stages
		Set<String> stageOptionsSet = new HashSet<String>();
		
		for(int i = 0; i < allPerformances.size(); i++){
			Performance p = allPerformances.get(i);
			if(allPerformances.get(i).getStage() != null){
				stageOptionsSet.add(allPerformances.get(i).getStage().getLocation());
			}
		}
		
		List<String> stageOptions = new ArrayList<String>();
		stageOptions.addAll(stageOptionsSet);
		searchOptions.put(0, stageOptions);
		
		// Actors
		Set<String> actorOptionsSet = new HashSet<String>();
		
		for(int i = 0; i < allPerformances.size(); i++){
			Performance p = allPerformances.get(i);
			if(p.getActors() != null){
				for(int j = 0; j < p.getActors().size(); j++){
					actorOptionsSet.add(p.getActors().get(j).getName());
				}
			}
		}
		
		List<String> actorOptions = new ArrayList<String>();
		actorOptions.addAll(actorOptionsSet);
		searchOptions.put(1, actorOptions);
		
		// Crew
		Set<String> crewOptionsSet = new HashSet<String>();
		for(int i = 0; i < allPerformances.size(); i++){
			Performance p = allPerformances.get(i);
			if(p.getCrew() != null){
				for(int j = 0; j < p.getCrew().size(); j++){
					crewOptionsSet.add(p.getCrew().get(j).getName());
				}
			}
		}
		
		List<String> crewOptions = new ArrayList<String>();
		crewOptions.addAll(crewOptionsSet);
		searchOptions.put(2, crewOptions);
		
		// Events
		Set<String> eventOptionsSet = new HashSet<String>();
		for(int i = 0; i < allPerformances.size(); i++){
			Performance p = allPerformances.get(i);
			if(p.getEvents() != null){
				for(int j = 0; j < p.getEvents().size(); j++){
					eventOptionsSet.add(p.getEvents().get(j));
				}
			}
		}
		
		List<String> eventOptions = new ArrayList<String>();
		eventOptions.addAll(eventOptionsSet);
		searchOptions.put(3, eventOptions);
		
		return searchOptions;
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.search, menu);
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
	
	public void searchButtonClicked(View view){
		
		Intent intent = new Intent(this, ResultActivity.class);
		
		// Send information to Django server, which will return JSON object(s)
		Thread t = new Thread(new Runnable(){
			@Override
			public void run(){
				Spinner spinnerSearchType = (Spinner) findViewById(R.id.spinner_searchType);
				Spinner spinnerInputValue = (Spinner) findViewById(R.id.spinner_inputValue);
				
				String searchType = getSearchableParameter(spinnerSearchType.getSelectedItem().toString());
				String inputValue = spinnerInputValue.getSelectedItem().toString();
				
				// Remove spaces and replace with %20
				inputValue = inputValue.replace(" ", "%20");
				
				TextView text = (TextView) findViewById(R.id.textView_jsonResponseHidden);
				
				String url = (DataUtils.SERVER_ADDRESS + DataUtils.SERVER_PREFIX + searchType + "=" + inputValue + "&" + DataUtils.SERVER_SUFFIX);
				text.setText(DataUtils.sendServerRequest(url));
			}
		});
		
		t.start();
		try {
			t.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		Spinner spinnerSearchType = (Spinner) findViewById(R.id.spinner_searchType);
		Spinner spinnerInputValue = (Spinner) findViewById(R.id.spinner_inputValue);
		TextView jsonResponseTextView = (TextView) findViewById(R.id.textView_jsonResponseHidden);

		String searchType = getSearchableParameter(spinnerSearchType.getSelectedItem().toString());
		String inputValue = spinnerInputValue.getSelectedItem().toString();
		String jsonResponse = (String) jsonResponseTextView.getText();
		
		// Start ResultActivity
		intent.putExtra(EXTRA_SEARCHTYPE, searchType);
		intent.putExtra(EXTRA_INPUTVALUE, inputValue);
		intent.putExtra(EXTRA_RESULTLIST, jsonResponse);
		startActivity(intent);
		
	}
	
	public void showAllButtonClicked(View view){
Intent intent = new Intent(this, ResultActivity.class);
		
		// Send information to Django server, which will return JSON object(s)

		Thread t = new Thread(new Runnable(){
			@Override
			public void run(){
				TextView text = (TextView) findViewById(R.id.textView_jsonResponseHidden);
				
				String url = (DataUtils.SERVER_ADDRESS + DataUtils.SERVER_PREFIX + DataUtils.SERVER_SUFFIX);
				text.setText(DataUtils.sendServerRequest(url));
			}
		});

		t.start();
		try {
			t.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		Spinner spinnerSearchType = (Spinner) findViewById(R.id.spinner_searchType);
		Spinner spinnerInputValue = (Spinner) findViewById(R.id.spinner_inputValue);
		TextView jsonResponseTextView = (TextView) findViewById(R.id.textView_jsonResponseHidden);

		String searchType = getSearchableParameter(spinnerSearchType.getSelectedItem().toString());
		String inputValue = spinnerInputValue.getSelectedItem().toString();
		String jsonResponse = (String) jsonResponseTextView.getText();
		
		// Start ResultActivity
		intent.putExtra(EXTRA_SEARCHTYPE, searchType);
		intent.putExtra(EXTRA_INPUTVALUE, inputValue);
		intent.putExtra(EXTRA_RESULTLIST, jsonResponse);
		startActivity(intent);
	}
	
	public String getSearchableParameter(String s){
		String searchType = "";
		
		switch(s){
		case "a production":
			searchType = "production_id";
			break;
		case "a stage":
			searchType = "stage_location";
			break;
		case "an actor":
			searchType = "actor_name";
			break;
		case "a stage crew member":
			searchType = "crew_name";
			break;
		case "a significant plot event":
			searchType = "event";
			break;
		case "a specific time":
			searchType = "performance_start_time";
			break;
		}
		
		return searchType;
	}
}
