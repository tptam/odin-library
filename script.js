const myLibrary = [];
const PARENT = document.querySelector(".main");

function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = myLibrary.length === 0 ? 0 : myLibrary.at(-1).id + 1;
}

Book.prototype.toggleRead = function() {
    this.read = !(this.read);
}

Book.prototype.getCard = function() {
    const card = document.createElement("div");
    const body = document.createElement("div");
    const header = document.createElement("div");
    const footer = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("p");
    const page = document.createElement("p");
    const read = document.createElement("img");
    const del = document.createElement("img");
 
    card.classList.add("card");
    card.setAttribute("data-id", this.id); 
    body.classList.add("card-body");
    header.classList.add("card-header");
    footer.classList.add("card-footer");
    title.classList.add("title");
    author.classList.add("author");
    page.classList.add("page");
    read.classList.add("read");
    read.setAttribute("data-read", this.read.toString());
    read.setAttribute("src", (this.read ? "./images/medal.svg" : "./images/ribbon.svg"));
    read.setAttribute("alt", this.read ? "Already read" : "Not read yet");
    del.classList.add("del");
    del.setAttribute("src", "./images/close.svg");
    del.setAttribute("alt", "Delete icon");
    title.textContent = this.title;
    author.textContent = this.author;
    page.textContent = `- ${this.page.toString()} -`;
    card.appendChild(del);
    card.appendChild(read);
    card.appendChild(body);
    card.appendChild(footer);
    body.appendChild(title);
    body.appendChild(author);
    footer.appendChild(page);
    return card;
}

function displayLibrary() {
    for (let book of myLibrary) {
        const card = book.getCard();
        PARENT.appendChild(card);
    }
}

function addBookToLibrary() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const page = parseInt(document.querySelector("#page").value);
    const read = document.querySelector("#read-true").checked;

    // Data validation
    if (title === "" || author === "" || page <= 0) {
        alert("Invalid data");
        return;
    }
    const sameBook = myLibrary.filter(
        (book) => book.title === title && book.author === author && book.page === page
    )
    if (sameBook.length > 0) {
        alert("The book already exists in the library.");
        return;
    }

    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook);
    
    PARENT.appendChild(newBook.getCard());
}

function getBookByID(id){
    return myLibrary.find((book) => book.id === id);
}

function deleteBookByID(id){
    myLibrary.splice(id, 1);
}

function toggleReadDom(readElement){
    readElement.classList.toggle("true");
    readElement.classList.toggle("false");
    read = readElement.classList.contains("true");
    readElement.setAttribute(
        "src",
        read ? "./images/medal.svg" : "./images/ribbon.svg"
    );
    readElement.setAttribute(
        "alt",
        read ? "Already read" : "Not read yet"
    );
}

const addButton = document.querySelector("form button");
addButton.addEventListener(
    "click", (e) => {
        addBookToLibrary();
        e.preventDefault();
    }
);

const openCloseButton = document.querySelector("#toggle-form");
openCloseButton.addEventListener(
    "click", (e) => {
        const body = document.querySelector("body");
        const form = document.querySelector(".form");
        const span = openCloseButton.querySelector("span");
        const img = openCloseButton.querySelector("img");
        if (openCloseButton.classList.contains("open-form")) {
            form.hidden = false;
            span.textContent = "End Registration";
            img.setAttribute("src", "./images/up.svg");
        } else {
            form.hidden = true;
            span.textContent = "Register New Book"
            img.setAttribute("src", "./images/down.svg");
        }
        body.classList.toggle("form-opened");
        openCloseButton.classList.toggle("open-form");
        e.preventDefault();
    }
)

const main = document.querySelector(".main");
main.addEventListener(
    "click", (e) => {
        if (e.target.classList.contains("del")) {
            const card = e.target.parentNode;

            // Remove from myLibrary
            const id = parseInt(card.getAttribute("data-id"));
            deleteBookByID(id);

            // Remove from DOM
            card.remove();
            return;
        }
        if (e.target.classList.contains("read")) {
            const card = e.target.parentNode;

            // Update myLibrary
            const id = parseInt(card.getAttribute("data-id"));
            const book = getBookByID(id);
            book.toggleRead();

            // Update DOM
            toggleReadDom(e.target);
        }
    }
)

// Dummy data

const books = [
    { title: "The Whispers of Eternity", author: "Elara Moonstone", page: 342 },
    { title: "Quantum Dreams", author: "Zephyr Quark", page: 528 },
    { title: "The Last Echo", author: "Thorne Shadowbrook", page: 416 },
    { title: "Neon Horizons", author: "Aria Voltspark", page: 289 },
    { title: "Echoes of Forgotten Realms", author: "Lysander Frostwind", page: 602 },
    { title: "The Clockwork Butterfly", author: "Isadora Gearhart", page: 374 },
    { title: "Whispers in the Cosmic Void", author: "Nova Starling", page: 491 },
    { title: "The Alchemy of Shadows", author: "Raven Nightshade", page: 305 },
    { title: "Chronicles of the Neon City", author: "Cypher Voltwire", page: 433 },
    { title: "The Quantum Tarot", author: "Seraphina Flux", page: 267 },
    { title: "Echoes of Silicon Dreams", author: "Binary Stardust", page: 512 },
    { title: "The Labyrinth of Lost Time", author: "Chronos Vortex", page: 389 },
    { title: "Stellar Symphonies", author: "Lyra Cosmosong", page: 275 },
    { title: "The Neuromancer's Daughter", author: "Pixel Shadowjack", page: 456 },
    { title: "Whispers of the Void", author: "Nebula Darkmatter", page: 331 },
    { title: "The Fractured Prism", author: "Iris Spectra", page: 298 },
    { title: "Echoes from the Quantum Realm", author: "Quark Wavefront", page: 587 },
    { title: "The Cybernetic Garden", author: "Flora Circuitbloom", page: 402 },
    { title: "Neon Nights and Binary Days", author: "Ziggy Starbyte", page: 315 },
    { title: "The Holographic Manuscript", author: "Prism Codeweaver", page: 444 },
    { title: "Whispers of the AI", author: "Cortex Synaptica", page: 378 },
    { title: "The Quantum Thief's Paradox", author: "Helix Schrödinger", page: 506 },
    { title: "Echoes of Forgotten Algorithms", author: "Ada Lovelace II", page: 422 },
    { title: "The Astral Cartographer", author: "Celeste Mapmaker", page: 356 },
    { title: "Chromatic Reveries", author: "Palette Dreamscape", page: 283 },
    { title: "The Silicon Sorcerer", author: "Merlin Circuitry", page: 471 },
    { title: "Whispers from the Datastream", author: "Echo Bytewhisper", page: 329 },
    { title: "The Quantum Phoenix Project", author: "Ash Resurgence", page: 518 },
    { title: "Echoes of the Cybermoon", author: "Luna Pixelglow", page: 394 },
    { title: "The Hologram's Lament", author: "Mirage Lightweaver", page: 287 }
];

for (let book of books) {
    const newBook = new Book(book.title, book.author, book.page, Math.random()< 0.5);
    myLibrary.push(newBook);
}

displayLibrary();