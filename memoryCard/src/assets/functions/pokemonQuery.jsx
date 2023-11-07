import { useState, useEffect } from 'react';
import getMatchUpData from './getMatchUpData';
import PokemonCard from '../components/pokemonCard';
import { returnBaseName, findVariantName, fetchPokemonVariants, formatPokemonVariantName  } from './findVariantUrl';

const PokeFetcher = () => {
  const [loading, setLoading] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState('');
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
        const variants = await fetchPokemonVariants(baseName);
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

  // Wait for all the fetches to complete and filter out any null responses
  const matchupsJson= (await Promise.all(matchupDetailsPromises)).filter(Boolean);
  setPokemonMatchupsList(matchupsJson.map(pokemonMatchup => ({
    pokemonName: pokemonMatchup.name, // You can use whatever key names you want here
    pokemonSprite: pokemonMatchup.sprites.front_default,
    pokemonShinySprite: pokemonMatchup.sprites.front_shiny,
    pokemonTypeOne: pokemonMatchup.types[0].type.name,
    pokemonTypeTwo: pokemonMatchup.types[1]?.type.name || undefined,
  }))); // Now this list contains JSON objects rather than Response objects
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
  
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  }

  // Event handler for the button click
  const handleFetchClick = () => {
    fetchData(); // Call fetch data without '()'
  };

  return (
    <>
      <input
        type="text"
        value={searchedPokemon}
        onChange={(e) => setSearchedPokemon(e.target.value)}
        placeholder="Enter Pokémon Name"
      />
      <button onClick={handleFetchClick} disabled={loading}>
        Fetch Pokémon
      </button>
      {/* Assuming you have a condition to render the PokemonCard when data is ready */}
      {pokemonData.pokemonName && (
        <PokemonCard
          key = {pokemonData.pokemonName}
          pokemonName={pokemonData.pokemonName}
          pokemonSprite={pokemonData.pokemonSprite}
          pokemonShinySprite={pokemonData.pokemonShinySprite}
          pokemonTypeOne={pokemonData.pokemonTypeOne}
          pokemonTypeTwo={pokemonData.pokemonTypeTwo}
        />
      )}
      {/* Render fetched matchup Pokémon cards */}
      {pokemonMatchupsList.map((pokemon, index) => (
          <PokemonCard
            key = {pokemon.pokemonName + "-card" + "-" + index}
            pokemonName={pokemon.pokemonName}
            pokemonSprite={pokemon.pokemonSprite}
            pokemonShinySprite={pokemon.pokemonShinySprite}
            pokemonTypeOne={pokemon.pokemonTypeOne}
            pokemonTypeTwo={pokemon.pokemonTypeTwo}
            /> 
))}
    </>
  );
};

export default PokeFetcher;
