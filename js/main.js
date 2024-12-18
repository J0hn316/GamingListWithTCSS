const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');

function isDarkMode() {
  // Check if 'dark' class is present on <html>
  return document.documentElement.classList.contains('dark');
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

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem.trim() === '') {
    const p = document.createElement('p');
    p.classList.add('error');
    p.innerText = 'Please add an item';
    itemInput.insertAdjacentElement('afterend', p);
    return;
  }

  // Create list item
  const li = document.createElement('li');
  // Dynamically add class based on the mode
  toggleItemClass(li);

  // Add item text
  li.appendChild(document.createTextNode(newItem));

  const button = createBtn('remove-item btn-link');
  button.classList.add('text-black', 'dark:text-white'); // Ensure button text color matches
  li.appendChild(button);

  // Add li to DOM
  itemList.appendChild(li);
  checkUI();

  itemInput.value = '';
}

function removeItem(event) {
  const element = event.target.parentElement.classList;
  // target the x/skull button on the item
  if (element.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      const parentElement = event.target.parentElement.parentElement;
      parentElement.remove();
      checkUI();
    }
  }
}

function updateAllItems() {
  const items = document.querySelectorAll('#item-list li');
  items.forEach((li) => toggleItemClass(li));
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
  checkUI();
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

function checkUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('theme-changed', updateAllItems);

checkUI();
