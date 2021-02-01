//load data from json.bin
fetch("https://api.jsonbin.io/v3/b/6017e3d85415b40ac2208a40", {
  method: "GET",
  headers: {
    "X-Master-Key":
      "$2b$10$rT9KA7aWo7ylVFwC/8i9yudVXkXAns0O7nj/vzhOi8BKQg.qYxU1e",
  },
})
  .then((res) => res.json())
  .then((data) => loadData(data["record"]["my-todo"]));

async function loadData(data) {
  console.log(data)
  if (data) {
    for (let i = 0; i < data.length; i++) {
      await createItem(data[i].text, data[i].priority, data[i].date);
    }
  }
}
//inside the input
function addItem() {
  const text = document.getElementById("text-input");

  //check for input
  if (text.value !== "") {
    const priority = document.getElementById("priority-selector");
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    createItem(text.value, priority.value, date);//create list item
    update();//update json

    //reset inputs
    text.value = "";
    //priority.value = 1;
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
      li.style.textDecorationColor ="rgb(83, 146, 102)"
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
  
  //
  deleteBtn.addEventListener("click", () => {
    li.parentNode.removeChild(li);
    update();
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

//the sort list
function sortList() {
  //event.preventDefault();
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");

  for (let j = 0; j < items.length; j++) {
    for (let i = 0; i < items.length - 1 - j; i++) {
      let firstValue = items[i].getElementsByClassName("todo-priority")[0]
        .innerText;
      let secondValue = items[i + 1].getElementsByClassName("todo-priority")[0]
        .innerText;
      if (firstValue < secondValue) {
        let firstItem = items[i];
        let secondItem = items[i + 1];
        firstItem.parentNode.insertBefore(secondItem, firstItem);
      }
    }
  }
}
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

function editJson(data) {
  //update json
  fetch("https://api.jsonbin.io/v3/b/6017e3d85415b40ac2208a40", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$rT9KA7aWo7ylVFwC/8i9yudVXkXAns0O7nj/vzhOi8BKQg.qYxU1e",
        "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({ "my-todo": data }),
  }); //.then((res) => res.json());
}
