import { useState } from 'react';
import { capitalizeFirstLetter } from './helperFunctions';
import PokemonCard from '../components/pokemonCard';

function PokemonQuery() {
  const [pokemonName, setPokemonName] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
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
        setLoading(false);
        console.log(data);
        console.log(data.types[0].type.name)
        console.log(data.types[1].type.name)
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        setError(error);
        setLoading(false);
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
      <button onClick={fetchData}>Fetch Pokémon</button>


      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <PokemonCard 
        pokemonName={pokemonName}
        pokemonSprite={data.sprites.front_default}
        pokemonShinySprite={data.sprites.front_shiny}
        pokemonTypeOne={data.types[0].type.name}
        pokemonTypeTwo={data.types[1].type.name}
      />
      )}
    </div>
  );
}

export default PokemonQuery;