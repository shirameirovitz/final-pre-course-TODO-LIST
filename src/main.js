fetch("https://api.jsonbin.io/b/601433111de5467ca6bde502/3", {
  headers: {
    "secret-key":
      "$2b$10$rT9KA7aWo7ylVFwC/8i9yudVXkXAns0O7nj/vzhOi8BKQg.qYxU1e",
  },
})
  .then((res) => res.json())
  .then((data) => loadData(data));

function loadData(data) {
  for (let i = 0; i < data.length; i++) {
    createItem(data[i].text, data[i].priority, data[i].date);
  }
}

function addItem() {
  const text = document.getElementById("text-input");

  if (text.value !== "") {
    const priority = document.getElementById("priority-selector").value;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    createItem(text.value, priority, date);
    text.value = "";
  } else {
    alert("PLEASE WRITE SOMETHING!");
  }
}

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
  //todo string
  let textDiv = document.createElement("div");
  textDiv.className = "todo-text";
  textDiv.innerText = text;

  main.appendChild(priorityDiv);
  main.appendChild(DateDiv);
  main.appendChild(textDiv);

  li.appendChild(main);
  list.appendChild(li);

  //add close button
  let close = document.createElement("button");
  close.classList = "remove-button";
  close.textContent = "X";
  li.appendChild(close);
  var closebtns = document.querySelectorAll(".remove-button");
  Array.from(closebtns).forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement.style.display = "none";
    });
  });

  //Counter increase
  let counter = document.getElementById("counter");
  counter.innerHTML = Number(document.getElementById("counter").innerHTML) + 1;
}

//active enter key
function handleKeyPress(e) {
  var key = e.keyCode || e.key;
  if (key === 13) {
    addItem();
  }
}

//the sort list
function sortList() {
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");

  for (let j = 0; j < items.length; j++) {
    for (let i = 0; i < items.length - 1 - j; i++) {
      let firstValue = items[i].getElementsByClassName("todo-priority")[0]
        .innerText;
      let secondValue = items[i + 1].getElementsByClassName("todo-priority")[0]
        .innerText;
      if (firstValue > secondValue) {
        let firstItem = items[i];
        let secondItem = items[i + 1];
        firstItem.parentNode.insertBefore(secondItem, firstItem);
      }
    }
  }
}
//active check list
document.querySelector("#list").addEventListener("click", function (e) {
  console.log("dgfhnb");
  if (e.target.tagName === "li") {
    e.target.style.textDecoration = "line-through";
    e.target.style.color = "gray";
    console.log("hfdhd");
  }
});
