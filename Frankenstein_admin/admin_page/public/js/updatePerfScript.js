$(document).ready(function() {

	console.log(allPerfs);
	console.log(allStages);
	console.log(allActors);
	console.log(allCrew);

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
	var hr = document.createElement("hr");
	formControl1.appendChild(hr);

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
	var hr = document.createElement("hr");
	formControl2.appendChild(hr);

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
	var hr = document.createElement("hr");
	formControl3.appendChild(hr);

	form.appendChild(formControl3);


	// ACTORS
	var formControl4 = document.createElement("div");
	formControl4.className = "form-group";
	formControl4.id = "actorsDiv";
	formControl4.innerHTML = "";

	var perfActors = document.createElement("label");
	perfActors.innerHTML = "Actors in this performance";

	var newActor = document.createElement("button");
	newActor.className = "btn btn-success";
	newActor.setAttribute("type", "button");
	newActor.setAttribute("onclick", "makeNewActor();");
	newActor.innerHTML = "Add Actor";

	formControl4.appendChild(perfActors);
	formControl4.appendChild(newActor);

	for(var j = 0; j < allPerfs[currentPerf].performance_actors.length; j++) {

		var actDiv = document.createElement("div");
		actDiv.id = "D" + actorcount;

		formControl4.appendChild(actDiv);


		var hr = document.createElement("hr");
		actDiv.appendChild(hr);

		var actorName = document.createElement("label");
		actorName.innerHTML = "New Actor's Name, Role, and Appearance Time";

		actDiv.appendChild(actorName);


		var actorNameDrop = document.createElement("select");
		actorNameDrop.className = "form-control input-mysize";
		actorNameDrop.setAttribute("name", "actorName");
		actorNameDrop.setAttribute("id", "a"+actorcount);

		actorNameDrop.setAttribute("onchange", "getActorID(this.selectedIndex,this.id)");

		for(var k = 0; k < allActors.length; k++) {
			var actorNameText = document.createElement("option");
			actorNameText.setAttribute("placeholder", "Actor's Name");
			actorNameText.setAttribute("name", "actor_name_" + actorcount);

			actorNameText.innerHTML = allActors[k].actor_name;

			if(allActors[k]._id == allPerfs[currentPerf].performance_actors[j].actor_id) {
				actorNameText.setAttribute("selected", "selected");
			}

			actorNameDrop.appendChild(actorNameText);
		}

		actDiv.appendChild(actorNameDrop);

		var actorRoleText = document.createElement("input");
		actorRoleText.setAttribute("type", "text");
		actorRoleText.className = "input-mysize";
		actorRoleText.setAttribute("placeholder", "Actor's Role");
		actorRoleText.setAttribute("name", "actorRole");
		actorRoleText.setAttribute("required", "");
		actorRoleText.value = allPerfs[currentPerf].performance_actors[j].actor_role;

		actDiv.appendChild(actorRoleText);

		var actorAppTime = document.createElement("input");
		actorAppTime.setAttribute("type", "text");
		actorAppTime.className = "input-mysize";
		actorAppTime.setAttribute("placeholder", "Actor's Appearance Time (in min)");
		actorAppTime.setAttribute("name", "actorTime");
		actorAppTime.setAttribute("id", "actor_time_" + actorcount);
		actorAppTime.value = allPerfs[currentPerf].performance_actors[j].actor_appearance_time;

		actDiv.appendChild(actorAppTime);


		var theID = document.createElement("input");
		theID.setAttribute("type", "hidden");
		theID.setAttribute("name", "actorId");
		theID.id = "theID"+actorcount;
		theID.value = [allPerfs[currentPerf].performance_actors[j].actor_id];

		actDiv.appendChild(theID);

		var deleteActor = document.createElement("button");
		deleteActor.setAttribute("type", "button");
		deleteActor.id = actDiv.id;
		deleteActor.setAttribute("onclick", "removeThis(this.id);");
		deleteActor.className = "btn btn-danger";
		var span = document.createElement("span");
		span.className = "glyphicon glyphicon-remove";
		span.setAttribute("aria-hidden", "true");

		deleteActor.appendChild(span);
		actDiv.appendChild(deleteActor);

		actorcount++;
	}

	var hr = document.createElement("hr");
	formControl4.appendChild(hr);
	form.appendChild(formControl4);


	// Crew
	var formControl5 = document.createElement("div");
	formControl5.className = "form-group";
	formControl5.id = "crewDiv";
	formControl5.innerHTML = "";

	var perfCrew = document.createElement("label");
	perfCrew.innerHTML = "Crew Members in this performance";

	var newCrew = document.createElement("button");
	newCrew.className = "btn btn-success";
	newCrew.setAttribute("onclick", "makeNewCrew();");
	newCrew.setAttribute("type", "button");
	newCrew.innerHTML = "Add Crew Member";

	formControl5.appendChild(perfCrew);
	formControl5.appendChild(newCrew);

	for(var j = 0; j < allPerfs[currentPerf].performance_crew.length; j++) {
		var cDiv = document.createElement("div");
		cDiv.id = "C" + crewcount;

		formControl5.appendChild(cDiv);

		var hr = document.createElement("hr");
		cDiv.appendChild(hr);

		var crewName = document.createElement("label");
		crewName.innerHTML = "Crew Member's Name and Responsiblity";

		cDiv.appendChild(crewName);

		var crewNameDrop = document.createElement("select");
		crewNameDrop.className = "form-control input-mysize";
		crewNameDrop.setAttribute("name", "crewName");
		crewNameDrop.setAttribute("id", "c"+crewcount);
		crewNameDrop.setAttribute("onchange", "getCrewID(this.selectedIndex,this.id);");

		for(var i = 0; i < allCrew.length; i++) {
			var crewNameText = document.createElement("option");
			crewNameText.setAttribute("placeholder", "Crew Member's Name");
			crewNameText.setAttribute("name", "crew_name_" + crewcount);

			crewNameText.innerHTML = allCrew[i].crew_name;

			if(allCrew[i]._id == allPerfs[currentPerf].performance_crew[j].crew_id) {
				actorNameText.setAttribute("selected", "selected");
			}

			crewNameDrop.appendChild(crewNameText);

		}

		cDiv.appendChild(crewNameDrop);

		var crewRespText = document.createElement("input");
		crewRespText.setAttribute("type", "text");
		crewRespText.className = "input-mysize";
		crewRespText.setAttribute("placeholder", "Crew Member's Responsiblity");
		crewRespText.setAttribute("name", "crewResp");
		crewRespText.setAttribute("required", "");
		crewRespText.value = allPerfs[currentPerf].performance_crew[j].crew_responsibility;

		cDiv.appendChild(crewRespText);

		var crewID = document.createElement("input");
		crewID.setAttribute("type", "hidden");
		crewID.setAttribute("name", "crewId");
		crewID.id = "crewID"+crewcount;
		crewID.value = [allPerfs[currentPerf].performance_crew[j].crew_id];

		cDiv.appendChild(crewID);

		var deleteActor = document.createElement("button");
		deleteActor.setAttribute("type", "button");
		deleteActor.id = cDiv.id;
		deleteActor.setAttribute("onclick", "removeThisToo(this.id);");
		deleteActor.className = "btn btn-danger";
		var span = document.createElement("span");
		span.className = "glyphicon glyphicon-remove";
		span.setAttribute("aria-hidden", "true");

		deleteActor.appendChild(span);
		cDiv.appendChild(deleteActor);

		crewcount++;

	}

	var hr = document.createElement("hr");
	formControl5.appendChild(hr);
	form.appendChild(formControl5);
	
	var actCount = document.createElement("input");
	actCount.setAttribute("value", actorcount);
	actCount.setAttribute("id", "actCount");
	actCount.setAttribute("type", "hidden");
	actCount.setAttribute("name", "actorcount");
	form.appendChild(actCount);

	var cCount = document.createElement("input");
	cCount.setAttribute("type", "hidden");
	cCount.setAttribute("id", "cCount");
	cCount.setAttribute("name", "crewcount");
	cCount.setAttribute("value", crewcount);
	form.appendChild(cCount);


	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	
	mainDiv.appendChild(form);
}







/*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************/



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

	var cCount = document.createElement("input");
	cCount.setAttribute("type", "hidden");
	cCount.setAttribute("id", "cCount");
	cCount.setAttribute("name", "crewcount");
	cCount.setAttribute("value", crewcount);
	form.appendChild(cCount);

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

	var actDiv = document.createElement("div");
	actDiv.id = "D" + actorcount;

	actorsDiv.appendChild(actDiv);

	var hr = document.createElement("hr");
	actDiv.appendChild(hr);

	var actorName = document.createElement("label");
	actorName.innerHTML = "New Actor's Name, Role, and Appearance Time";

	actDiv.appendChild(actorName);

	var actorNameDrop = document.createElement("select");
	actorNameDrop.className = "form-control input-mysize";
	actorNameDrop.setAttribute("name", "actorName");
	actorNameDrop.setAttribute("id", "a"+actorcount);

	actorNameDrop.setAttribute("onchange", "getActorID(this.selectedIndex,this.id)");

	for(var i = 0; i < allActors.length; i++) {
		var actorNameText = document.createElement("option");
		actorNameText.setAttribute("placeholder", "Actor's Name");
		actorNameText.setAttribute("name", "actor_name_" + actorcount);

		actorNameText.innerHTML = allActors[i].actor_name;

		actorNameDrop.appendChild(actorNameText);
	}

	actDiv.appendChild(actorNameDrop);

	var actorRoleText = document.createElement("input");
	actorRoleText.setAttribute("type", "text");
	actorRoleText.className = "input-mysize";
	actorRoleText.setAttribute("placeholder", "Actor's Role");
	actorRoleText.setAttribute("name", "actorRole");
	actorRoleText.setAttribute("required", "");

	actDiv.appendChild(actorRoleText);

	var actorAppTime = document.createElement("input");
	actorAppTime.setAttribute("type", "text");
	actorAppTime.className = "input-mysize";
	actorAppTime.setAttribute("placeholder", "Actor's Appearance Time (in min)");
	actorAppTime.setAttribute("name", "actorTime");
	actorAppTime.setAttribute("id", "actor_time_" + actorcount);

	actDiv.appendChild(actorAppTime);

	var theID = document.createElement("input");
	theID.setAttribute("type", "hidden");
	theID.setAttribute("name", "actorId");
	theID.id = "theID"+actorcount;
	theID.value = [allActors[0]._id];

	actDiv.appendChild(theID);


	var deleteActor = document.createElement("button");
	deleteActor.setAttribute("type", "button");
	deleteActor.id = actDiv.id;
	deleteActor.setAttribute("onclick", "removeThis(this.id);");
	deleteActor.className = "btn btn-danger";
	var span = document.createElement("span");
	span.className = "glyphicon glyphicon-remove";
	span.setAttribute("aria-hidden", "true");

	deleteActor.appendChild(span);
	actDiv.appendChild(deleteActor);

	actorcount++;
	updateActCount();
}

function updateActCount() {
	var getAct = document.getElementById("actCount");
	getAct.value = actorcount;
}

function getActorID(num1, idName) {
	var hidden = document.getElementById("theID"+idName.slice(1));
	var yourSelect = document.getElementById( idName );
	var currentActor = yourSelect.selectedIndex;
	hidden.setAttribute("value", allActors[num1]._id);
}


var crewcount = 0;
function makeNewCrew() {

	var crewDiv = document.getElementById("crewDiv");

	var cDiv = document.createElement("div");
	cDiv.id = "C" + crewcount;

	crewDiv.appendChild(cDiv);

	var hr = document.createElement("hr");
	cDiv.appendChild(hr);

	var crewName = document.createElement("label");
	crewName.innerHTML = "New Crew Members's Name and Responsiblity";

	cDiv.appendChild(crewName);

	var crewNameDrop = document.createElement("select");
	crewNameDrop.className = "form-control input-mysize";
	crewNameDrop.setAttribute("name", "crewName");
	crewNameDrop.setAttribute("id", "c"+crewcount);
	crewNameDrop.setAttribute("onchange", "getCrewID(this.selectedIndex,this.id);");

	for(var i = 0; i < allCrew.length; i++) {
		var crewNameText = document.createElement("option");
		crewNameText.setAttribute("placeholder", "Crew Member's Name");
		crewNameText.setAttribute("name", "crew_name_" + crewcount);

		crewNameText.innerHTML = allCrew[i].crew_name;

		crewNameDrop.appendChild(crewNameText);
	}

	cDiv.appendChild(crewNameDrop);


	var crewRespText = document.createElement("input");
	crewRespText.setAttribute("type", "text");
	crewRespText.className = "input-mysize";
	crewRespText.setAttribute("placeholder", "Crew Member's Responsiblity");
	crewRespText.setAttribute("name", "crewResp");
	crewRespText.setAttribute("required", "");

	cDiv.appendChild(crewRespText);

	var crewID = document.createElement("input");
	crewID.setAttribute("type", "hidden");
	crewID.setAttribute("name", "crewId");
	crewID.id = "crewID"+crewcount;
	crewID.value = [allCrew[0]._id];

	cDiv.appendChild(crewID);

	var deleteActor = document.createElement("button");
	deleteActor.setAttribute("type", "button");
	deleteActor.id = cDiv.id;
	deleteActor.setAttribute("onclick", "removeThisToo(this.id);");
	deleteActor.className = "btn btn-danger";
	var span = document.createElement("span");
	span.className = "glyphicon glyphicon-remove";
	span.setAttribute("aria-hidden", "true");

	deleteActor.appendChild(span);
	cDiv.appendChild(deleteActor);

	crewcount++;
	updateCrewCount();
}

function updateCrewCount() {
	var getCrew = document.getElementById("cCount");
	getCrew.value = crewcount;
}


function getCrewID(num1, idName) {
	var hidden = document.getElementById("crewID"+idName.slice(1));

	var yourSelect = document.getElementById(idName);
	var currentCrew = yourSelect.selectedIndex;
	hidden.value = allCrew[num1]._id;
}






function removeThis(num) {
	console.log(num);
	var div = document.getElementById("D"+num.slice(1));
	actorcount--;
	div.parentNode.removeChild(div);
}


function removeThisToo(num) {
	console.log(num);
	var div = document.getElementById("C"+num.slice(1));
	crewcount--;
	div.parentNode.removeChild(div);
}