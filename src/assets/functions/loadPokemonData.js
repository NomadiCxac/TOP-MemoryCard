export default function loadPokemonData(pokemonName) {
    // Update this line to point to the public URL where the matchup data is served
    const dataUrl = `./data/allPokemonMatchups/${pokemonName.toLowerCase()}-matchup.json`;
  
    console.log(`Loading from: ${dataUrl}`);
  
    // Return a fetch promise that resolves with the parsed data
    return fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // parse JSON from the response
      })
      .catch((err) => {
        console.error(`Error fetching data: ${err}`);
        throw err; // Re-throw the error for handling it outside
      });
  }
  
  // Usage example (still has to be in a context where you handle the promise correctly,
  // like within a useEffect hook or an async function):
//   loadPokemonData("Abomasnow").then(result => {
//     console.log(result);
//   }).catch(error => {
//     console.error(error);
//   });