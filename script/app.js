const searchBook = () => {

    //Hide Result Area, until data loaded
    toggleResultArea('none');

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
    toggleResultArea('block');
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = "";

    bookList.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');

        //Getting Book cover img url
        let imgURL = "../images/not-available.jpg";
        if (book.cover_i) {
            imgURL = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }


        div.innerHTML = `
        <div class="card mb-3 h-100" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${imgURL} class="card-img-top" onerror="imgError(this);" alt="..."> 
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">
                    <span class="text-secondary">Author:</span> <span class="text-primary fw-bold">${book.author_name ? book.author_name : 'No Info'}</span > 
                </p >
                <p class="card-text">
                    <span class="text-secondary">Publisher:</span> <span class="text-primary fw-bold">${book.publisher?.[0] ? book.publisher?.[0] : 'No Info'}</span > 
                </p >
                <p class="card-text">
                    <span class="text-secondary">First Published:</span> ${book.first_publish_year ? book.first_publish_year : 'Unknown'}
                </p >
            </div >
            </div >
        </div >
    </div >
    `;
        resultContainer.appendChild(div);
    });
}

const imgError = (image) => {
    console.log(image)
    image.onerror = "";
    image.src = "../images/not-available.jpg";
    return true;
}

const toggleResultArea = (displayStyle) => {
    document.getElementById('result-area').style.display = displayStyle;
}
