import { useState, useEffect } from "react";

export default function PokemonVariant() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [variants, setVariants] = useState([]); // State to store variants

  function fetchVariant() {
    setLoading(true);
    setError(null);
    setVariants([]); // Reset variants
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`)
      .then((response) => {
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
      .then((data) => {
        setData(data);
        // Extract and set the variants here if available
        if (data.varieties) {
          setVariants(data.varieties.map(variety => ({
            name: variety.pokemon.name,
            url: variety.pokemon.url
          })));
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false);

        useEffect(() => {
            if (variants.length > 0) {
              console.log('Updated Variants:', variants);
              // Add any other logic you want to execute when variants change
            }
          }, [variants]);
      });


  }

  return (
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon Species Name"
      />
      <button onClick={fetchVariant} disabled={loading}>Fetch Pokémon Variants</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {variants.length > 0 && (
        <ul>
          {variants.map((variant, index) => (
            <li key={index}>{variant.name} - Details: <a href={variant.url} target="_blank" rel="noreferrer">Link</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}