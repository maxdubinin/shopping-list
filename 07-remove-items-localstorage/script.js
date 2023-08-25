const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));

    checkUI();
}

function onAddItemToSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;
    // Validate Input
    newItem = newItem.trim();
    if (newItem === "" || newItem.includes(" ")) {
        alert("Please add an item");
        return;
    }

    // Check if the item already exists
    const items = document.querySelectorAll("li");

    const existingItem = Array.from(items).find((item) => {
        return item.textContent.toLowerCase() === newItem.toLowerCase();
    });

    if (existingItem) {
        alert("Item already exists in the list.");
        return;
    }

    // Capitalize the first letter
    newItem = newItem.charAt(0).toUpperCase() + newItem.slice(1);

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to LS
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = "";
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red");

    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to lS
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item) {
    if (confirm("Are you sure?")) {
        // Remove item fron DOM
        item.remove();
        // Remove item from storage
        removeItemsFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemsFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // Filter out item to be remove
    itemsFromStorage = itemsFromStorage.filter((newItem) => {
        return newItem.toLowerCase() !== item.toLowerCase();
    });

    // Re-set to localestorage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// console.log(removeItemsFromStorage("Milk"));

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from localestorage
    localStorage.clear();

    checkUI();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll("li");

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

function checkUI() {
    const items = document.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
}

//Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener("submit", onAddItemToSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);

    checkUI();
}

init();
