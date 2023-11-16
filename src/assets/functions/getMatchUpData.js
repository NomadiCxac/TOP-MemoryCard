import { main as getTopMatchups } from './getTopMatchups.js';


function parsePokemonNames(pokemonList) {
    return pokemonList.map(entry => {
      // Split the entry by spaces and filter out any parts with '+' or '/'
      const nameParts = entry.split(' ').filter(part => !part.includes('+') && !part.includes('/'));
      // Join the remaining parts back into a string
      return nameParts.join(' ');
    });
  }

export default async function getMatchUpData (isMatchUpBest, pokemonString) {

    if (isMatchUpBest == "Worst") {
        isMatchUpBest = false;
    }

    if (isMatchUpBest == "Best") {
        isMatchUpBest = true;
    }


    try {
        let pokemonMatchUpDataObject = await getTopMatchups(pokemonString)
        console.log(pokemonMatchUpDataObject.worst);

    let pokemonArray = [];

    if (isMatchUpBest === true) {
        console.log("step in here best")
        for (let i = 0; i < pokemonMatchUpDataObject.best.length; i++) {
            pokemonArray.push(pokemonMatchUpDataObject.best[i]["Pokemon"]);
        }
    }

    // User wants worst matchups for the pokemon
    if (isMatchUpBest === false) {
        console.log("step in here worst")
        for (let i = 0; i < pokemonMatchUpDataObject.worst.length; i++) {
            pokemonArray.push(pokemonMatchUpDataObject.worst[i]["Pokemon"]);
        }
    }


    const parsedPokemonArray = parsePokemonNames(pokemonArray);
    console.log(parsedPokemonArray);

    
    return parsedPokemonArray;
    } 
    
    catch (error) {
        console.error("An error occurred:", error);
        return null;
    }

}

// getMatchUpData(false, "voltorb").then(pokemonArray => {
//     console.log(pokemonArray);
// }).catch(error => {
//     console.error("Error:", error);
// });