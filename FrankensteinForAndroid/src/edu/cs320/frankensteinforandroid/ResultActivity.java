package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

public class ResultActivity extends Activity {

	// List of performances returned by the server
	List<Performance> performances;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_result);
		
		// Make selection info pane scrollable
		TextView selectionInfo = (TextView) findViewById(R.id.textView_result_selectionInfo);
		selectionInfo.setMovementMethod(new ScrollingMovementMethod());

		// Parse the JSON response into a list of performances
		Intent intent = getIntent();
		performances = DataUtils.parseJSONIntoPerformances(intent.getStringExtra(SearchActivity.EXTRA_RESULTLIST));
		
		performances = removeIncorrectDatedPerformances(performances);
		
		ArrayAdapter adapter = getAdapterForList(performances);

		// Display the performances in the results pane
		final ListView listView = (ListView) findViewById(R.id.listView_result_searchResults);
		listView.setAdapter(adapter);
		listView.setClickable(true);
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

			// Code for when a list item is clicked
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {
				Object o = listView.getItemAtPosition(position);
				TextView selectionInfo = (TextView) findViewById(R.id.textView_result_selectionInfo);
				selectionInfo.setText(getFullInfoAboutObject(o));
			}
		});
	}
	
	public List<Performance> removeIncorrectDatedPerformances(List<Performance> performances){
		Intent intent = getIntent();
		String searchType = intent.getStringExtra(SearchActivity.EXTRA_SEARCHTYPE);
		if(searchType.equals("performance_start_time")){
			Set<Integer> daysSeenSet = new HashSet<Integer>();
			
			for(int i = 0; i < performances.size(); i++){
				Integer perfDay = performances.get(i).getStartTime().getDate();
				daysSeenSet.add(perfDay);
			}
			
			List<Integer> daysSeen = new ArrayList<Integer>();
			daysSeen.addAll(daysSeenSet);
			
			if(daysSeen.size() > 1){
				java.util.Collections.sort(daysSeen);
				for(int i = 0; i < performances.size(); i++){
					if(performances.get(i).getStartTime().getDate() != daysSeen.get(0)){
						performances.remove(i);
						i--;
					}
				}
			}
		}
		return performances;
	}

	// Determine whether or not to show personnel info at the top,
	// and return an adapter for the list of performances
	public ArrayAdapter getAdapterForList(List<Performance> performances){

		Intent intent = getIntent();
		String searchType = intent.getStringExtra(SearchActivity.EXTRA_SEARCHTYPE);
		String showingAll = intent.getStringExtra(SearchActivity.EXTRA_SHOWINGALL);

		if(searchType.equals("actor_name") || searchType.equals("crew_name")){
			TextView name = (TextView) findViewById(R.id.textView_result_personnelName);
			name.setText(intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE));
			name.setVisibility(View.VISIBLE);

			// Get info about actor
			String infoString = "";
			boolean done = false;
			for(int i = 0; (i < performances.size()) && !done; i++){
				Performance p = performances.get(i);
				
				if(searchType.equals("actor_name")){
					for(int j = 0; (j < p.getActors().size()) && !done; j++){
						Actor a = p.getActors().get(j);
						String matchName = intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE);
						if(a.getName().equalsIgnoreCase(matchName)){
							infoString = a.getBio();
							done = true;
						}
					}
				}else{
					for(int j = 0; (j < p.getCrew().size()) && !done; j++){
						Crew c = p.getCrew().get(j);
						String matchName = intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE);
						if(c.getName().equalsIgnoreCase(matchName)){
							infoString = c.getBio();
							done = true;
						}
					}
				}
				
			}

			if(performances.size() == 0){
				infoString = "No performances listed for this ";
				if(searchType.equals("actor_name")){
					infoString += "actor";
				}else{
					infoString += "crew member";
				}
			}

			TextView info = (TextView) findViewById(R.id.textView_result_personnelInfo);
			info.setText(infoString);
			info.setVisibility(View.VISIBLE);

		}
		
		if(showingAll.equals("true")){
			LinearLayout personnelInfo = (LinearLayout) findViewById(R.id.linearLayout_result_personnelInfo);
			personnelInfo.setVisibility(View.GONE);
		}else if(searchType.equals("actor_name") || searchType.equals("crew_name")){
			LinearLayout personnelInfo = (LinearLayout) findViewById(R.id.linearLayout_result_personnelInfo);
			personnelInfo.setVisibility(View.VISIBLE);
		}else{
			LinearLayout personnelInfo = (LinearLayout) findViewById(R.id.linearLayout_result_personnelInfo);
			personnelInfo.setVisibility(View.GONE);
		}

		ArrayAdapter<Performance> adapter = new ArrayAdapter<Performance>(this, android.R.layout.simple_list_item_1, DataUtils.sortPerformanceList(performances));
		return adapter;
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

	// Determine the type of the list item and return its information
	public String getFullInfoAboutObject(Object listItem){
		String listItemInfo = "";

		if(listItem instanceof Performance){
			listItemInfo = ((Performance) listItem).getFullInfo();
		}else if(listItem instanceof Production){
			listItemInfo = ((Production) listItem).getFullInfo();
		}else if(listItem instanceof Stage){
			listItemInfo = ((Stage) listItem).getFullInfo();
		}else if(listItem instanceof Actor){
			listItemInfo = ((Actor) listItem).getActorPerformanceInfo(performances);
		}else if(listItem instanceof Crew){
			listItemInfo = ((Crew) listItem).getCrewPerformanceInfo(performances);
		}

		return listItemInfo;
	}
}
