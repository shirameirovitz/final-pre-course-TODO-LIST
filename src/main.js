//Get latest TODO Json from the api 
fetch("http://localhost:3001/api/v3/b/1613733860787", {
  method: "GET",
  headers: {
    "X-Master-Key":
      "$2b$10$rT9KA7aWo7ylVFwC/8i9yudVXkXAns0O7nj/vzhOi8BKQg.qYxU1e",
  },
})
  .then((res) => res.json())
  .then((data) => loadData(data["my-todo"]))
  .catch((error)=>{
    document.getElementById("message").innerHTML = "ERROR!";
    document.getElementById("status-bar").style.display = "";
    alert(error)
  });

//load list from json
function loadData(data) {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      createItem(data[i].text, data[i].priority, data[i].date);
    }
  }
  document.getElementById("status-bar").style.display = "none";
}

//onClick add item button
function addItem() {
 
  const text = document.getElementById("text-input");

  //check for input
  if (text.value !== "") {
    const priority = document.getElementById("priority-selector");
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    createItem(text.value, priority.value, date); //create list item
     //update status bar
  document.getElementById("message").innerHTML = "Inserting a new TODO...";
  document.getElementById("status-bar").style.display = "";

    update(); //update json

    //reset inputs
    text.value = "";
    priority.value = 1;
  } else {
    alert("PLEASE WRITE SOMETHING!");
  }
}

//creates a new list item
function createItem(text, priority, date) {
  const list = document.getElementById("list");
  let li = document.createElement("li");
  //add checkbox
  let checkbox = document.createElement("input");
  checkbox.classList = "checkbox";
  checkbox.type = "checkbox";
  checkbox.value = 1;
  checkbox.name = "todo[]";
  li.appendChild(checkbox);
  checkbox.addEventListener("click", function (e) {
    if (this.checked) {
      li.style.textDecorationLine = "line-through";
    } else {
      li.style.textDecorationLine = "none";
    }
  });
  //
  let main = document.createElement("div");
  main.classList.add("todo-container");

  //priority
  let priorityDiv = document.createElement("div");
  priorityDiv.className = "todo-priority";
  priorityDiv.innerText = priority;
  //date
  let DateDiv = document.createElement("div");
  DateDiv.className = "todo-created-at";
  DateDiv.innerText = date;
  //todo text
  let textDiv = document.createElement("div");
  textDiv.className = "todo-text";
  textDiv.innerText = text;

  main.appendChild(priorityDiv);
  main.appendChild(DateDiv);
  main.appendChild(textDiv);
  li.appendChild(main);

  //add delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.classList = "remove-button";
  deleteBtn.innerHTML = '<img src="images/remove.png" />';

  //onclick function for delete Btn
  deleteBtn.addEventListener("click", () => {
    //update status bar
    counter.innerHTML = Number(document.getElementById("counter").innerHTML) - 1;
    document.getElementById("message").innerHTML = "Removing a TODO...";
    document.getElementById("status-bar").style.display = "";
    
    li.parentNode.removeChild(li);//remove list item
    update();//update json
    
  });
  li.appendChild(deleteBtn);
  list.appendChild(li);

  //Counter increase
  let counter = document.getElementById("counter");
  counter.innerHTML = Number(document.getElementById("counter").innerHTML) + 1;
}

//active enter key - submit todo
function handleKeyPress(e) {
  var key = e.keyCode || e.key;
  if (key === 13) {
    addItem();
  }
}

//show/hide search input
function showSearch() {
  const searchElement = document.getElementById("search-input");
  const status = searchElement.style.display;
  if (status === "none") searchElement.style.display = "";
  else searchElement.style.display = "none";
}

//search and filter a TODO in the list
function onSearch(e) {
  const input = document.getElementById("search-input").value;

  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");
  if (input) {
    for (let i = 0; i < items.length; i++) {
      const text = items[i].getElementsByClassName("todo-text")[0].innerText;
      if (text.includes(input)) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
    }
  } else {
    //reset list
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "";
    }
  }
}

//sort list by priority from high to low
function sortList() {
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");

  for (let j = 0; j < items.length; j++) {
    for (let i = 0; i < items.length - 1 - j; i++) {
      let firstValue = items[i].getElementsByClassName("todo-priority")[0].innerText;
      let secondValue = items[i + 1].getElementsByClassName("todo-priority")[0].innerText;
      if (firstValue < secondValue) {
        let firstItem = items[i];
        let secondItem = items[i + 1];
        firstItem.parentNode.insertBefore(secondItem, firstItem);
      }
    }
  }
}

//Update json by list
function update() {
  liArr = document.getElementsByClassName("todo-container");
  data = [];
  for (let i = 0; i < liArr.length; i++) {
    const priority = liArr[i].getElementsByClassName("todo-priority")[0].innerText;
    const date = liArr[i].getElementsByClassName("todo-created-at")[0].innerText;
    const text = liArr[i].getElementsByClassName("todo-text")[0].innerText;
    data.push({ priority, date, text });
  }
  editJson(data);
}

//update JSONBIN
function editJson(data) {
  fetch("http://localhost:3001/api/v3/b/1613733860787", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$rT9KA7aWo7ylVFwC/8i9yudVXkXAns0O7nj/vzhOi8BKQg.qYxU1e",
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({ "my-todo": data }),
  }).then(() => {
    document.getElementById("status-bar").style.display = "none";
  })
  .catch((error)=>{
    document.getElementById("message").innerHTML = "ERROR!";
    document.getElementById("status-bar").style.display = "";
    alert(error);
  });
}
