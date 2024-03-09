const accessKey = "K5M9jkeFPxG09ENsupmQFSZCixEfdcfhQmMz6Sm7ucc";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const botaoMostrarMais = document.getElementById("botao-mostrar-mais");

let page = 1;

async function searchImages() {
  const inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.urls.full; 
    imageLink.target = "_blank";
    imageLink.innerText = result.alt_description;    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  botaoMostrarMais.style.display = "block";
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

botaoMostrarMais.addEventListener("click", () => {
  searchImages();
});

document.addEventListener("DOMContentLoaded", () => {
  botaoMostrarMais.style.display = "none";
});
