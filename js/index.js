const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//Busqueda de paises-capitales-del-mundo.json y filtro

const searchState = async searchText => {
  const res = await fetch("../data/paises-capitales-del-mundo.json");
  const data = await res.json();

  //Obtener coincidencias

  let matches = data.filter(dat => {
    //creamos una variable para llamar a la funcion Regular Expression (RegExp) y dentro del la funcion colocaremos sombreito hacia arriba ^ para hacer la coincidencia de la busqueda con la funcion searchText creada anteriormente y de segundo parametro colocamos gi que seria de globol y sencibilidad de las teclas si es mayuscula minuscula
    const regex = new RegExp(`^${searchText}`, "gi");
    return (
      dat.pais.match(regex) ||
      dat.capital.match(regex) ||
      dat.continente.match(regex)
    );
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//mostrar resultados en html

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class="card card-body mb-1">
          <h4>${match.pais}</h4>
          <small>Cap: <span class="text-primary pl-1 pr-1"> ${
            match.capital
          } </span> Continente.<span class="text-primary pl-1 pr-1"> ${
          match.continente
        }</span></small>
        </div>
      `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchState(search.value));
