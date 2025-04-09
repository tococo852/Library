function Book(title, author,pages,readed){
    if(!new.target){
        throw Error("you must use 'new' operator to call this constructor")
    }
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readed=readed;
}
Book.prototype.info= function(){
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readed? 'Readed':'Not Readed'}`)

}

const library=[];

function addBookToLibrary(title,author,pages,readed){
    newBook= new Book(title,author, pages, readed);
    library.push(newBook);

}

function getFormData(){
    /* this function does a querryselectAll on the form to grab all the inputs, then it turns the querry into an array to work with array functions
    after that using the filter fuction, the radio option that was not selected is removed from the array, after which the array is reduced to an object
    that containt all the book information, is basically creating the book object
    
    the object returned has the following format
    
    bookName: "string" //book name
    author: "string" //author name
    pages: number // an int with the amount of pages the book has
    read: 'string'// a string that can only be 'false' or 'true', for the sake of it being worked as a boolean later
    */
    bookLike=Array.from(document.querySelectorAll('#bookForm input')).filter((input)=>!(input.type=='radio' && !input.checked)).reduce((acc,input)=>(
        {...acc, [input.id]: input.value}),{});
    return new Book(bookLike.bookName,bookLike.author, bookLike.pages, bookLike.read=="true");

}

