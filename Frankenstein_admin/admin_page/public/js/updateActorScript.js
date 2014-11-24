var currActor = -1;

$(document).ready(function() {

	console.log(allActors);

	var theActors = document.getElementById("theActors");

	for (var i = 0; i < allActors.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = allActors[i].name;
		theActors.appendChild(option);
	}

});

function addID() {
	var hidden = getElementById	("hidden");
	var yourSelect = document.getElementById( "theActors" );
	var currentActor = yourSelect.selectedIndex;
	console.log(allActors[currentActor]._id);
	hidden.value = allActors[currentActor]._id;
}

function updateTheActor(){
	var yourSelect = document.getElementById( "theActors" );
	currentActor = yourSelect.selectedIndex;
	updateActor(currentActor);
}

function updateActor(currentActor) {

	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";


	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/update_actor");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-control";
	var actorName = document.createElement("label");
	actorName.innerHTML = "Actor's Name";
	var actorNameText = document.createElement("input");
	actorNameText.setAttribute("type", "text");
	actorNameText.setAttribute("placeholder", "Name");
	actorNameText.setAttribute("id", "name");
	actorNameText.setAttribute("name", "actor_name");
	actorNameText.setAttribute("value", allActors[currentActor].name);

	formControl1.appendChild(actorName);
	formControl1.appendChild(actorNameText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-control";
	var actorBio = document.createElement("label");
	actorBio.innerHTML = "Actor's Bio";

	var actorBioText = document.createElement("textarea");
	actorBioText.setAttribute("row", "4");
	actorBioText.setAttribute("placeholder", "Bio");
	actorBioText.setAttribute("id", "bio");
	actorBioText.setAttribute("name", "actor_bio");
	actorBioText.innerHTML = allActors[currentActor].bio;

	formControl2.appendChild(actorBio);
	formControl2.appendChild(actorBioText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-control";
	var actorPerf = document.createElement("label");
	actorPerf.innerHTML = "Performances, Roles, and Appearance Times";

	var actorPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE

	var actorRole = document.createElement("input");
	actorRole.setAttribute("type", "text");
	actorRole.setAttribute("placeholder", "Role");
	actorRole.setAttribute("name", "actor_role");

	var actorAppTime = document.createElement("input");
	actorAppTime.setAttribute("type", "time");
	actorAppTime.setAttribute("value", "19:00");
	actorAppTime.setAttribute("name", "actor_appTime");
	
	formControl3.appendChild(actorPerf);
	formControl3.appendChild(actorPerfOptions);
	formControl3.appendChild(actorRole);
	formControl3.appendChild(actorAppTime);
	form.appendChild(formControl3);

	// <input type="hidden" name="Language" value="English">
	// console.log(allActors[currentActor]._id);
	var theID = document.createElement("input");
	theID.setAttribute("type", "hidden");
	theID.setAttribute("name", "_id");
	theID.setAttribute("value", allActors[currentActor]._id);
	form.appendChild(theID);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit"
	form.appendChild(submit);


	mainDiv.appendChild(form);
}

function newActor() {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_actor");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var actorName = document.createElement("label");
	actorName.innerHTML = "Actor's Name";
	var actorNameText = document.createElement("input");
	actorNameText.setAttribute("type", "text");
	actorNameText.setAttribute("placeholder", "Name");
	actorNameText.setAttribute("id", "name");
	actorNameText.setAttribute("name", "actor_name");

	formControl1.appendChild(actorName);
	formControl1.appendChild(actorNameText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";
	var actorBio = document.createElement("label");
	actorBio.innerHTML = "Actor's Bio";

	var actorBioText = document.createElement("textarea");
	actorBioText.setAttribute("row", "4");
	actorBioText.setAttribute("placeholder", "Bio");
	actorBioText.setAttribute("id", "bio");
	actorBioText.setAttribute("name", "actor_bio");

	formControl2.appendChild(actorBio);
	formControl2.appendChild(actorBioText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";
	var actorPerf = document.createElement("label");
	actorPerf.innerHTML = "Performances, Roles, and Appearance Times";

	var actorPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE

	var actorRole = document.createElement("input");
	actorRole.setAttribute("type", "text");
	actorRole.setAttribute("placeholder", "Role");
	actorRole.setAttribute("name", "actor_role");

	var actorAppTime = document.createElement("input");
	actorAppTime.setAttribute("type", "time");
	actorAppTime.setAttribute("value", "19:00");
	actorAppTime.setAttribute("name", "actor_appTime");
	
	formControl3.appendChild(actorPerf);
	formControl3.appendChild(actorPerfOptions);
	formControl3.appendChild(actorRole);
	formControl3.appendChild(actorAppTime);
	form.appendChild(formControl3);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	


	mainDiv.appendChild(form);
}


function removeActor() {
	var yourSelect = document.getElementById( "theActors" );
	var currentActor = yourSelect.selectedIndex;

	alert("Are you sure you want to permantly remove " + allActors[currentActor].name + "?")

	
}