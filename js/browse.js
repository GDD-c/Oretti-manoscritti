document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("browse-container");

  fetch("data/catalog.json")
    .then(res => res.json())
    .then(data => {
      // Raggruppa per tipo
      const grouped = {};
      data.forEach(item => {
        if (!grouped[item.tipo]) {
          grouped[item.tipo] = [];
        }
        grouped[item.tipo].push(item);
      });

      // Ordine visualizzazione personalizzato
      const ordine = ["manoscritto", "autori", "collezionisti", "opere", "luogo"];

      ordine.forEach(tipo => {
        if (grouped[tipo]) {
          const col = document.createElement("div");
          col.className = "col-12";
          col.innerHTML = `<h2 class="h5 mb-3 text-capitalize">${tipo}s</h2>`;
          container.appendChild(col);

          grouped[tipo].forEach(item => {
            const card = document.createElement("div");
            card.className = "col-md-6 col-lg-4";
            card.innerHTML = `
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">${item.titolo}</h5>
                  <p class="card-text small">${item.descrizione}</p>
                  <a href="${item.link}" class="btn btn-sm btn-outline-primary">Apri scheda</a>
                </div>
              </div>
            `;
            container.appendChild(card);
          });
        }
      });
    });
});
