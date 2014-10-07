package com.example.frankenstein;

public class SearchObject {

	private String searchType;
	private String input;
	
	public SearchObject(String searchType, String input){
		this.searchType = searchType;
		this.input = input;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}
	
	public String toURL(){
		return "/?" + searchType + "=" + input;
	}
	
}
