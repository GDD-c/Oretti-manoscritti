document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("browse-container");

  fetch("data/catalog.json")
    .then(res => {
      if (!res.ok) throw new Error("catalog.json non trovato!");
      return res.json();
    })
    .then(data => {
      const grouped = {};
      data.forEach(item => {
        grouped[item.tipo] ??= [];
        grouped[item.tipo].push(item);
      });
      const ordine = ["manoscritto", "autori", "collezionisti", "opere", "luogo"];
      ordine.forEach(tipo => {
        if (grouped[tipo]) {
          const header = document.createElement("div");
          header.className = "col-12";
          header.innerHTML = `<h2 class="h5 mb-3">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}s</h2>`;
          container.append(header);
          grouped[tipo].forEach(item => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";
            col.innerHTML = `
              <div class="card h-100 shadow-sm">
                <img src="${item.immagine || 'img/default.jpg'}" class="card-img-top" alt="${item.titolo}">
                <div class="card-body">
                  <h5 class="card-title">${item.titolo}</h5>
                  <p class="card-text small">${item.descrizione}</p>
                  <a href="${item.link}" class="btn btn-sm btn-outline-primary">Apri scheda</a>
                </div>
              </div>`;
            container.append(col);
          });
        }
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="text-danger">Errore nel caricamento dei dati: ${err.message}</p>`;
    });
});
