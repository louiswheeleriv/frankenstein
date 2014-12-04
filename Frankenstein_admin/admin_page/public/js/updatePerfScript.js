$(document).ready(function() {

	console.log(allPerfs);
	console.log(allStages);
	console.log(allActors);

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

function addID() {
	var hidden = document.getElementById("hidden");
	var yourSelect = document.getElementById( "thePerfs" );
	var currentPerf = yourSelect.selectedIndex;
	hidden.setAttribute("value", allPerfs[currentPerf]._id);
}

function updateThePerf() {
	var yourSelect = document.getElementById("thePerfs");
	currentPerf = yourSelect.selectedIndex;
	updatePerf(currentPerf);
}

function updatePerf(currentPerf) {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/update_perf");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var perfInfo = document.createElement("label");
	perfInfo.innerHTML = "Performance";
	var perfInfoText = document.createElement("input");
	perfInfoText.className = "form-control input-mysize";
	perfInfoText.setAttribute("type", "text");
	perfInfoText.setAttribute("placeholder", "Performance Info");
	perfInfoText.setAttribute("id", "performance_info");
	perfInfoText.setAttribute("name", "performance_info");
	perfInfoText.setAttribute("value", allPerfs[currentPerf].performance_info);

	formControl1.appendChild(perfInfo);
	formControl1.appendChild(perfInfoText);
	form.appendChild(formControl1);



	// STAGES
	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";

	var perfStage = document.createElement("label");
	perfStage.innerHTML = "Performance Location";

	var perfStageDrop = document.createElement("select");
	perfStageDrop.className = "form-control input-mysize";
	perfStageDrop.setAttribute("name", "stage_location");
	perfStageDrop.setAttribute("id", "perfStageDrop");
	perfStageDrop.setAttribute("onchange", "getStageID()");

	// MAKE ALL STAGES WITH CURRENT LOCATION PICKED
	for(var i = 0; i < allStages.length; i++) {
		var perfStageText = document.createElement("option");
		perfStageText.setAttribute("id", "performance_stage");
		perfStageText.setAttribute("name", "performance_stage");
		perfStageText.innerHTML = allStages[i].stage_location;

		if(allStages[i]._id == allPerfs[currentPerf].performance_stage_id) {
			perfStageText.setAttribute("selected", "selected");
		}

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
	startTime.className = "form-control input-mysize";
	startTime.setAttribute("type", "datetime-local");
	startTime.setAttribute("name", "performance_start_time");
	startTime.setAttribute("value", allPerfs[currentPerf].performance_start_time.slice(0, -1));

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
	perfInfoText.className = "form-control input-mysize";
	perfInfoText.setAttribute("type", "text");
	perfInfoText.setAttribute("placeholder", "Performance Info");
	perfInfoText.setAttribute("id", "performance_info");
	perfInfoText.setAttribute("name", "performance_info");

	formControl1.appendChild(perfInfo);
	formControl1.appendChild(perfInfoText);
	form.appendChild(formControl1);

	var hr = document.createElement("hr");
	form.appendChild(hr);


	// STAGES
	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";

	var perfStage = document.createElement("label");
	perfStage.innerHTML = "Performance Location";

	var perfStageDrop = document.createElement("select");
	perfStageDrop.className = "form-control input-mysize";
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

	var hr = document.createElement("hr");
	form.appendChild(hr);


	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";

	var perfTime = document.createElement("label");
	perfTime.innerHTML = "Performance Start Time";

	var startTime = document.createElement("input");
	startTime.className = "form-control input-mysize";
	startTime.setAttribute("type", "datetime-local");
	startTime.setAttribute("value", "2015-04-22T19:00");
	startTime.setAttribute("name", "performance_start_time");

	formControl3.appendChild(perfTime);
	formControl3.appendChild(startTime);
	form.appendChild(formControl3);

	var hr = document.createElement("hr");
	form.appendChild(hr);


	// ACTORS
	var formControl4 = document.createElement("div");
	formControl4.className = "form-group";
	formControl4.id = "actorsDiv";

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

	var hr = document.createElement("hr");
	form.appendChild(hr);


	// Crew
	var formControl5 = document.createElement("div");
	formControl5.className = "form-group";
	formControl5.id = "crewDiv";

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

	var hr = document.createElement("hr");
	form.appendChild(hr);	

	var actCount = document.createElement("input");
	actCount.setAttribute("type", "hidden");
	actCount.setAttribute("id", "actCount");
	actCount.setAttribute("name", "actorcount");
	actCount.setAttribute("value", actorcount);
	form.appendChild(actCount);

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

var actorcount = 0;
function makeNewActor() {
	
	var actorsDiv = document.getElementById("actorsDiv");

	var hr = document.createElement("hr");
	actorsDiv.appendChild(hr);

	var actorName = document.createElement("label");
	actorName.innerHTML = "New Actor's Name, Role, and Appearance Time";

	actorsDiv.appendChild(actorName);

	var actorNameDrop = document.createElement("select");
	actorNameDrop.className = "form-control input-mysize";
	actorNameDrop.setAttribute("name", "actor_name_" + actorcount);
	actorNameDrop.setAttribute("id", "actorNameDrop");
	actorNameDrop.setAttribute("onchange", "getActorID()");

	for(var i = 0; i < allActors.length; i++) {
		var actorNameText = document.createElement("option");
		actorNameText.setAttribute("placeholder", "Actor's Name");
		actorNameText.setAttribute("id", "actor_name_" + actorcount);
		actorNameText.setAttribute("name", "actor_name_" + actorcount);

		actorNameText.innerHTML = allActors[i].actor_name;

		actorNameDrop.appendChild(actorNameText);
	}

	actorsDiv.appendChild(actorNameDrop);

	var actorRoleText = document.createElement("input");
	actorRoleText.setAttribute("type", "text");
	actorRoleText.className = "input-mysize";
	actorRoleText.setAttribute("placeholder", "Actor's Role");
	actorRoleText.setAttribute("name", "actor_role_" + actorcount);
	actorRoleText.setAttribute("id", "actor_role_" + actorcount);
	actorRoleText.setAttribute("required", "");

	actorsDiv.appendChild(actorRoleText);

	var actorAppTime = document.createElement("input");
	actorAppTime.setAttribute("type", "time");
	actorAppTime.className = "input-mysize";
	actorAppTime.setAttribute("value", "19:00");
	actorAppTime.setAttribute("name", "actor_time_" + actorcount);
	actorAppTime.setAttribute("id", "actor_time_" + actorcount);

	actorsDiv.appendChild(actorAppTime);

	var deleteActor = document.createElement("button");
	deleteActor.setAttribute("type", "button");
	
	deleteActor.setAttribute("onclick", "removeThis();");
	deleteActor.className = "btn btn-danger";
	var span = document.createElement("span");
	span.className = "glyphicon glyphicon-remove";
	span.setAttribute("aria-hidden", "true");

	deleteActor.appendChild(span);
	actorsDiv.appendChild(deleteActor);

	actorcount++;
	updateActCount();
}

function updateActCount() {
	var getAct = document.getElementById("actCount");
	getAct.value = actorcount;
}

function removeThis() {
	alert("help");
}