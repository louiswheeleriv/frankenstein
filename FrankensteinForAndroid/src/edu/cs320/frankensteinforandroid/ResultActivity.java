package edu.cs320.frankensteinforandroid;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.os.Build;

public class ResultActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_result);
		
		Intent intent = getIntent();
		String searchType = intent.getStringExtra(SearchActivity.EXTRA_SEARCHTYPE);
		String inputValue = intent.getStringExtra(SearchActivity.EXTRA_INPUTVALUE);
		String resultList = intent.getStringExtra(SearchActivity.EXTRA_RESULTLIST);
		
		//List<Performance> performances = parseJSON(resultList);
		List<Performance> performances = parseJSON(getString(R.string.example_json_results));
		
		final ListView listView = (ListView) findViewById(R.id.listView_result_searchResults);
		ArrayAdapter<Performance> adapter = new ArrayAdapter<Performance>(this, android.R.layout.simple_list_item_1, performances);
		
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
			listItemInfo = ((Actor) listItem).getFullInfo();
		}else if(listItem instanceof Crew){
			listItemInfo = ((Crew) listItem).getFullInfo();
		}
		
		return listItemInfo;
	}
	
	public List<Performance> parseJSON(String jsonString){
		List<Performance> performances = new ArrayList<Performance>();
		JSONArray jsonArray;
		
		try {
			JSONObject jsonObject = new JSONObject(jsonString);
			jsonArray = jsonObject.getJSONArray("performances");
			
			for(int i = 0; i < jsonArray.length(); i++){
				JSONObject jsonObj = jsonArray.getJSONObject(i);
				performances.add(Performance.parsePerformanceFromJSON(jsonObj));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return performances;
	}
}
