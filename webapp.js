/*
 * Author: Madeleine Redl
 * Date: 18 April 2013 -
 * Descrition: WebApp for planning your tasks
 */



$(document).on('pageinit', function() {
	
	/* hide browser navigation bar */
    hideAddressBar();
    
    /* swipe to delete a task */   
    $( document ).on( "swipeleft swiperight", "li.ui-li", function( event ) {
    	
    	$( "#confirm" ).popup( "open" );
    	
    	var listitem = $(this);
    	$("#confirm #question").html("Wollen Sie die Aufgabe '" + listitem.find('h2').text() + "' löschen?");
       
   		$( "#confirm #yes" ).on( "click", function() {
   			var key = listitem.find('h2').text();
       		localStorage.removeItem(key);
       		showStoredItems();
   		});
   		$( "#confirm #cancel" ).on( "click", function() {
   			$( "#confirm #yes" ).off();
   		});
 
    });
    
    
    /* show form for a new Task */
	$( "#addBtn" ).on( "click", function(event, ui) {
 		$("#newTaskForm").slideDown("slow");	
	});
	
	/* set due date to now */
	var now = new Date().toLocaleDateString();
	$("#duedate").val(now);
	
	/* cancel creating a new Task  */
	$("#cancelNewTaskBtn").on( "click", function(event, ui) {
 		$("#titel").val('');
		$("#beschreibung").val('');
		$("#newTaskForm").slideUp();	
	});
	
	/* check for local storage support */
	if ('localStorage' in window && window['localStorage'] !== null) {
		showStoredItems();
	} else {
	  	alert("Warnung: Ihr Browser unterstützt kein HTML5 storage. Ihre Einträge können nicht gespeichert werden!");
	}
	
	/* add new task to the list */	
	$( "#newTaskBtn" ).on( "click", function(event, ui) {
		addNewTask();
		event.preventDefault();
	});
	

});

function hideAddressBar() {
    if (navigator.userAgent.match(/Android/i)) {
        window.scrollTo(0, 0); // reset in case prev not scrolled
        var nPageH = $(document).height();
        var nViewH = window.outerHeight;
        if (nViewH > nPageH) {
            nViewH = nViewH / window.devicePixelRatio;
            $('BODY').css('height', nViewH + 'px');
        }
        window.scrollTo(0, 1);
    } else {
        addEventListener("load", function() {
            setTimeout(hideURLbar, 0);
            setTimeout(hideURLbar, 500);
        }, false);
    }
    function hideURLbar() {
        if (!pageYOffset) {
            window.scrollTo(0, 1);
        }
    }
    return this;
}

function addNewTask(){
	var key, value = "";
	key = $("#titel").val();
	
	if(localStorage.getItem($("#titel").val())!= null && localStorage.getItem($("#titel").val())!=""){
		value = localStorage.getItem($("#titel").val()) + "<p>" + $("#beschreibung").val() + "</p>";	
	}else{
		value = "<p class='ui-li-aside'>Zeit bis: "+ $("#duedate").val() + "</p><p>" + $("#beschreibung").val() + "</p>";
	}	
	
	if (key==null || key==""){
		
		$( "#confirm" ).popup( "open" );
		
		$("#confirm #question").html("Bitte geben Sie den Namen der Aufgabe ein!");
       
   		$( "#confirm #yes" ).on( "click", function() {
   			$("#titel").focus();
   		});
   		
   		$( "#confirm #cancel" ).on( "click", function() {
   			$("#titel").val('');
			$("#beschreibung").val('');
			$("#newTaskForm").slideUp();
			return;
   		});
   		
	}else{	
		localStorage.setItem(key, value);
		$("#titel").val('');
		$("#beschreibung").val('');
		$("#newTaskForm").slideUp();
		showStoredItems();
	}
}

function showStoredItems(){

	//localStorage.clear();
	var items = ""; 
	var i = 0;
    var storageLength = localStorage.length-1; //how many items are in the database starting with zero
 
    // loop through each item in the database
    for (i = 0; i <= storageLength; i++) {
        var itemKey = localStorage.key(i);
        var value = localStorage.getItem(itemKey);
        items += '<li id="item' + i + ' "><h2>'+ itemKey +'</h2>' + value + '</li>';         //add item as a list item
    }
    
    if (items == ""){
        items = '<li class="empty">Derzeit keine Aufgaben</li>';
    }
 
 	$("#tasklist").html("<li data-role=\"list-divider\">Alle Aufgaben</li>");
    $("#tasklist").append(items); 
    $("#tasklist").listview('refresh');

}




