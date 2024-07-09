const myLibrary = [];

function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.info = () => {
        let result = `${this.title} by ${thi.author}, ${this.page} pages, `;
        result += this.read ? "already read" : "not read yet"
        return result;
    }
}

Book.prototype.getCard = function() {
    const card = document.createElement("div");
    const body = document.createElement("div");
    const header = document.createElement("div");
    const footer = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("p");
    const page = document.createElement("p");
    const read = document.createElement("div");
    card.classList.add("card");
    body.classList.add("card-body");
    header.classList.add("card-header");
    footer.classList.add("card-footer");
    title.classList.add("title");
    author.classList.add("author");
    page.classList.add("page");
    read.classList.add("read", (this.read ? "true" : "false"));
    title.textContent = this.title;
    author.textContent = this.author;
    page.textContent = this.page.toString();
    read.textContent = this.read;
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    header.appendChild(read);
    body.appendChild(title);
    body.appendChild(author);
    footer.appendChild(page);
    return card;
}

function displayLibrary(parent) {
    for (let book of myLibrary) {
        const card = book.getCard();
        parent.appendChild(card);
    }
}

function addBookToLibrary() {
}



const book1 = new Book(
    "10,000 Light-Years From Home",
    "James Tiptree Jr.",
    362,
    true
);
const book2 = new Book(
    "New York City Trees",
    "City of New York Park & Recreation",
    240,
    true
);
const book3 = new Book(
    "Selected Poems",
    "William Carlos Williams",
    323,
    false
)

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

const body = document.querySelector("body");

displayLibrary(body);
