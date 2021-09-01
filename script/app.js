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
    resultCount.innerText = `Total Results Found: ${bookList.length}`;

    //Displaying search Result
    const resultContainer = document.getElementById('result-container');

    bookList.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>`;
        resultContainer.appendChild(div);
    });
}