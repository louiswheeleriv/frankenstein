$(document).ready(function() {

	console.log(allCrew);

	var theCrew = document.getElementById("theCrew");
	var hidden = document.getElementById("hidden");

	for (var i = 0; i < allCrew.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = allCrew[i].crew_name;
		theCrew.appendChild(option);
	}

	if(allCrew.length > 0) {
		hidden.value = allCrew[allCrew.length-1]._id;
	}

});

function addID() {
	var hidden = document.getElementById("hidden");
	var yourSelect = document.getElementById( "theCrew" );
	var currentCrew = yourSelect.selectedIndex;
	console.log(allCrew[currentCrew]._id);
	hidden.setAttribute("value", allCrew[currentCrew]._id);
}


function updateTheCrew(){
	var yourSelect = document.getElementById( "theCrew" );
	currentCrew = yourSelect.selectedIndex;
	updateCrew(currentCrew);
}

function updateCrew(currentCrew) {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";


	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/update_crew");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-control";
	var crewName = document.createElement("label");
	crewName.innerHTML = "Crew Member's Name";
	var crewNameText = document.createElement("input");
	crewNameText.setAttribute("type", "text");
	crewNameText.setAttribute("placeholder", "Name");
	crewNameText.setAttribute("id", "name");
	crewNameText.setAttribute("name", "crew_name");
	crewNameText.setAttribute("value", allCrew[currentCrew].crew_name);

	formControl1.appendChild(crewName);
	formControl1.appendChild(crewNameText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-control";
	var crewBio = document.createElement("label");
	crewBio.innerHTML = "Crew Member's Bio";

	var crewBioText = document.createElement("textarea");
	crewBioText.setAttribute("row", "4");
	crewBioText.setAttribute("placeholder", "Bio");
	crewBioText.setAttribute("id", "bio");
	crewBioText.setAttribute("name", "crew_bio");
	crewBioText.innerHTML = allCrew[currentCrew].crew_bio;

	formControl2.appendChild(crewBio);
	formControl2.appendChild(crewBioText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-control";
	var crewPerf = document.createElement("label");
	crewPerf.innerHTML = "Performances, Roles, and Appearance Times";

	var crewPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE

	var crewResponsibility = document.createElement("input");
	crewResponsibility.setAttribute("type", "text");
	crewResponsibility.setAttribute("placeholder", "Role");
	crewResponsibility.setAttribute("name", "crew_responsibility");

	
	formControl3.appendChild(crewPerf);
	formControl3.appendChild(crewPerfOptions);
	formControl3.appendChild(crewResponsibility);
	form.appendChild(formControl3);

	var theID = document.createElement("input");
	theID.setAttribute("type", "hidden");
	theID.setAttribute("name", "_id");
	theID.setAttribute("value", allCrew[currentCrew]._id);
	form.appendChild(theID);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit"
	form.appendChild(submit);


	mainDiv.appendChild(form);
}

function newCrew() {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_crew");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var crewName = document.createElement("label");
	crewName.innerHTML = "Crew Member's Name";
	var crewNameText = document.createElement("input");
	crewNameText.setAttribute("type", "text");
	crewNameText.setAttribute("placeholder", "Name");
	crewNameText.setAttribute("id", "name");
	crewNameText.setAttribute("name", "crew_name");

	formControl1.appendChild(crewName);
	formControl1.appendChild(crewNameText);
	form.appendChild(formControl1);


	var formControl2 = document.createElement("div");
	formControl2.className = "form-group";
	var crewBio = document.createElement("label");
	crewBio.innerHTML = "Crew Member's Bio";

	var crewBioText = document.createElement("textarea");
	crewBioText.setAttribute("row", "4");
	crewBioText.setAttribute("placeholder", "Bio");
	crewBioText.setAttribute("id", "bio");
	crewBioText.setAttribute("name", "crew_bio");

	formControl2.appendChild(crewBio);
	formControl2.appendChild(crewBioText);
	form.appendChild(formControl2);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";
	var crewPerf = document.createElement("label");
	crewPerf.innerHTML = "Performances and Responsibility";

	var crewPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE

	var crewResponsibility = document.createElement("input");
	crewResponsibility.setAttribute("type", "text");
	crewResponsibility.setAttribute("placeholder", "Role");
	crewResponsibility.setAttribute("name", "crew_responsibility");


	formControl3.appendChild(crewPerf);
	formControl3.appendChild(crewPerfOptions);
	formControl3.appendChild(crewResponsibility);
	form.appendChild(formControl3);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	


	mainDiv.appendChild(form);
}
