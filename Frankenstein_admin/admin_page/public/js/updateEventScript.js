$(document).ready(function() {

	console.log(allEvents);

	var theEvent = document.getElementById("theEvent");
	var hidden = document.getElementById("hidden");

	for (var i = 0; i < allEvents.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = allEvents[i].event_name;
		theEvent.appendChild(option);
	}

	if(allEvents.length > 0) {
		hidden.value = allEvents[allEvents.length-1]._id;
	}

});

function addID() {
	var hidden = document.getElementById("hidden");
	var yourSelect = document.getElementById( "theEvent" );
	var currentEvent = yourSelect.selectedIndex;
	console.log(allEvents[currentEvent]._id);
	hidden.setAttribute("value", allEvents[currentEvent]._id);
}

function updateTheEvent(){
	var yourSelect = document.getElementById("theEvent");
	currentEvent = yourSelect.selectedIndex;
	updateEvent(currentEvent);
}

function updateEvent(currentEvent) {

	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/update_event");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-control";
	var eventName = document.createElement("label");
	eventName.innerHTML = "Significant Event";
	var eventNameText = document.createElement("input");
	eventNameText.setAttribute("type", "text");
	eventNameText.setAttribute("placeholder", "Name");
	eventNameText.setAttribute("id", "name");
	eventNameText.setAttribute("name", "event_name");
	eventNameText.setAttribute("value", allEvents[currentEvent].event_name);

	formControl1.appendChild(eventName);
	formControl1.appendChild(eventNameText);
	form.appendChild(formControl1);


	var formControl3 = document.createElement("div");
	formControl3.className = "form-control";
	var eventPerf = document.createElement("label");
	eventPerf.innerHTML = "Performances";

	var eventPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE
	
	formControl3.appendChild(eventPerf);
	formControl3.appendChild(eventPerfOptions);
	form.appendChild(formControl3);

	var theID = document.createElement("input");
	theID.setAttribute("type", "hidden");
	theID.setAttribute("name", "_id");
	theID.setAttribute("value", allEvents[currentEvent]._id);
	form.appendChild(theID);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit"
	form.appendChild(submit);


	mainDiv.appendChild(form);
}

function newEvent() {
	var mainDiv = document.getElementById("thisOne");
	mainDiv.innerHTML = "";

	var form = document.createElement("form");
	form.className = "form";
	form.id = "post-form";
	form.setAttribute("role", "form");
	form.setAttribute("action", "/add_event");
	form.setAttribute("method", "POST");

	var formControl1 = document.createElement("div");
	formControl1.className = "form-group";
	var eventName = document.createElement("label");
	eventName.innerHTML = "Significant Event";
	var eventNameText = document.createElement("input");
	eventNameText.setAttribute("type", "text");
	eventNameText.setAttribute("placeholder", "Event Name");
	eventNameText.setAttribute("id", "event_name");
	eventNameText.setAttribute("name", "event_name");

	formControl1.appendChild(eventName);
	formControl1.appendChild(eventNameText);
	form.appendChild(formControl1);

	var formControl3 = document.createElement("div");
	formControl3.className = "form-group";
	var eventPerf = document.createElement("label");
	eventPerf.innerHTML = "Performances";

	var eventPerfOptions = document.createElement("select");
	// ADD OPTIONS HERE
	
	formControl3.appendChild(eventPerf);
	formControl3.appendChild(eventPerfOptions);
	form.appendChild(formControl3);

	var submit = document.createElement("button");
	submit.className = "btn btn-primary";
	submit.setAttribute("type", "submit");
	submit.innerHTML = "Submit";
	form.appendChild(submit);
	
	mainDiv.appendChild(form);
}
