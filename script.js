const search_input = document.getElementById('search-bar');
const planet_div = document.querySelector('.planet-info');

search_input.addEventListener('input', function() {
  const query = search_input.value.trim();
  if (query) {
    searchPlanet(query);
  } else {
    planet_div.innerHTML = '';
  }
});

async function fetchPlanets() {
  let response = await fetch('https://swapi.dev/api/planets/?format=json');
  const {results} = await response.json();

  let planet_list = document.querySelector('.planets-container');
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
  let response = await fetch(`https://swapi.dev/api/planets/?search=${input}`);
  const {results} = await response.json();
  
  if (results.length > 0) {
    return showPlanet(results[0])
  }
  planet_div.innerHTML = '<div class="search-not-found">Nenhum planeta encontrado :(</div>';
}

function showPlanet(planet) {
  planet_div.innerHTML = `<h2>${planet.name}</h2>
                          <p><strong>Clima:</strong> ${planet.climate}</p>
                          <p><strong>População:</strong> ${planet.population}</p>
                          <p><strong>Terreno:</strong> ${planet.terrain}</p>`;
}

fetchPlanets();