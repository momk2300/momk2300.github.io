"use strict"
// En eventlyssnare för att köra funktionen loadStorage när sidan har laddats
document.addEventListener('DOMContentLoaded', loadStorage);

// En eventlyssnare för att köra funktionen checkItemText när användaren skriver i textfältet
document.getElementById('newtodo').addEventListener('input', checkItemText);

// En eventlyssnare för att köra funktionen addItem när användaren klickar på knappen "Lägg till"
document.getElementById('newtodobutton').addEventListener('click', addItem);

// En eventlyssnare för att köra funktionen clearStorage när användaren klickar på knappen "Rensa"
document.getElementById('clearbutton').addEventListener('click', clearStorage);

// Funktion för att lägga till ett ärende på listan
function addItem() {
    // Hämta texter från textfälte
    let newItemText = document.getElementById('newtodo').value;

    // Kontroll om texten är tillräckligt lång
    if (checkItemText()) {
        // Skapa ett article element och lägg till det i DOM
        let newArticle = document.createElement('article');
        newArticle.textContent = newItemText;
        newArticle.addEventListener('click', deleteItem); // Eventlyssnare för att radera vid klick
        document.getElementById('todolist').appendChild(newArticle);

        // Lagra ärendet i Web Storage
        storeItem(newItemText);

        // Rensa textfältet
        document.getElementById('newtodo').value = '';

        // Visa meddelende för användaren
        showMessage('Ärende tillagt!');
    } else {
        // Visa fel meddelende om texten är kort
        showMessage('Texten måste vara minst fem tecken lång.');
    }
}

// Funktion för radera ett ärende från listan
function deleteItem() {
    // Hämta texten från det klickade på
    let itemText = this.textContent;

    // Ta bort ärendet från DOM
    this.parentNode.removeChild(this);

    // Ta bort ärendet från lagring
    deleteStoredItem(itemText);

    // Visa meddelande till användaren
    showMessage('Ärende raderat!');
}

// Funktion för att kontrolera om texten är tillräckligt lång
function checkItemText() {
    // Hämta texten från textfältet
    let newItemText = document.getElementById('newtodo').value;

    // Kontrollera om texten är minst fem tecken lång
    let isValid = newItemText.length >= 5;

    // Uppdatera meddelndet baserat på valdering
    if (isValid) {
        showMessage('');
    } else {
        showMessage('Texten måste vara minst fem tecken lång.');
    }

    return isValid;
}

// ladda innehållet från lagring när sidan laddasar
function loadStorage() {
    // Hämta lagrade ärenden från Web Storage
    let storedItems = JSON.parse(localStorage.getItem('todoList')) || [];

    // Lägg till varje ärende i DOM
    for (let i = 0; i < storedItems.length; i++) {
        let newArticle = document.createElement('article');
        newArticle.textContent = storedItems[i];
        newArticle.addEventListener('click', deleteItem); // Eventlyssnare för att radera vid klick
        document.getElementById('todolist').appendChild(newArticle);
    }
}

// Funktion för att lagra ett ärende på Web Storage
function storeItem(item) {
    // Hämta befintliga lagrade ärenden eller skapa en tom lista om det inte finns några
    let storedItems = JSON.parse(localStorage.getItem('todoList')) || [];

    // Det nya ärendet
    storedItems.push(item);

    // Spara listan i Web Storage
    localStorage.setItem('todoList', JSON.stringify(storedItems));
}

// Funktion för att ta bort ett ärende från lagring
function deleteStoredItem(item) {
    // Hämta lagrade ärenden från Web Storage
    let storedItems = JSON.parse(localStorage.getItem('todoList')) || [];

    // Hitta index för det ärende som ska tas bort
    let index = storedItems.indexOf(item);

    // Ta bort ärendet om det finns i listan
    if (index !== -1) {
        storedItems.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(storedItems));
    }
}

// Funktion för att rensa lagrat innehåll i Web Storage och på skärmen
function clearStorage() {
    // Ta bort alla ärenden från Web Storage
    localStorage.removeItem('todoList');

    // Rensa ärenden från DOM
    document.getElementById('todolist').innerHTML = '';

    // Meddelande till användaren
    showMessage('Alla ärenden raderade!');
}

// Funktion för visa meddelanden på sidan
function showMessage(message) {
    // Hämta meddelande elementet och uppdatera dess innehåll
    document.getElementById('message').textContent = message;
}
