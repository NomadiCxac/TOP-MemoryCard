import React, { useState, useEffect } from 'react';
import PokemonCard from "./pokemonCard";

export default function CardContainer({
  pokemonMatchupsList,
  setCurrentRound,
  setCurrentScore,
}) {
  const [selectedMatchups, setSelectedMatchups] = useState([]);

  // Function to select a random subset of matchups
  const selectRandomMatchups = (matchups, numberToSelect) => {
    const shuffled = [...matchups].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, numberToSelect); // Get the first `numberToSelect` elements
  };

  // Effect to select random matchups when the `pokemonMatchupsList` changes
  useEffect(() => {
    if (pokemonMatchupsList.length) {
      setSelectedMatchups(selectRandomMatchups(pokemonMatchupsList, 5));
    }
  }, [pokemonMatchupsList]);

  // Render the selected matchups
  return (
    <div>
      {selectedMatchups.map((matchup, index) => (
        <PokemonCard
          key={index}
          pokemonName={matchup.pokemonName}
          pokemonSprite={matchup.pokemonSprite}
          pokemonShinySprite={matchup.pokemonShinySprite}
          pokemonTypeOne={matchup.pokemonTypeOne}
          pokemonTypeTwo={matchup.pokemonTypeTwo || 'N/A'} // Handle possibly undefined second type
        />
      ))}
    </div>
  );
}