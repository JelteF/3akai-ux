var History = {

	history_cur : -1,
	readyForReload : false,

	historyChange : function(newLocation, historyData) {
		History.checkChange();
	},

	checkChange : function(){
		var str = "" + document.location;
		var hashIndex = str.indexOf("#");
		var ourarg = 1;
		if (hashIndex != -1){
			var hashString = str.substring(hashIndex + 1);
			var hashInt = parseInt(hashString);
			if (hashString == "" || hashInt == -1){
				hashInt = 1;
			}
			ourarg = hashInt;
		}
	},

	history_change : function(){
		var str = "" + document.location;
		var hashIndex = str.indexOf("#");
		var ourarg = "";
		if (hashIndex != -1){
			var hashString = str.substring(hashIndex + 1);
			ourarg = hashString;
		}
		if (ourarg != History.history_cur){
			History.history_cur = ourarg;
			if (ourarg){
				var splitted = ourarg.split("|");
				if (splitted[0] == "message"){
					sakai._inbox.showMessage(parseInt(splitted[1]));
				} else if (splitted[0] == "list"){
					sakai._inbox.startShowingList();
				} else if (splitted[0] == "new"){
					if (splitted[1]) {
						sakai._inbox.startNewMessage(splitted[1]);
					}
					else {
						sakai._inbox.startNewMessage();
					}
				} else if (splitted[0] == "reply"){
					sakai._inbox.startReply(parseInt(splitted[1]));
				}
			} else {
				sakai._inbox.startShowingList();
			}
		}
		setTimeout("History.history_change()",100);
	}, 

	addBEvent: function(id){

		var a = new Array();
		a[0] = "" + id;
		a[1] = "" + id;
		dhtmlHistory.add(a[0],a[1]);

	}

}

window.dhtmlHistory.create({debugMode: false});

window.onload = function() {
	dhtmlHistory.initialize();
	dhtmlHistory.addListener(History.historyChange);
};