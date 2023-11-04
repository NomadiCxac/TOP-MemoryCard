import { useState } from 'react';
import PokemonCard from '../components/pokemonCard';

function PokemonQuery() {
  const [pokemonName, setPokemonName] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          switch (response.status) {
            case 404:
              throw new Error('Pokémon not found.');
            default:
              throw new Error('An error occurred. Please try again.');
          }
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        // No need to have a monoType state, you can derive this from the data
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false); // This will be executed whether the fetch succeeded or failed
      });
  }

  return (
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={fetchData} disabled={loading}>Fetch Pokémon</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <PokemonCard 
          pokemonName={pokemonName}
          pokemonSprite={data.sprites.front_default}
          pokemonShinySprite={data.sprites.front_shiny}
          pokemonTypeOne={data.types[0].type.name}
          // Render pokemonTypeTwo only if there's more than one type
          pokemonTypeTwo={data.types.length > 1 ? data.types[1].type.name : undefined}
        />
      )}
    </div>
  );
}

export default PokemonQuery;