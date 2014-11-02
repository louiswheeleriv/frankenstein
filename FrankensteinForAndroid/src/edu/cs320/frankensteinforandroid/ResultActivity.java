package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class ResultActivity extends Activity {

	List<Performance> performances;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_result);
		TextView selectionInfo = (TextView) findViewById(R.id.textView_result_selectionInfo);
		selectionInfo.setMovementMethod(new ScrollingMovementMethod());

		// Determine what type of search the user did, display data appropriately

		Intent intent = getIntent();
		performances = DataUtils.parseJSONIntoPerformances(intent.getStringExtra(SearchActivity.EXTRA_RESULTLIST));
		//List<Performance> performances = DataUtils.parseJSONIntoPerformances(getString(R.string.example_json_results));

		ArrayAdapter adapter = getAdapterForList(performances);

		final ListView listView = (ListView) findViewById(R.id.listView_result_searchResults);
		listView.setAdapter(adapter);
		listView.setClickable(true);
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {
				Object o = listView.getItemAtPosition(position);
				TextView selectionInfo = (TextView) findViewById(R.id.textView_result_selectionInfo);
				selectionInfo.setText(getFullInfoAboutObject(o));
			}
		});
	}

	public ArrayAdapter getAdapterForList(List<Performance> performances){
		Intent intent = getIntent();
		String searchType = intent.getStringExtra(SearchActivity.EXTRA_SEARCHTYPE);
		String inputValue = intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE);

		if(searchType.equals("actor_name")){
			List<Actor> actorsToDisplay = new ArrayList<Actor>();

			for(int i = 0; i < performances.size(); i++){
				
				List<Actor> actorsInThisPerformance = performances.get(i).getActors();

				for(int j = 0; j < actorsInThisPerformance.size(); j++){

					if(actorsInThisPerformance.get(j).getName().toLowerCase().contains(inputValue.toLowerCase())){
						boolean alreadyInList = false;

						for(int k = 0; k < actorsToDisplay.size(); k++){
							if(actorsToDisplay.get(k).getName().equalsIgnoreCase(actorsInThisPerformance.get(j).getName())){
								alreadyInList = true;

								actorsToDisplay.get(k).addRoleAndAppearanceTimeBulk(actorsInThisPerformance.get(j).getRoles(), actorsInThisPerformance.get(j).getAppearanceTimes());
								break;
							}
						}

						if(!alreadyInList){
							actorsToDisplay.add(actorsInThisPerformance.get(j));
						}

					}
				}
			}

			ArrayAdapter<Actor> adapter = new ArrayAdapter<Actor>(this, android.R.layout.simple_list_item_1, DataUtils.sortActorList(actorsToDisplay));
			return adapter;
		}else if(searchType.equals("crew_name")){
			
			List<Crew> crewToDisplay = new ArrayList<Crew>();

			for(int i = 0; i < performances.size(); i++){
				List<Crew> crewInThisPerformance = performances.get(i).getCrew();

				for(int j = 0; j < crewInThisPerformance.size(); j++){

					if(crewInThisPerformance.get(j).getName().toLowerCase().contains(inputValue.toLowerCase())){
						boolean alreadyInList = false;

						for(int k = 0; k < crewToDisplay.size(); k++){
							if(crewToDisplay.get(k).getName().equalsIgnoreCase(crewInThisPerformance.get(j).getName())){
								alreadyInList = true;

								crewToDisplay.get(k).addResponsibilityBulk(crewInThisPerformance.get(j).getResponsibilities());
								break;
							}
						}

						if(!alreadyInList){
							crewToDisplay.add(crewInThisPerformance.get(j));
						}
					}
				}
			}

			ArrayAdapter<Crew> adapter = new ArrayAdapter<Crew>(this, android.R.layout.simple_list_item_1, DataUtils.sortCrewList(crewToDisplay));
			return adapter;
		}else{
			ArrayAdapter<Performance> adapter = new ArrayAdapter<Performance>(this, android.R.layout.simple_list_item_1, DataUtils.sortPerformanceList(performances));
			return adapter;
		}
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

	/**
	 * This function determines the type of listItem and returns its information
	 */
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
