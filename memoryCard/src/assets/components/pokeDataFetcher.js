import { useState, useEffect } from 'react';
import getMatchUpData from '../functions/getMatchUpData';
import { returnBaseName, findVariantName, fetchPokemonVariants, formatPokemonVariantName  } from '../functions/findVariantUrl';

export function usePokeFetcher (searchedPokemon) {
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonMatchupsList, setPokemonMatchupsList] = useState([]);

  useEffect(() => {
    // This will log every time pokemonMatchupsList changes
    console.log("pokemonMatchupsList has been updated:", pokemonMatchupsList);
  }, [pokemonMatchupsList]); // Adding pokemonMatchupsList as a dependency for useEffect

  async function fetchAndSetMatchups(matchupData) {
    // Map over matchupData to fetch details for each Pokemon variant
    const matchupDetailsPromises = matchupData.map(async (name) => {
      try {
        const formattedPokemonName = formatPokemonVariantName(name);
        const baseName = returnBaseName(name);
        const variants = await fetchPokemonVariants(baseName); // async fn that calls pokeAPI
        const variantName = findVariantName(variants, formattedPokemonName);
        console.log(`Attempting to fetch details for: ${variantName || 'No variant found'}`);
  
        if (variantName) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${variantName.toLowerCase()}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json(); // Get the JSON from the response if successful
        }
      } catch (error) {
        console.error(`Error fetching data for Pokemon "${name}":`, error.message);
      }
      return null; // Return null to handle cases where the fetch fails or a variant name isn't found
    });

  // Wait for all the fetches to complete and use filter(Boolean) to remove any null responses

    const results = await Promise.all(matchupDetailsPromises);
    const validResults = results.filter(Boolean); // Remove any null entries
    return validResults.map(pokemonMatchup => {
      // Return the desired object structure
      return {
        pokemonName: pokemonMatchup.name,
        pokemonSprite: pokemonMatchup.sprites.front_default,
        pokemonShinySprite: pokemonMatchup.sprites.front_shiny,
        pokemonTypeOne: pokemonMatchup.types[0].type.name,
        pokemonTypeTwo: pokemonMatchup.types[1]?.type.name || undefined,
      };
    }); 
}

  async function fetchData() {
    setLoading(true);
    try {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`);
      if (!pokemonResponse.ok) throw new Error('Pokémon not found');
      const pokemonJson = await pokemonResponse.json();
  
      // Extract necessary data for PokemonCard
      setPokemonData({
        pokemonName: searchedPokemon,
        pokemonSprite: pokemonJson.sprites.front_default,
        pokemonShinySprite: pokemonJson.sprites.front_shiny,
        pokemonTypeOne: pokemonJson.types[0].type.name,
        pokemonTypeTwo: pokemonJson.types[1]?.type.name || undefined,
      });
  
      // Fetch matchup data
      const matchupData = await getMatchUpData(false, searchedPokemon);
  
      // Fetch and set detailed matchup data
      await fetchAndSetMatchups(matchupData); // Handle fetching of details within this function
  
      setIsDataLoaded(true);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  }

  return { loading, pokemonData, pokemonMatchupsList, fetchData, fetchAndSetMatchups };
}

// For loop consideration for fetchAndSetMatchups
// async function fetchAndSetMatchups(matchupData) {
//   let matchupDetails = [];

//   for (const name of matchupData) {
//     try {
//       const formattedPokemonName = formatPokemonVariantName(name);
//       const baseName = returnBaseName(name);
//       const variants = await fetchPokemonVariants(baseName);
//       const variantName = findVariantName(variants, formattedPokemonName);

//       if (!variantName) {
//         console.log('No variant found for:', name);
//         continue; // Skip to the next iteration of the loop
//       }

//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${variantName.toLowerCase()}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const pokemonMatchup = await response.json();
//       matchupDetails.push({
//         pokemonName: pokemonMatchup.name,
//         pokemonSprite: pokemonMatchup.sprites.front_default,
//         pokemonShinySprite: pokemonMatchup.sprites.front_shiny,
//         pokemonTypeOne: pokemonMatchup.types[0].type.name,
//         pokemonTypeTwo: pokemonMatchup.types[1]?.type.name || undefined,
//       });
//     } catch (error) {
//       console.error(`Error fetching data for Pokemon "${name}":`, error.message);
//       // Optionally push null or handle the error differently
//     }
//   }

//   return matchupDetails; // This array now only contains successfully fetched details
// }