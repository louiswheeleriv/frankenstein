package edu.cs320.frankensteinforandroid;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

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
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.os.Build;

public class SearchActivity extends Activity {

	public final static String EXTRA_SEARCHTYPE = "edu.cs320.frankensteinforandroid.SEARCHTYPE";
	public final static String EXTRA_INPUTVALUE = "edu.cs320.frankensteinforandroid.INPUTVALUE";
	public final static String EXTRA_RESULTLIST = "edu.cs320.frankensteinforandroid.RESULTLIST";
	
	//public final static String SERVER_ADDRESS = "http://127.0.0.1:8000";
	public final static String SERVER_ADDRESS = "http://echo.jsontest.com/key/value/one/two";
	
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
				EditText searchValue = (EditText) findViewById(R.id.editText_searchValue);
				
				if(spinner.getSelectedItemPosition() == 5){
					searchValue.setVisibility(View.GONE);
					timeSelection.setVisibility(View.VISIBLE);
				}else{
					searchValue.setVisibility(View.VISIBLE);
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

		// Get information input by user
		Spinner spinner = (Spinner) findViewById(R.id.spinner_searchType);
		EditText editText = (EditText) findViewById(R.id.editText_searchValue);

		String searchType = getSearchableParameter(spinner.getSelectedItem().toString());
		String inputValue = editText.getText().toString();
		String resultList = "";
		
		// Send information to Django server, which will return JSON object(s)
		try{
			//String serverUrl = (SERVER_ADDRESS + "/?" + searchType + "=" + inputValue);
			URL serverUrl = new URL(SERVER_ADDRESS);
			HttpURLConnection connection = (HttpURLConnection) serverUrl.openConnection();
			
			/*
			HttpClient httpClient = new DefaultHttpClient();
			HttpGet httpGet = new HttpGet(serverUrl);
			HttpResponse response;
			
			response = httpClient.execute(httpGet);
			HttpEntity entity = response.getEntity();
			
			if(entity != null){
				InputStream instream = entity.getContent();
				String result = convertStreamToString(instream);
				instream.close();
			}
			*/
			
			int responseCode = connection.getResponseCode();
			Log.d("INFORMATION", "\nSending 'GET' request to URL : " + serverUrl);
			Log.d("INFORMATION", "Response Code : " + responseCode);
            
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String serverResponse = in.readLine();
            in.close();
            
		}catch(Exception e){
			Log.d("SERVER_ERROR", e.getMessage());
		}
		
		// Start ResultActivity
		intent.putExtra(EXTRA_SEARCHTYPE, searchType);
		intent.putExtra(EXTRA_INPUTVALUE, inputValue);
		intent.putExtra(EXTRA_RESULTLIST, resultList);
		startActivity(intent);
		
	}
	
	 private static String convertStreamToString(InputStream is) {
		    /*
		     * To convert the InputStream to String we use the BufferedReader.readLine()
		     * method. We iterate until the BufferedReader return null which means
		     * there's no more data to read. Each line will appended to a StringBuilder
		     * and returned as String.
		     */
		    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		    StringBuilder sb = new StringBuilder();

		    String line = null;
		    try {
		        while ((line = reader.readLine()) != null) {
		            sb.append(line + "\n");
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    } finally {
		        try {
		            is.close();
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
		    return sb.toString();
		}
	
	public String getSearchableParameter(String s){
		String searchType = "";
		
		switch(s){
		case "a production":
			searchType = "production";
			break;
		case "a stage":
			searchType = "stage";
			break;
		case "an actor":
			searchType = "actor";
			break;
		case "a stage crew member":
			searchType = "crew";
			break;
		case "a significant plot event":
			searchType = "event";
			break;
		case "a specific time":
			searchType = "time";
			break;
		}
		
		return searchType;
	}
}
