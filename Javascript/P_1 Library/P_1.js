let myLibrary = [
    {
        book_author: "J.R.R Tolkien",
        book_title: "Fellowship Of The Ring",
        date_added: "2020-07-29 15:2:45",
        no_pages: "479",
        pub: "1954-07-29",
        read: true
    }
];

function Book(book_title, book_author, no_pages, read, pub, date_added) {
    this.book_title = book_title
    this.book_author = book_author
    this.no_pages = no_pages
    this.read = read
    this.pub = pub
    this.date_added = date_added
}   


document.addEventListener('DOMContentLoaded',  ()=>{
    const inputs = document.querySelectorAll('.inputfield')
    const submitbtn = document.querySelector('#submitbtn')
    const addbookbtn = document.querySelector('#addbookbtn')
    const bookform = document.querySelector('#bookform')
    const dateSelect = document.querySelector('#dateSelect')
    const ascDesc = document.querySelector('#ascDesc')
    const inputs_arr = Array.from(inputs)

    checkInputs(inputs_arr)
    loadBooks(myLibrary)

    dateSelect.addEventListener('change', function(e){
        sortBooks(e.currentTarget.value, ascDesc.value)
    })
    ascDesc.addEventListener('change', function(e){
        sortBooks(dateSelect.value, e.currentTarget.value)
    })


    addbookbtn.addEventListener('click', ()=>
    {   
        bookform.classList.toggle('active')
        addbookbtn.classList.toggle('on')
    })


    inputs.forEach(input=>{
        input.addEventListener('keyup', function(){
            checkInputs(inputs_arr)
        })
    })
    
    submitbtn.addEventListener('click', ()=>
    {
        let data = {}
        inputs.forEach(input=>{
            if(input.type == "checkbox")
            {
               
                if(input.checked)
                data[`${input.id}`] = true
                else
                data[`${input.id}`] = false
            }
            else
            data[`${input.id}`] = input.value
        })
        addBookToLibrary(data)
        sortBooks(dateSelect.value, ascDesc.value)
    })
    
})


function sortBooks(dateflag, ascdescflag)
{
    if (dateflag==0)
    {   
        if(ascdescflag==0)
        myLibrary.sort((a,b)=> (a.date_added>b.date_added)? -1: 1)
        else
        myLibrary.sort((a,b)=> (a.date_added>b.date_added)? 1: -1)
    }
    else
    {   
        if(ascdescflag==0)
        myLibrary.sort((a,b)=> (a.pub>b.pub)? -1: 1)
        else
        myLibrary.sort((a,b)=> (a.pub>b.pub)? 1: -1)
    }
    document.querySelector('#bookshelf').innerHTML = ""
    loadBooks(myLibrary) 
}


function addBookToLibrary(data) {
    const today = new Date();
    const date_added =   today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let book = new Book(data.book_title, data.book_author, data.no_pages, data.read, data.pub, date_added+" "+time)
    if (!myLibrary.find(book=>book.book_title == data.book_title))
    {
        myLibrary.push(book)
    }
    else
    alert('Book already exists')
}


//to check if input fields are valid or invalid/empty
function checkInputs(inputs_arr)
{   
    if (inputs_arr.every(input=>input.value!=""))
    submitbtn.removeAttribute('disabled')
    else
    submitbtn.setAttribute('disabled', 'true')
}


function loadBooks()
{  
    for(let i = 0; i<myLibrary.length; i++)
    {
        const div = document.createElement('div')
        div.classList.add("col-xl-3", "col-md-4", "col-xs-12", "d-flex", "justify-content-center", "align-items-center", "p-4")
        div.innerHTML = `
        <div class= "bookdiv p-4" id="bookdiv_${myLibrary[i].book_title.replace(/ /g,'')}">
                <h3 class ="bookdiv_title">${myLibrary[i].book_title}</h3>
                <h5 class = "bookdiv_author"> ${myLibrary[i].book_author}</h5><br>
                <h6 class = "bookdiv_added">Added: ${myLibrary[i].date_added.slice(0,10)}</h6>
                <h6 class = "bookdiv_pub">Published: ${myLibrary[i].pub}</h6>
                <h6 class = "bookdiv_no_pages">Pages: ${myLibrary[i].no_pages}</h6><br>
                <button class ="btn btn-danger" id = "delete_${myLibrary[i].book_title.replace(/ /g,'')}">Delete</button>
                <button class ="btn ${myLibrary[i].read?"btn-secondary":"btn-primary"}" id = "mark_${myLibrary[i].book_title.replace(/ /g,'')}">${myLibrary[i].read?"Mark as Unread":"Mark as Read"}</button>
            </div>
        `
        document.querySelector('#bookshelf').appendChild(div)
    }

    for(let i = 0; i<myLibrary.length; i++)
    {
        markButton(myLibrary[i])
        deleteButton(myLibrary[i])
    }

    updateBanner()
}

// to initialize the mark read buttons by adding an onclick event listener on them
function markButton(book){
    const mark = document.querySelector(`#mark_${book.book_title.replace(/ /g,'')}`)
    mark.addEventListener('click', ()=>{markRead(book)})
}

// to initialize the delete buttons by adding an onclick event listener on them
function deleteButton(book)
{
    const deletebtn = document.querySelector(`#delete_${book.book_title.replace(/ /g,'')}`)
    deletebtn.addEventListener('click', ()=>{deleteBook(book)})
}


function markRead(book)
{   
    //updates the read status of the book in the library
    book.read = !book.read
    const index = myLibrary.indexOf(book=> book.title = book.title)
    myLibrary[index]=book
    
    //removes the book
    document.querySelector(`#mark_${book.book_title.replace(/ /g,'')}`).remove()

    //creates new button and event listener
    const button = document.createElement('button')
    button.classList.add("btn", `${book.read? "btn-secondary" :"btn-primary"}`)
    button.id = `mark_${book.book_title.replace(/ /g,'')}`
    button.innerHTML = `${book.read?"Mark as Unread":"Mark as Read"}`
    button.addEventListener('click', ()=>{markRead(book)})
    document.querySelector(`#bookdiv_${book.book_title.replace(/ /g,'')}`).appendChild(button)

    updateBanner()
}


function deleteBook(book){
    const index = myLibrary.indexOf(book=> book.title = book.title)
    myLibrary.splice(index,1)
    document.querySelector('#bookshelf').innerHTML = ""
    loadBooks(myLibrary)
    updateBanner()
}


function updateBanner()
{
    document.querySelector('#totalbooks').innerHTML = myLibrary.length
    document.querySelector('#booksread').innerHTML = myLibrary.filter(book=>book.read==true).length
    document.querySelector('#booksnotread').innerHTML = myLibrary.filter(book=>book.read==false).length
}
