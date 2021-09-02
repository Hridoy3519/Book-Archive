const searchBook = () => {
    //Getting searched text and erasing the input field.
    const inputField = document.getElementById('input-field');
    searchText = inputField.value;
    inputField.value = "";

    //load api using dynamic url
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data.docs));
}

const showSearchResult = bookList => {
    const resultCount = document.getElementById('result-count');
    resultCount.innerText = `Total Results Found: ${bookList.numFound}`;

    //Displaying search Result
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = "";

    bookList.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');

        //Getting Book cover img url
        let imgURL = "../images/not-available.png";
        if (book.cover_i) {
            imgURL = `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        }

        div.innerHTML = `
        <div class="card h-100">
            <img src=${imgURL} class="card-img-top" onerror="imgError(this);" alt="...">         
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title}</h5>
                <h5 class="card-title">Author: ${book.author_name}</h5>
                <p class="card-text">Publisher: ${book.publisher?.[0]}</p>
                <p class="card-text">First Published on: ${book.first_publish_year}</p>
            </div>
        </div>`;
        resultContainer.appendChild(div);
    });
}

const imgError = (image) => {
    console.log(image)
    image.onerror = "";
    image.src = "../images/not-available.png";
    return true;
}
