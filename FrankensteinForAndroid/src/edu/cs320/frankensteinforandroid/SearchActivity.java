package edu.cs320.frankensteinforandroid;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

public class SearchActivity extends Activity {

	public final static String EXTRA_SEARCHTYPE = "edu.cs320.frankensteinforandroid.SEARCHTYPE";
	public final static String EXTRA_INPUTVALUE = "edu.cs320.frankensteinforandroid.INPUTVALUE";
	public final static String EXTRA_RESULTLIST = "edu.cs320.frankensteinforandroid.RESULTLIST";
	
	public final static String SERVER_ADDRESS = "http://139.147.25.114:8000/api/performances/?";
	public final static String SERVER_SUFFIX = "format=json";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_search);
		
		Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
		spinner.setOnItemSelectedListener(new OnItemSelectedListener(){
			@Override
		    public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
				Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
				LinearLayout timeSelection = (LinearLayout) findViewById(R.id.linearLayout_timeSelection);
				EditText inputValue = (EditText) findViewById(R.id.editText_inputValue);
				
				if(spinner.getSelectedItemPosition() == 5){
					inputValue.setVisibility(View.GONE);
					timeSelection.setVisibility(View.VISIBLE);
				}else{
					inputValue.setVisibility(View.VISIBLE);
					timeSelection.setVisibility(View.GONE);
				}
		    }

		    @Override
		    public void onNothingSelected(AdapterView<?> parentView) {}
		});
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
				try{
					// Get information input by user
					Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
					EditText editText = (EditText) findViewById(R.id.editText_inputValue);

					String searchType = getSearchableParameter(spinner.getSelectedItem().toString());
					String inputValue = editText.getText().toString();
					String resultList = "";
					
					URL serverUrl = new URL(SERVER_ADDRESS + searchType + "=" + inputValue + "&" + SERVER_SUFFIX);
					HttpURLConnection connection = (HttpURLConnection) serverUrl.openConnection();
		            connection.setRequestMethod("GET");
		            connection.setDoInput(true);
		            connection.connect();
					
		            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		            TextView text = (TextView) findViewById(R.id.textView_jsonResponseHidden);
		            
		            String line = "";
		            while((line = in.readLine()) != null){
		            	resultList += line;
		            }
		            
		            text.setText(resultList);
		            in.close();
		            connection.disconnect();
		            
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		});
		
		t.start();
		try {
			t.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
		EditText editText = (EditText) findViewById(R.id.editText_inputValue);
		TextView jsonResponseTextView = (TextView) findViewById(R.id.textView_jsonResponseHidden);

		String searchType = getSearchableParameter(spinner.getSelectedItem().toString());
		String inputValue = editText.getText().toString();
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
				try{
					String resultList = "";
					
					URL serverUrl = new URL(SERVER_ADDRESS + SERVER_SUFFIX);
					HttpURLConnection connection = (HttpURLConnection) serverUrl.openConnection();
		            connection.setRequestMethod("GET");
		            connection.setDoInput(true);
		            connection.connect();
					
		            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		            TextView text = (TextView) findViewById(R.id.textView_jsonResponseHidden);
		            
		            String line = "";
		            while((line = in.readLine()) != null){
		            	resultList += line;
		            }
		            
		            text.setText(resultList);
		            in.close();
		            connection.disconnect();
		            
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		});
		
		t.start();
		try {
			t.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
		EditText editText = (EditText) findViewById(R.id.editText_inputValue);
		TextView jsonResponseTextView = (TextView) findViewById(R.id.textView_jsonResponseHidden);

		String searchType = getSearchableParameter(spinner.getSelectedItem().toString());
		String inputValue = editText.getText().toString();
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
