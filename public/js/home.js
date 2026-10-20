const itemsEl = document.getElementById("items");

function createItem(item) {

    const li = document.createElement("li");

    li.textContent = item;

    return li;
}

async function getData() {

    const request = await fetch("/items");

    const items = await request.json();

    for (const item of items) {

        const itemEl = createItem(item);

        itemsEl.appendChild(itemEl);
    }
}

getData();
