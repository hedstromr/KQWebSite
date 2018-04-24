
function loadeventtable()
{
	var today = new Date();
	var showall = 0;
	var showempty = 0;
	
	var chkShowOldEvents = document.getElementById('chkShowOldEvents');
    if (chkShowOldEvents.checked) {
		showall = 1;
	}
	var chkShowEmptyWeekends = document.getElementById('chkShowEmptyWeekends');
    if (chkShowEmptyWeekends.checked) {
		showempty = 1;
	}

	var heading = new Array();
	heading[0] = new Array("Event date", "90");
	heading[1] = new Array("Event name", "400");
	
	var eventlist = GetEventListFunction();
	
	var tableDiv = document.getElementById("eventtable");
	var table = document.createElement('TABLE');
	var tableBody = document.createElement('TBODY');

	table.appendChild(tableBody);
	
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH');
		th.width = heading[i][1];
		th.align = "left";
		th.appendChild(document.createTextNode(heading[i][0]));
		tr.appendChild(th);
	}
	
	for (i = 0; i < eventlist.length; i++) {
		var parts = eventlist[i][0].split('/');
		var eventdate = new Date(parts[2],parts[0]-1,parts[1]);
		eventdate.setDate(eventdate.getDate() + 1);		
		if (eventdate >= today || showall === 1) {
			if (eventlist[i][1] !== "" || showempty === 1) {
				var tr = document.createElement('TR');
				var tddate = document.createElement('TD');
				tddate.appendChild(document.createTextNode(eventlist[i][0]));
				tr.appendChild(tddate);
				var tdevent = document.createElement('TD');
				if (eventlist[i][2] !=="") {
					var aevent = document.createElement('a');
					aevent.setAttribute('href', eventlist[i][2]);
					aevent.setAttribute('target', '_blank');
					aevent.innerHTML = eventlist[i][1];
					tdevent.appendChild(aevent);
				} else {
					tdevent.appendChild(document.createTextNode(eventlist[i][1]));
				}
				tr.appendChild(tdevent);
				tableBody.appendChild(tr);
			}
		}
	}
	
	tableDiv.innerHTML = "";
	tableDiv.appendChild(table);
}

function load() {
	loadeventtable();
	
    console.log("Page load finished");
}
