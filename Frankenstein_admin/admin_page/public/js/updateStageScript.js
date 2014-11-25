$(document).ready(function() {

	console.log(allStages);

	var theStage = document.getElementById("theStage");
	var hidden = document.getElementById("hidden");

	for (var i = 0; i < allStages.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = allStages[i].stage_location;
		theStage.appendChild(option);
	}

	if(allStages.length > 0) {
		hidden.value = allStages[allStages.length-1]._id;
	}

});

function addID() {
	var hidden = document.getElementById("hidden");
	var yourSelect = document.getElementById( "theStage" );
	var currentStage = yourSelect.selectedIndex;
	console.log(allStages[currentStage]._id);
	hidden.setAttribute("value", allStages[currentStage]._id);
}

function updateTheStage(){
	var yourSelect = document.getElementById( "theStage" );
	currentStage = yourSelect.selectedIndex;
	updateStage(currentStage);
}

function updateStage(currentStage) {

	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";


	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/update_stage");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-control";
	var stageLocation = document.createElement("label");
	stageLocation.innerHTML = "Stage's Location";
	var stageLocationText = document.createElement("input");
	stageLocationText.setAttribute("type", "text");
	stageLocationText.setAttribute("placeholder", "Name");
	stageLocationText.setAttribute("id", "name");
	stageLocationText.setAttribute("name", "stage_location");
	stageLocationText.setAttribute("value", allStages[currentStage].stage_location);

	formControl1.appendChild(stageLocation);
	formControl1.appendChild(stageLocationText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-control";
	var stageDescription = document.createElement("label");
	stageDescription.innerHTML = "Stage's Description";

	var stageDescriptionText = document.createElement("textarea");
	stageDescriptionText.setAttribute("row", "4");
	stageDescriptionText.setAttribute("placeholder", "Description");
	stageDescriptionText.setAttribute("id", "description");
	stageDescriptionText.setAttribute("name", "stage_description");
	stageDescriptionText.innerHTML = allStages[currentStage].stage_description;

	formControl2.appendChild(stageDescription);
	formControl2.appendChild(stageDescriptionText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-control";
	var stagePerf = document.createElement("label");
	stagePerf.innerHTML = "Performances, Roles, and Appearance Times";

	var stagePerfOptions = document.createElement("select");
	// ADD OPTIONS HERE
	
	formControl3.appendChild(stagePerf);
	formControl3.appendChild(stagePerfOptions);
	form.appendChild(formControl3);

	var theID = document.createElement("input");
	theID.setAttribute("type", "hidden");
	theID.setAttribute("name", "_id");
	theID.setAttribute("value", allStages[currentStage]._id);
	form.appendChild(theID);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit"
	form.appendChild(submit);


	mainDiv.appendChild(form);
}

function newStage() {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_stage");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var stageLocation = document.createElement("label");
	stageLocation.innerHTML = "Stage's Location";
	var stageLocationText = document.createElement("input");
	stageLocationText.setAttribute("type", "text");
	stageLocationText.setAttribute("placeholder", "Name");
	stageLocationText.setAttribute("id", "location");
	stageLocationText.setAttribute("name", "stage_location");

	formControl1.appendChild(stageLocation);
	formControl1.appendChild(stageLocationText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";
	var stageDescription = document.createElement("label");
	stageDescription.innerHTML = "Stage's Description";

	var stageDescriptionText = document.createElement("textarea");
	stageDescriptionText.setAttribute("row", "4");
	stageDescriptionText.setAttribute("placeholder", "Description");
	stageDescriptionText.setAttribute("id", "description");
	stageDescriptionText.setAttribute("name", "stage_description");

	formControl2.appendChild(stageDescription);
	formControl2.appendChild(stageDescriptionText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";
	var stagePerf = document.createElement("label");
	stagePerf.innerHTML = "Performances";

	var stagePerfOptions = document.createElement("select");
	// ADD OPTIONS HERE
	
	formControl3.appendChild(stagePerf);
	formControl3.appendChild(stagePerfOptions);
	form.appendChild(formControl3);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	


	mainDiv.appendChild(form);
}
