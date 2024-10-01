async function fetchPlanets() {
  let response = await fetch('https://swapi.dev/api/planets/?format=json');
  const {results} = await response.json();

  console.log(results);
}

fetchPlanets();