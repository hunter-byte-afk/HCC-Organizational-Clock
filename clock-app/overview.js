//Clear Button Code
var myNodeList = document.getElementsByTagName("LI");

for (var i = 0; i < myNodeList.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
for (var i= 0; i < close.length; i++){
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
    }
}

//Task Entry Code
function newElement(){
    var li = document.createElement("li");  //Creates new list element (new row for the list)
    var inputValue = document.getElementById("newTask").value;   //Retrieves what user entered
    var text = document.createTextNode(inputValue);     //Enters text into the list from inputValue

    li.appendChild(text);

    if(inputValue == ''){  //alerts user to enter a task
        alert("Please enter a task.");
    }
    else{   //enters task into list
        document.getElementById("taskList").appendChild(li);
    }

    document.getElementById("newTask").value = "";   //clears input after entry

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        }
    }
}