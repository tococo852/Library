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

