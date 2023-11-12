// pokeFetcher.js
import getMatchUpData from '../functions/getMatchUpData';
import { returnBaseName, findVariantName, fetchPokemonVariants, formatPokemonVariantName } from '../functions/findVariantUrl';

// Fetches details for a single Pokemon
export async function fetchPokemonDetails(searchedPokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching pokemon details:', error);
        return null;
    }
}

// Fetches details for multiple Pokemon matchups
export async function fetchPokemonMatchups(matchupData) {
    const promises = matchupData.map(async (name) => {
        try {
            const formattedName = formatPokemonVariantName(name);
            const baseName = returnBaseName(name);
            const variantName = findVariantName(await fetchPokemonVariants(baseName), formattedName);
            if (variantName) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${variantName.toLowerCase()}`);
                if (response.ok) {
                    return await response.json();
                }
            }
        } catch (error) {
            console.error(`Error fetching matchup for ${name}:`, error);
        }
        return null;
    });

    const results = await Promise.all(promises);
    return results.filter(Boolean).map(pokemonMatchup => ({
        pokemonName: pokemonMatchup.name,
        pokemonSprite: pokemonMatchup.sprites.front_default,
        pokemonShinySprite: pokemonMatchup.sprites.front_shiny,
        pokemonTypeOne: pokemonMatchup.types[0].type.name,
        pokemonTypeTwo: pokemonMatchup.types[1]?.type.name || undefined,
    }));
}

// Orchestrates the fetching of pokemon details and its matchups
export async function fetchDataForGame(searchedPokemon) {
  console.log(`Fetching data for: ${searchedPokemon}`); // Log the Pokemon being searched
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`);
    if (!pokemonResponse.ok) {
      throw new Error('Pokemon not found');
    }

    const pokemonJson = await pokemonResponse.json();
    console.log('Pokemon data:', pokemonJson); // Log fetched Pokemon data

     
    const matchupData = await getMatchUpData(true, searchedPokemon); // Assume this returns an array
    if (!Array.isArray(matchupData)) {
      throw new Error('Matchup data is not an array');
    }

    console.log('Matchup names data:', matchupData); // Log matchup names before fetching their details

    
    const matchups = await fetchPokemonMatchups(matchupData); // Fetch details for matchups
    console.log('Detailed matchups data:', matchups); // Log detailed matchup data after fetching

 

    return {
      pokemon: {
        pokemonName: searchedPokemon,
        pokemonSprite: pokemonJson.sprites.front_default,
        pokemonShinySprite: pokemonJson.sprites.front_shiny,
        pokemonTypeOne: pokemonJson.types[0].type.name,
        pokemonTypeTwo: pokemonJson.types[1]?.type.name || undefined,
      },
      matchups: matchups,
    };
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null; // Return null to indicate the fetch failed
  }
}