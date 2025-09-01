document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("catalog-grid");
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  const sortSelect = document.getElementById("sort");
  const resultCount = document.getElementById("resultCount");
  const btnGrid = document.getElementById("btnGrid");
  const btnList = document.getElementById("btnList");

  let items = [];

  fetch("data/catalog.json")
    .then(res => res.json())
    .then(data => {
      items = data;
      render(items);
    });

  function render(list) {
    grid.innerHTML = "";
    list.forEach(item => {
      const col = document.createElement("div");
      col.className = grid.dataset.view === "grid" ? "col-md-4" : "col-12";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${item.titolo}</h5>
            <p class="card-text">${item.descrizione}</p>
            <a href="${item.link}" class="btn btn-outline-primary btn-sm">Vai alla scheda</a>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });

    resultCount.textContent = `${list.length} risultato${list.length !== 1 ? 'i' : ''} trovati`;
  }

  function filterAndSort() {
    let filtered = [...items];

    // Filtro per tipologia
    const tipo = filterSelect.value;
    if (tipo) {
      filtered = filtered.filter(i => i.tipo === tipo);
    }

    // Ricerca
    const query = searchInput.value.toLowerCase();
    if (query) {
      filtered = filtered.filter(i => i.titolo.toLowerCase().includes(query));
    }

    // Ordinamento
    const sort = sortSelect.value;
    if (sort === "title-asc") {
      filtered.sort((a, b) => a.titolo.localeCompare(b.titolo));
    } else {
      filtered.sort((a, b) => b.titolo.localeCompare(a.titolo));
    }

    render(filtered);
  }

  searchInput.addEventListener("input", filterAndSort);
  filterSelect.addEventListener("change", filterAndSort);
  sortSelect.addEventListener("change", filterAndSort);

  btnGrid.addEventListener("click", () => {
    grid.dataset.view = "grid";
    btnGrid.classList.add("active");
    btnList.classList.remove("active");
    render(items);
  });

  btnList.addEventListener("click", () => {
    grid.dataset.view = "list";
    btnList.classList.add("active");
    btnGrid.classList.remove("active");
    render(items);
  });
});
