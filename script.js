// Global constants

const myLibrary = [];

const elements = {
  body: document.querySelector("body"),
  main: document.querySelector(".main"),
  drawer: document.querySelector(".drawer"),

  formTitle: document.querySelector("#title"),
  formAuthor: document.querySelector("#author"),
  formPage: document.querySelector("#page"),
  formRead: document.querySelector("#read-true"),
  formButton: document.querySelector("form button"),

  drawerTrigger: document.querySelector("#drawer-trigger"),
  drawerTriggerImg: document.querySelector("#drawer-trigger img"),
  drawerTriggerSpan: document.querySelector("#drawer-trigger span"),
};

// Class
// class Book {
//     title;
//     author;
// }

class Book {
  #title;
  #author;
  #page;
  #read;
  #id;
  constructor(title, author, page, read) {
    this.#title = title;
    this.#author = author;
    this.#page = page;
    this.#read = read;
    this.#id = myLibrary.length === 0 ? 0 : myLibrary.at(-1).id + 1;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get page() {
    return this.#page;
  }

  get read() {
    return this.#read;
  }

  get id() {
    return this.#id;
  }

  toggleRead() {
    this.#read = !this.#read;
  }

  getCard = function () {
    const readIcon = this.#read ? "./images/medal.svg" : "./images/ribbon.svg";
    const readAlt = this.#read ? "Already read" : "Not read yet";

    const cardHTML = `
            <div class="card" data-id="${this.#id}">
                <div class="card-header">
                    <button class="delete-button" aria-label="Delete this book">
                        <img class="delete-button" src="./images/delete.svg" alt="">
                    </button>
                    <button class="read-button" aria-lavel="${readAlt}">
                        <img class="read-button" src="${readIcon}" alt="">
                    </button>
                </div>
                <div class="card-body">
                    <h1 class="title">${this.#title}</h1>
                    <p class="author">${this.#author}</p>
                </div>
                <div class="card-footer">
                    <p class="page">- ${this.#page} -</p>
                </div>
            </div>
        `;

    // Avoid innerHTML for security, use DOMParser instead.
    const parser = new DOMParser();
    const doc = parser.parseFromString(cardHTML, "text/html");
    return doc.body.firstElementChild;
  };
}

// Regular functions

function displayLibrary() {
  for (let book of myLibrary) {
    const card = book.getCard();
    elements.main.appendChild(card);
  }
}

function addBookToLibrary() {
  const title = elements.formTitle.value;
  const author = elements.formAuthor.value;
  const page = parseInt(elements.formPage.value);
  const read = elements.formRead.checked;

  const sameBook = myLibrary.filter(
    (book) =>
      book.title === title && book.author === author && book.page === page
  );

  if (sameBook.length > 0) {
    alert("The book already exists in the library.");
    return;
  }

  const newBook = new Book(title, author, page, read);
  myLibrary.push(newBook);

  elements.main.appendChild(newBook.getCard());
}

function getBookByID(id) {
  return myLibrary.find((book) => book.id === id);
}

function deleteBookByID(id) {
  myLibrary.splice(id, 1);
}

function updateReadDom(readElement, read) {
  readElement.setAttribute(
    "src",
    read ? "./images/medal.svg" : "./images/ribbon.svg"
  );
  readElement.setAttribute("alt", read ? "Already read" : "Not read yet");
}

// Main execution

elements.formButton.addEventListener("click", (e) => {
  addBookToLibrary();
});

elements.drawerTrigger.addEventListener("click", (e) => {
  if (elements.drawerTrigger.classList.contains("open-drawer")) {
    elements.drawer.hidden = false;
    elements.drawerTriggerSpan.textContent = "End Registration";
    elements.drawerTriggerImg.setAttribute("src", "./images/up.svg");
    elements.drawerTriggerImg.setAttribute("alt", "Up icon");
    elements.formTitle.focus();
  } else {
    elements.drawer.hidden = true;
    elements.drawerTriggerSpan.textContent = "Register New Book";
    elements.drawerTriggerImg.setAttribute("src", "./images/down.svg");
    elements.drawerTriggerImg.setAttribute("alt", "Down icon");
  }
  elements.body.classList.toggle("drawer-opened");
  elements.drawerTrigger.classList.toggle("open-drawer");
  e.preventDefault();
});

elements.main.addEventListener(
  // Card-related events are delegated to div.main
  // for better performance with many cards.
  "click",
  (e) => {
    if (e.target.classList.contains("delete-button")) {
      const card = e.target.closest(".card");

      const id = parseInt(card.getAttribute("data-id"));
      deleteBookByID(id);

      card.remove();
      return;
    }
    if (e.target.classList.contains("read-button")) {
      const card = e.target.closest(".card");

      const id = parseInt(card.getAttribute("data-id"));
      const book = getBookByID(id);
      book.toggleRead();

      updateReadDom(e.target, book.read);
    }
  }
);

// Form validation
// valueMissing should be checked in the initial state
// because the case usually happens when the user skipped the field.

if (elements.formTitle.validity.valueMissing) {
  elements.formTitle.setCustomValidity("You need to input the title.");
}
elements.formTitle.addEventListener("input", (event) => {
  if (elements.formTitle.validity.valueMissing) {
    elements.formTitle.setCustomValidity("You need to input the title.");
  } else {
    elements.formTitle.setCustomValidity("");
  }
});

if (elements.formAuthor.validity.valueMissing) {
  elements.formAuthor.setCustomValidity("You need to input the author name.");
}
elements.formAuthor.addEventListener("input", (event) => {
  if (elements.formAuthor.validity.valueMissing) {
    elements.formAuthor.setCustomValidity("You need to input the author name.");
  } else {
    elements.formAuthor.setCustomValidity("");
  }
});

if (elements.formAuthor.validity.valueMissing) {
  elements.formAuthor.setCustomValidity("You need to input the author name.");
}
elements.formPage.addEventListener("input", (event) => {
  if (elements.formPage.validity.valueMissing) {
    elements.formPage.setCustomValidity("You need to input the page count.");
  } else if (elements.formPage.validity.typeMismatch) {
    elements.formPage.setCustomValidity("You need to input a number.");
  } else if (elements.formPage.validity.rangeUnderflow) {
    elements.formPage.setCustomValidity("You need to input a positive number.");
  } else {
    elements.formPage.setCustomValidity("");
  }
});

// Dummy data

const books = [
  {
    title: "The Whispers of Eternity",
    author: "Elara Moonstone",
    page: 311,
    read: true,
  },
  {
    title: "The Binary Tree Garden",
    author: "Zephyr Quark",
    page: 528,
    read: false,
  },
  {
    title: "The Last Echo",
    author: "Thorne Shadowbrook",
    page: 416,
    read: false,
  },
  {
    title: "Nonlinear Horizons",
    author: "Aria Voltspark",
    page: 289,
    read: false,
  },
  {
    title: "A Curious Little Microscope",
    author: "Lysander Frostwind",
    page: 602,
    read: true,
  },
  {
    title: "The Clockwork Butterfly",
    author: "Isadora Gearhart",
    page: 374,
    read: false,
  },
  {
    title: "50 Recipes for the Cosmic Void",
    author: "Nova Starling",
    page: 491,
    read: true,
  },
  {
    title: "The Alchemy of Shadows",
    author: "Raven Nightshade",
    page: 305,
    read: true,
  },
  {
    title: "Chronicles of the Neon City",
    author: "Cypher Voltwire",
    page: 433,
    read: false,
  },
  {
    title: "The Quantum Tarot",
    author: "Seraphina Flux",
    page: 267,
    read: false,
  },
  { title: "Only Backward", author: "Alex Cornwell", page: 129, read: true },
];

for (let book of books) {
  const newBook = new Book(book.title, book.author, book.page, book.read);
  myLibrary.push(newBook);
}

displayLibrary();
