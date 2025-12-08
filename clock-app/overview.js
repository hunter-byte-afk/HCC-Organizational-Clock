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
}