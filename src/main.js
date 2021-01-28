function addItem() {
    const text = document.getElementById("text-input");
    
    const priority = document.getElementById("priority-selector").value;
    const list = document.getElementById("list");
    //
    let li = document.createElement("li");
  
    let main = document.createElement("div");
    main.classList.add("todo-container");
  
    //priority
    let priorityDiv = document.createElement("div");
    priorityDiv.className = "todo-priority";
    priorityDiv.innerText = priority;
    //date
    let DateDiv = document.createElement("div");
    DateDiv.className = "todo-created-at";
    DateDiv.innerText = new Date().toLocaleString();
    //todo string
    let textDiv = document.createElement("div");
    textDiv.className = "todo-text";
    textDiv.innerText = text.value;
  
    main.appendChild(priorityDiv);
    main.appendChild(DateDiv);
    main.appendChild(textDiv);
  
    li.appendChild(main);
    list.appendChild(li);
    
    //Counter increase
    let counter = document.getElementById("counter");
    counter.innerHTML = Number(document.getElementById("counter").innerHTML) + 1;
  
    text.value = ""; //clear input
  }
  
  //active enter key
  function handleKeyPress(e) {
    var key = e.keyCode || e.key;
    if (key === 13) {
      addItem();
    }
  }
  

  //sort list
  function sortList(ul) {
    var ul = document.getElementById("list");
  
    
      console.log("shir");
  
    let listItems = ul.getElementsByTagName("li");
    let arr = [];
    for (let i = 0; i < listItems.length; i++) {
     let value = listItems[i].getElementsByClassName("todo-priority")[0].innerText;   
    }
  }