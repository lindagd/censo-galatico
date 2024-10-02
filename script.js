async function fetchPlanets() {
  let response = await fetch('https://swapi.dev/api/planets/?format=json');
  const {results} = await response.json();

  let planet_list = document.querySelector('.planets-container');
  results.forEach(planet => {
    planet_button = document.createElement('button');
    planet_button.innerHTML = planet.name;

    planet_list.appendChild(planet_button);
  });
}

fetchPlanets();