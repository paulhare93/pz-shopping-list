const storage = window.localStorage;
let itemsToBuy = [];
const singleProduct = {
  name: "",
  amount: 0,
  unit: "",
  category: "",
};
storageInit = () => {
  itemsToBuy =
    storage.length > 0 && storage.getItem("itemsToBuy")
      ? JSON.parse(storage.getItem("itemsToBuy"))
      : [];
  updateList();
};
let totalItems = 0;
let totalWeight = 0;

storageUpdate = () => {
  storage.setItem("itemsToBuy", JSON.stringify(itemsToBuy));
};

//const inputFields
const nameInput = document.getElementById("nameInput");
const amount = document.getElementById("amount");
const unit = document.getElementById("unitRadioSzt");
const category = document.getElementById("category");
//
cleanForm = () => {
  nameInput.value = "";
  amount.value = "";

  category.value = "pieczywo";
};
addElement = (event) => {
  event.preventDefault();
  const item = Object.create(singleProduct);
  item.name = nameInput.value;
  item.amount = parseFloat(amount.value);
  item.unit = unit.checked
    ? document.getElementById("unitRadioSzt").value
    : document.getElementById("unitRadioKg").value;
  item.category = category.value;
  if (item.name && item.amount && item.unit && item.category) {
    addToList(item, itemsToBuy);
    updateList();
    cleanForm();
  } else {
    throw Error("Nie uzupełniony!");
  }
};

addToList = (obj, itemsList) => {
  let changed = false;
  itemsList.map((el) => {
    if (
      el.name.toLowerCase() === obj.name.toLowerCase() &&
      el.unit === obj.unit
    ) {
      changed = true;
      return (
        (el.amount += obj.amount),
        (el.category = obj.category),
        (el.unit = obj.unit)
      );
    }
  });
  if (!changed) {
    return itemsList.push(obj);
  }
};
listToDisplay = () => {
  if (itemsToBuy.length > 0) {
    for (const item of itemsToBuy) {
      addToDisplay(item);
    }
  }
  document.getElementById("headerList").innerHTML =
    itemsToBuy.length > 0
      ? `Twoja lista zakupów zawiera ${totalItems} elementów i waży ${totalWeight} kilogramów`
      : `Twoja lista jest pusta.`;
};

addToDisplay = (item) => {
  const targetToFill = document.getElementById("main");
  const element = document.getElementById(item.name + item.unit)
    ? document.getElementById(item.name + item.unit)
    : document.createElement("li");
  element.setAttribute("id", item.name + item.unit);
  element.setAttribute("class", `list-group-item ${item.category}`);
  element.innerHTML = `${item.name} (${
    item.unit === "kg" ? item.amount.toFixed(2) : item.amount
  }${
    item.unit
  })<button class="btn btn-danger float-end" onclick="removeElement(event)">X</button></>`;
  targetToFill.appendChild(element);
};
updateList = () => {
  // zliczanie wagi i elementów (założyłem, że przypisuję jeden wpis do jednej kategorii ( waga lub ilość) możliwe rozbudowanie)
  totalItems = 0;
  totalWeight = 0;
  if (itemsToBuy.length > 0) {
    for (let item of itemsToBuy) {
      item.unit === "szt"
        ? (totalItems += item.amount)
        : (totalWeight += item.amount);
    }
  }
  listToDisplay();
  storageUpdate();
};

removeElement = (event) => {
  itemsToBuy.splice(
    itemsToBuy.findIndex(
      (el) => el.name + el.unit === event.target.parentNode.id
    ),
    1
  );
  event.target.parentNode.remove();
  updateList();
};
storageInit();
