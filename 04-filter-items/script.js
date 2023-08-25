const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
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
        return item.textContent.toLowerCase() === newItem.toLocaleLowerCase();
    });

    if (existingItem) {
        alert("Item already exists in the list.");
        return;
    }

    // Capitalize the first letter
    newItem = newItem.charAt(0).toUpperCase() + newItem.slice(1);

    // Create list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));

    const button = createButton("remove-item btn-link text-red");

    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

    itemInput.value = "";
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
