function Book(title, author,pages,read){
    if(!new.target){
        throw Error("you must use 'new' operator to call this constructor")
    }
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
Book.prototype.info= function(){
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read=="true"? 'Read':'Not Read'}`)

}

const library=[];

function addBookToLibrary(newBook){
    library.push(newBook);

}

function getFormData(){
    /* this function does a querryselectAll on the form to grab all the inputs, then it turns the querry into an array to work with array functions
    after that using the filter fuction, the radio option that was not selected is removed from the array, after which the array is reduced to an object
    that containt all the book information, is basically creating the materials for a book object
    
    the object returned has the following format
    
    bookName: "string" //book name
    author: "string" //author name
    pages: number // an int with the amount of pages the book has
    read: 'string'// a string that can only be 'false' or 'true'
    */
    bookLike=Array.from(document.querySelectorAll('#bookForm input')).filter((input)=>!(input.type=='radio' && !input.checked)).reduce((acc,input)=>(
        {...acc, [input.id]: input.value}),{});
    console.log(bookLike)
    return new Book(bookLike.bookName,bookLike.author, bookLike.pages, bookLike.read);

}
//this function recives a book object which it uses to create and add a book card to the html
function createCard(book){
    //card container
    card= document.createElement('div');
    card.setAttribute('class', 'card');
    //delete button
    deleteButton=document.createElement('button');
    deleteButton.setAttribute('class', "deleteButton")
    deleteButton.innerText='Delete'
    //title
    title=document.createElement('div');
    title.setAttribute('class', 'bookTitle');
    title.innerText=book.title;
    
    //author
    author=document.createElement('div');
    author.setAttribute('class', 'bookAuthor');
    author.innerText=book.author;
    //pages
    pages=document.createElement('div');
    pages.setAttribute('class', 'bookPages');
    pages.innerText='Pages: '+book.pages;
    //bookstatus
    stat=document.createElement('div');
    stat.setAttribute('class', 'bookStatus');
    //
    label=document.createElement('label');
    label.setAttribute('for', 'book');
    label.innerText='Finished Read?'
    //
    input=document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'book');
    input.setAttribute('value', book.read);
    if(book.read=="true"){
        input.setAttribute('checked', book.read);
    }
    //merging bookstatus
    stat.append(label, input);

    //merging everything

    card.append(deleteButton,title,author,pages,stat);

    //adding card to container

    container= document.querySelector('.cardContainer');
    container.append(card);
    console.log(book)


}
function toggleForm(){
    formWindow=document.getElementById('formWindow')
    createButton=document.getElementById('createButton')
    if(formWindow.style.display==='block'){
        formWindow.style.display='none';
        createButton.innerText="Add a Book";
    }
    else{
        formWindow.style.display='block';
        createButton.innerText='Hide'
    }


}
function deleteCard(){
    console.log(this)
}

document.getElementById('cardMain').addEventListener('click',function (e){
    if(e.target.className=="deleteButton"){
        e.target.closest('.card').remove();

    }
});
var form = document.getElementById("bookForm");
function handleForm(event) { 
    event.preventDefault(); 
    book=getFormData();
    createCard(book);
    form.reset();
} 
form.addEventListener('submit', handleForm);

