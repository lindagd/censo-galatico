const search_input = document.getElementById('search-bar');
const planet_div = document.querySelector('.about-planet');
const planet_list = document.querySelector('.planets-container');
const residentsTable = document.querySelector('.about-residents');

search_input.addEventListener('input', function() {
  const query = search_input.value.trim();
  if (query) {
    searchPlanet(query);
  } else {
    planet_div.innerHTML = '';
    residentsTable.innerHTML = '';
  }
});

async function fetchPlanets() {
  const response = await fetch('https://swapi.dev/api/planets/?format=json');
  const {results} = await response.json();

  results.forEach(planet => {
    planet_button = document.createElement('button');
    planet_button.innerHTML = planet.name;

    planet_button.addEventListener('click', () => {
      showPlanet(planet);
    });

    planet_list.appendChild(planet_button);
  });
}

async function searchPlanet(input) {
  const response = await fetch(`https://swapi.dev/api/planets/?search=${input}`);
  const {results} = await response.json();
  
  if (results.length > 0) {
    return showPlanet(results[0])
  }
  planet_div.innerHTML = '<div class="search-not-found">Nenhum planeta encontrado :(</div>';
  residentsTable.innerHTML = '';
}

function fetchResidents(residents) {
  residentsTable.innerHTML = '';

  if (residents.length == 0) {
    residentsTable.innerHTML = '<p>Não há informações sobre seus habitantes.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.innerHTML = `<tr>
                      <th>Nome</th>
                      <th>Nascimento</th>
                    </tr>`;
  residentsTable.appendChild(table);

  residents.forEach(async url => {
    const res = await fetch(url);
    const resident = await res.json();

    const new_row = document.createElement('tr');
    new_row.innerHTML = `<td>${resident.name}</td><td>${resident.birth_year}</td>`;
    table.appendChild(new_row);
  });
}

function showPlanet(planet) {
  planet_div.innerHTML = `<div class="about-planet"><h2>${planet.name}</h2>
                          <p><strong>Clima:</strong> ${planet.climate}</p>
                          <p><strong>População:</strong> ${planet.population}</p>
                          <p><strong>Terreno:</strong> ${planet.terrain}</p></div>`;

  fetchResidents(planet.residents);
}

fetchPlanets();