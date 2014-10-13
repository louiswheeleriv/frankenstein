package edu.cs320.frankensteinforandroid;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Spinner;
import android.os.Build;

public class SearchActivity extends ActionBarActivity {

	public final static String EXTRA_SEARCHTYPE = "edu.cs320.frankensteinforandroid.SEARCHTYPE";
	public final static String EXTRA_INPUTVALUE = "edu.cs320.frankensteinforandroid.INPUTVALUE";
	public final static String EXTRA_RESULTLIST = "edu.cs320.frankensteinforandroid.RESULTLIST";
	
	public final static String SERVER_ADDRESS = "";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_search);
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
		EditText editText = (EditText) findViewById(R.id.edit_searchValue);

		String searchType = spinner.getSelectedItem().toString();
		String inputValue = editText.getText().toString();
		String resultList = "";
		
		// Send information to Django server, which will return JSON object(s)
		try{
			URL serverURL = new URL(SERVER_ADDRESS + "/?" + searchType + "=" + inputValue);
			URLConnection connection = serverURL.openConnection();
			
			connection.setDoOutput(true);
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
            String message = searchType + "|" + inputValue;
            out.write(message);
            out.close();
            
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
}
