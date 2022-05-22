//Book Class : Represents book
class Book{
    constructor(title, author, isbn) {
       this.title = title;
       this.author = author;
       this.isbn  = isbn ;
    }
}

//UI Class : Handle UI Tasks
class UI {
    //Method 1 : To Display All Books
    static displayBooks(){
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
   //Method 2 : To Add a Book to List
  static addBookToList(book){
      const list = document.querySelector("#book-list");
      
      const row = document.createElement("tr");
      row.innerHTML = ` 
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href = "#" class = "btn btn-danger btn-sml delete">X</a></td>
      `;
    
      list.appendChild(row); 
  }

  //Method 3 : To Delte a Book
  static deleteBook(el){
      if(el.classList.contains("delete")){
          el.parentElement.parentElement.remove();
      }
  }
    //Method 4 : To Show Alert Messages after Deletion/Addition
   static showAlert(message, className){
       const div = document.createElement('div');
       div.className = `alert alert-${className}`;
       div.appendChild(document.createTextNode(message));
       const container = document.querySelector(".container");
       const form = document.querySelector("#book-form");
       container.insertBefore(div, form);//(what, before what)
      //vanish in 3 seconds\
      setTimeout(()=> document.querySelector(".alert").remove(), 1500);
   }

   //Method 5 : To Clear Form Input Fields after Entry
  static clearFields(){
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#isbn").value = "";
  }
}

//Store Class : Handles Storage
class Store{

    //Method 1 : To Get All Books From Local Storage
    static getBooks(){
      let books;
      if(localStorage.getItem("books")=== null){
          books  = [];
      }else{
          books = JSON.parse(localStorage.getItem("books"));
      }
      return books;
    }
    // Method 2 : To Add Book To Local Storage
    static addBook(book){
         const books = Store.getBooks();
         books.push(book);

         localStorage.setItem('books',JSON.stringify(books));
    }
    
    //Method 3 : To Remove A Book From Local Storage
    static removeBook(isbn){
         const books = Store.getBooks();
         books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
         });

         localStorage.setItem("books",JSON.stringify(books));
    }
}


//Event :Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    //prevent actual submit
    e.preventDefault();
    //get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

   //validate
   if(title === '' || author === '' || isbn === ''){
       UI.showAlert("Please fill in all fields", 'danger');
   }else{
        //instantiate book
        const book = new Book(title, author, isbn);
        console.log(book);
    
        //add book to UI
        UI.addBookToList(book);
        
        //add book to store
        Store.addBook(book);

        //success message
        UI.showAlert("Book Added Successfully" , "success");

        //clear fields
        UI.clearFields();
   }
});
   
//Event: Remove book from UI
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  //remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show delete alert
    UI.showAlert("Book has been deleted","danger")
});