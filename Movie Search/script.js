const apiKey = "12dafb0dc715e5960eded316464f2736";

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  searchMovies(1);
});

function searchMovies(page) {
  const title = document.getElementById("title").value;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}&page=${page}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    const result = JSON.parse(xhr.responseText);
    const moviesDiv = document.getElementById("movies");
    const paginationDiv = document.getElementById("pagination");
    const detailsDiv = document.getElementById("details");

    moviesDiv.innerHTML = "";
    paginationDiv.innerHTML = "";
    detailsDiv.innerHTML = "";

    if (result.results && result.results.length > 0) {
      result.results.forEach((movie) => {
        const div = document.createElement("div");
        div.className = "movie";

        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : `https://via.placeholder.com/200x300?text=No+Image`;

        div.innerHTML = `
          <img src="${posterUrl}" alt="Poster" width="100"><br>
          <strong>${movie.title}</strong> (${movie.release_date?.substring(0, 4) || "N/A"})<br>
          <button onclick="getDetails(${movie.id})">Details</button>
        `;

        moviesDiv.appendChild(div);
      });

      const totalPages = result.total_pages;
      for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        btn.innerText = i;
        btn.onclick = function () {
          searchMovies(i);
        };
        paginationDiv.appendChild(btn);
      }
    } else {
      moviesDiv.innerHTML = "Movie not found!";
    }
  };
  xhr.send();
}

function getDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    const movie = JSON.parse(xhr.responseText);
    const detailsDiv = document.getElementById("details");

    detailsDiv.innerHTML = `
      <h2>${movie.title}</h2>
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Genres:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <p><strong>Rating:</strong> ${movie.vote_average} (${movie.vote_count} votes)</p>
      <p><strong>Production Countries:</strong> ${movie.production_countries.map((c) => c.name).join(", ")}</p>
    `;
  };
  xhr.send();
}