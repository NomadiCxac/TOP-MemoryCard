import { useState, useEffect } from 'react';
import getMatchUpData from './getMatchUpData';
import PokemonCard from '../components/pokemonCard';
import { returnBaseName, findVariantName, fetchPokemonVariants, formatPokemonVariantName  } from './findVariantUrl';

const PokeFetcher = () => {
  const [loading, setLoading] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonMatchupsNames, setPokemonMatchupsNames] = useState([]);
  const [pokemonMatchupsList, setPokemonMatchupsList] = useState([]);

  useEffect(() => {
    // This will log every time pokemonMatchupsList changes
    console.log("pokemonMatchupsList has been updated:", pokemonMatchupsList);
  }, [pokemonMatchupsList]); // Adding pokemonMatchupsList as a dependency for useEffect

  async function fetchAndSetMatchups(matchupData) {
    // Map over matchupData to fetch details for each Pokemon variant
    const matchupDetailsPromises = matchupData.map(async (name) => {
      const formattedPokemonName = formatPokemonVariantName(name);
      const baseName = returnBaseName(name);
      const variants = await fetchPokemonVariants(baseName);
      const variantName = findVariantName(variants, formattedPokemonName);
      if (variantName) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${variantName.toLowerCase()}`);
        if (response.ok) {
          return response.json(); // Get the JSON from the response
        }
      }
      return null; // If fetch failed or no variantName was found
    });

  // Wait for all the fetches to complete and filter out any null responses
  const matchupsResponses = (await Promise.all(matchupDetailsPromises)).filter(Boolean);

  // Now convert the Response objects to JSON
  const matchupsJsonPromises = matchupsResponses.map(response => response.json());
  const matchupsJson = await Promise.all(matchupsJsonPromises);

  setPokemonMatchupsList(matchupsJson); // Now this list contains JSON objects rather than Response objects
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
      const matchupData = await getMatchUpData(true, searchedPokemon);
  
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
          pokemonName={pokemonData.pokemonName}
          pokemonSprite={pokemonData.pokemonSprite}
          pokemonShinySprite={pokemonData.pokemonShinySprite}
          pokemonTypeOne={pokemonData.pokemonTypeOne}
          pokemonTypeTwo={pokemonData.pokemonTypeTwo}
        />
      )}
      {/* Render fetched matchup Pokémon cards */}
      {pokemonMatchupsList.map((pokemon, index) => (
  <div key={index}>
    <h3>{pokemon.name}</h3> {/* Display the Pokemon's name */}
    <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} /> {/* Display the Pokemon's default sprite */}
    {/* Add more Pokemon details as desired */}
  </div>
))}
    </>
  );
};

export default PokeFetcher;