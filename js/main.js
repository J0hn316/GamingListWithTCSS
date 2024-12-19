const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  resetUI();
}

function onAddItemSubmit(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem.trim() === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists');
      return;
    }
  }

  // Create item DOM element
  addItemToDom(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  resetUI();
  itemInput.value = '';
}

function addItemToDom(item) {
  // Create list item
  const li = document.createElement('li');
  // Dynamically add class based on the mode
  toggleItemClass(li);

  // Add item text
  li.appendChild(document.createTextNode(item));

  const button = createBtn('remove-item btn-link');
  button.classList.add('text-black', 'dark:text-white'); // Ensure button text color matches
  li.appendChild(button);

  // Add li to DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  // Get existing items from storage
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item); // Add the new item to the array.

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  // Check if items are in storage.
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []; // If not, create an empty array.
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items')); // If so, parse the string into an array.
  }
  return itemsFromStorage;
}

function onClickItem(event) {
  const element = event.target.parentElement.classList;

  // target the x/skull button on the item
  if (element.contains('remove-item')) {
    const parentElement = event.target.parentElement.parentElement;
    removeItem(parentElement);
  } else {
    const clickedItem = event.target;
    setItemToEdit(clickedItem);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((item) => (item.style.color = ''));

  item.style.color = '#228B22';
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(itemElement) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    itemElement.remove();

    // Remove item from storage
    removeItemFromStorage(itemElement.textContent);

    resetUI();
  }
}

function removeItemFromStorage(itemContent) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((item) => item !== itemContent);

  // Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = `${classes} !hover:text-red-500`;
  return icon;
}

function createBtn(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark text-white dark:text-black');
  button.appendChild(icon);
  return button;
}

function clearItems() {
  while (itemList.firstChild) {
    // clear the list
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem('items');
  resetUI();
}

function filterItems(event) {
  const items = itemList.querySelectorAll('li');
  const text = event.target.value.toLowerCase();

  items.forEach((item) => {
    const textItem = item.firstChild.textContent.toLowerCase();
    if (textItem.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function updateAllItems() {
  const items = document.querySelectorAll('#item-list li');
  items.forEach((li) => toggleItemClass(li));
}

function toggleItemClass(el) {
  // Remove both classes first
  el.classList.remove('items-dark', 'items-light');

  // Add the appropriate class based on dark mode
  if (isDarkMode()) {
    el.classList.add('items-dark');
  } else {
    el.classList.add('items-light');
  }
}

function isDarkMode() {
  // Check if 'dark' class is present on <html>
  return document.documentElement.classList.contains('dark');
}

function resetUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML =
    '<i class="fa-solid bg-black dark:bg-white"></i> Add Game 🎮';
  formBtn.style.backgroundColor = '';
  isEditMode = false;
}

// Initialize app
function init() {
  // Event Listeners
  clearBtn.addEventListener('click', clearItems);
  itemList.addEventListener('click', onClickItem);
  itemFilter.addEventListener('input', filterItems);
  itemForm.addEventListener('submit', onAddItemSubmit);
  document.addEventListener('DOMContentLoaded', displayItems);
  document.addEventListener('theme-changed', updateAllItems);

  // Check UI on page load
  resetUI();
}

init();
