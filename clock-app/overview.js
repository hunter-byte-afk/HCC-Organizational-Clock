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
        saveTasks();  // Save after deleting
    }
}

//Line through text for done Code
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Load tasks from localStorage
function loadTasks() {
    const today = new Date().toLocaleDateString();
    const saved = localStorage.getItem(`tasks_${today}`);
    if (saved) {
        const tasks = JSON.parse(saved);
        const taskList = document.getElementById("taskList");
        tasks.forEach(task => {
            var li = document.createElement("li");
            var text = document.createTextNode(task);
            li.appendChild(text);
            
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            
            taskList.appendChild(li);
            
            span.onclick = function(){
                var div = this.parentElement;
                div.style.display = "none";
                saveTasks();
            }
        });
    }
}

// Save tasks to localStorage
function saveTasks() {
    const today = new Date().toLocaleDateString();
    const taskList = document.getElementById("taskList");
    const tasks = [];
    
    for (var i = 0; i < taskList.children.length; i++) {
        const li = taskList.children[i];
        if (li.style.display !== "none") {
            // Get text without the close button
            const text = li.childNodes[0].nodeValue;
            tasks.push(text);
        }
    }
    
    localStorage.setItem(`tasks_${today}`, JSON.stringify(tasks));
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
        saveTasks();  // Save after adding
    }

    document.getElementById("newTask").value = "";   //clears input after entry

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        saveTasks();  // Save after deleting
        }
    }
}

// Load tasks on page load
window.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});