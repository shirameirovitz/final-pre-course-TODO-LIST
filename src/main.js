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
  DateDiv.innerText = new Date().toISOString().slice(0, 19).replace("T", " ");
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
