const DEFAULT_VALUE = "--";
const pokemonCount = 1010;
const searchInput = document.getElementById("search-input");
const pokemonIcon = document.querySelector(".pokemon-icon");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonType = document.querySelector(".pokemon-type");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonWeight = document.querySelector(".pokemon-weight");
const pokemonBio = document.querySelector(".pokemon-bio");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

searchInput.addEventListener("change", (event) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value.toLowerCase()}`)
    .then((response) => response.json())
    .then((data) => {
      pokemonID = data.id;
      types = [];
      count_types = data.types.length;
      for (let i = 0; i < count_types; i++) {
        types.push(data.types[i].type.name);
      }
      pokemonName.innerHTML = capitalizeFirstLetter(data.name) || DEFAULT_VALUE;
      pokemonType.innerHTML =
        capitalizeFirstLetter(types.join(", ")) || DEFAULT_VALUE;
      pokemonHeight.innerHTML = data.height * 10 || DEFAULT_VALUE;
      pokemonWeight.innerHTML = data.weight / 10 || DEFAULT_VALUE;
      pokemonIcon.src = data.sprites["front_default"] || DEFAULT_VALUE;
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
        .then((response) => response.json())
        .then((data) => {
          pokemonBio.innerHTML = data.flavor_text_entries[0].flavor_text;
        });
    });
});
