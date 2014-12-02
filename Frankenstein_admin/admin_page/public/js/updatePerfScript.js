$(document).ready(function() {

	console.log(allPerfs);
	console.log(allStages);

	var thePerfs = document.getElementById("thePerfs");
	var hidden = document.getElementById("hidden");

	for (var i = 0; i < allPerfs.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = allPerfs[i].performance_info;
		thePerfs.appendChild(option);
	}

	if(allPerfs.length > 0) {
		hidden.value = allPerfs[allPerfs.length-1]._id;
	}

});


function newPerf() {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_perf");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var perfInfo = document.createElement("label");
	perfInfo.innerHTML = "Performance";
	var perfInfoText = document.createElement("input");
	perfInfoText.setAttribute("type", "text");
	perfInfoText.setAttribute("placeholder", "Performance Info");
	perfInfoText.setAttribute("id", "performance_info");
	perfInfoText.setAttribute("name", "performance_info");

	formControl1.appendChild(perfInfo);
	formControl1.appendChild(perfInfoText);
	form.appendChild(formControl1);



	// STAGES
	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";

	var perfStage = document.createElement("label");
	perfStage.innerHTML = "Performance Location";

	var perfStageDrop = document.createElement("select");
	perfStageDrop.setAttribute("name", "stage_location");
	perfStageDrop.setAttribute("id", "perfStageDrop");
	perfStageDrop.setAttribute("onchange", "getStageID()");

	// MAKE ALL STAGES WITH CURRENT LOCATION PICKED
	for(var i = 0; i < allStages.length; i++) {
		var perfStageText = document.createElement("option");
		perfStageText.setAttribute("id", "performance_stage");
		perfStageText.setAttribute("name", "performance_stage");
		perfStageText.innerHTML = allStages[i].stage_location;

		perfStageDrop.appendChild(perfStageText);
	}

	var hiddenID = document.createElement("input");
	hiddenID.setAttribute("type", "hidden");
	hiddenID.setAttribute("id", "stageHidden");
	hiddenID.setAttribute("name", "stage_id");
	hiddenID.setAttribute("value", allStages[perfStageDrop.selectedIndex]._id);
	formControl2.appendChild(hiddenID);


	formControl2.appendChild(perfStage);
	formControl2.appendChild(perfStageDrop);
	form.appendChild(formControl2);


	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";

	var perfTime = document.createElement("label");
	perfTime.innerHTML = "Performance Start Time";

	var startTime = document.createElement("input");
	startTime.setAttribute("type", "time");
	startTime.setAttribute("value", "19:00");
	startTime.setAttribute("name", "performance_start_time");

	formControl3.appendChild(perfTime);
	formControl3.appendChild(startTime);
	form.appendChild(formControl3);


	// ACTORS
	var formControl4 = document.createElement("div");
	formControl4.className = "form-group";

	var perfActors = document.createElement("label");
	perfActors.innerHTML = "Actors in this performance";

	var newActor = document.createElement("button");
	newActor.className = "btn btn-success";
	newActor.setAttribute("type", "button");
	newActor.setAttribute("onclick", "makeNewActor();");
	newActor.innerHTML = "Add Actor";

	formControl4.appendChild(perfActors);
	formControl4.appendChild(newActor);
	form.appendChild(formControl4);


	// Crew
	var formControl5 = document.createElement("div");
	formControl5.className = "form-group";

	var perfCrew = document.createElement("label");
	perfCrew.innerHTML = "Crew Members in this performance";

	var newCrew = document.createElement("button");
	newCrew.className = "btn btn-success";
	newCrew.setAttribute("onclick", "makeNewCrew();");
	newCrew.setAttribute("type", "button");
	newCrew.innerHTML = "Add Crew Member";

	formControl5.appendChild(perfCrew);
	formControl5.appendChild(newCrew);
	form.appendChild(formControl5);




	

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	
	mainDiv.appendChild(form);
}

function getStageID() {
	var hiddenID = document.getElementById("stageHidden");
	var perfStageDrop = document.getElementById("perfStageDrop");
	hiddenID.setAttribute("value", allStages[perfStageDrop.selectedIndex]._id);
}


function makeNewActor() {
	alert("yay!");
}

function makeNewCrew() {
	alert("woo hoo!");
}