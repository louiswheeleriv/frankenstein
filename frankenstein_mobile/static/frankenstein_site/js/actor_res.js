// get the data from the json object
var data = { results };

// the name they searched with
var search_name = '{{ actor_name }}';

var pHeader = document.getElementById("pageHeader").innerHTML = "Performances with actor's named <em>" + search_name + "</em>.....";

// Grouping by actor
var name_matched_actors = [];

for (var i = 0; i < data.length; i++) {

	for(var j = 0; j < data[i].performance_actors.length; j++) {

		var currentActor = {name: data[i].performance_actors[j].name, performance: [i]};

		// if the current actor has the same name as the search name
		if(currentActor.name.indexOf(search_name) > -1 ) {

			// if the list is not empty
			if(name_matched_actors.length != 0) {

				for(var k = 0; k < name_matched_actors.length; k++) {
					// if the name in the table is different, add it in
					if(currentActor.name != name_matched_actors[k].name) {
						name_matched_actors.push(currentActor);
						// console.log("A MATCH!");
					} else {
						// the two names are the same
						// if the performances are different
						if($.inArray(currentActor.performance[0], name_matched_actors[k].performance) == -1) {
							name_matched_actors[k].performance.push(i);
						}
					}
				}

			} else {
				name_matched_actors.push(currentActor);
			}

		}
	}



// the main panel group div
var panelgroup = document.createElement("div");
panelgroup.id = "accordion";
panelgroup.className = "panel-group";

// add it to the main results page
var res = document.getElementById("theResults");
res.appendChild(panelgroup);


for (var i = 0; i < data.length; i++) {

	var pdefault = document.createElement("div");
	pdefault.className = "panel panel-default";

	var panelheading = document.createElement("div");
	panelheading.className = "panel-heading";

	var ptitle = document.createElement("h4");
	ptitle.className = "panel-title";

	var header = document.createElement("a")
	header.setAttribute("data-toggle", "collapse");
	header.setAttribute("data-parent", "#accordion");
	header.setAttribute("href", "#"+i);


	var headerText = document.createElement("div");
	//headerText.innerHTML = data[i].performance_actors[j].name;
	headerText.innerHTML = data[i].performance_actors[0].name;

	var panelCollapse = document.createElement("div");
	panelCollapse.id = i;
	panelCollapse.className = "panel-collapse collapse";

	var panelbody = document.createElement("div");
	panelbody.className = "panel-body";

	var paneltext = document.createElement("p");
	paneltext.setAttribute("style", "color:white;");



	// paneltext.innerHTML = 
	// + "<br>\
	// <strong>Bio: </strong>" + data[i].performance_actors[j].bio
	// + "<br>\
	// <strong>Role: </strong>" + data[i].performance_actors[j].role
	// + "<br>\
	// <strong>Appearance Time: </strong>" + data[i].performance_actors[j].appearance_time
	// ;

	panelgroup.appendChild(pdefault);
	pdefault.appendChild(panelheading);
	panelheading.appendChild(ptitle);
	ptitle.appendChild(header);
	header.appendChild(headerText);
	panelgroup.appendChild(panelCollapse);
	panelCollapse.appendChild(panelbody);
	panelbody.appendChild(paneltext);
}

for(var k = 0; k < name_matched_actors.length; k++) {
	console.log("the matches are: " + name_matched_actors[k].performance);
}