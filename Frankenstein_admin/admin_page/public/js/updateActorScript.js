// //file : hello.js
// $(document).ready(function() {
// 	console.log("hello world");
// });

function doThis() {
	var mainDiv = document.getElementById("thisOne");
	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_actor");
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


	mainDiv.appendChild(form);
}
