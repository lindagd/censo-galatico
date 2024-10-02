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

function showPlanet(planet) {
  let planet_div = document.querySelector('.planet-info');

  planet_div.innerHTML = `<h2>${planet.name}</h2>
                          <p><strong>Clima:</strong> ${planet.climate}</p>
                          <p><strong>População:</strong> ${planet.population}</p>
                          <p><strong>Terreno:</strong> ${planet.terrain}</p>`;
}


fetchPlanets();