import React, { useState, useEffect } from 'react';
import PokemonCard from "./pokemonCard";

export default function CardContainer({
  pokemonMatchupsList,
  setCurrentRound,
  setCurrentScore,
  setIsGameEnded,
}) {
  const [selectedMatchups, setSelectedMatchups] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState([]);


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
    console.log(pokemonMatchupsList);
  }, [pokemonMatchupsList]);

  function handleCardClick (pokemonName) {
    if (clickedPokemons.includes(pokemonName)) {
      setIsGameEnded(true);
      return;
    } else {
      // Pokemon has not been clicked, update score and add to clicked list
      setCurrentScore((prevScore) => prevScore + 1);
      setCurrentRound((prevRound) => prevRound + 1)
      setClickedPokemons((prevClicked) => [...prevClicked, pokemonName]);
      console.log(clickedPokemons);
    }
  }
  

  // Render the selected matchups
  return (
    <div className="CardContainer">
      {selectedMatchups.map((matchup) => (
        <PokemonCard
          key={matchup.isShadow ? matchup.pokemonName + " (Shadow)" : matchup.pokemonName}
          isSelected={false}
          pokemonName={matchup.pokemonName}
          pokemonSprite={matchup.pokemonSprite}
          pokemonShinySprite={matchup.pokemonShinySprite}
          pokemonTypeOne={matchup.pokemonTypeOne}
          pokemonTypeTwo={matchup.pokemonTypeTwo || 'N/A'} // Handle possibly undefined second type
          isShadow={matchup.isShadow}
          onCardClick={()=> handleCardClick(matchup.pokemonName)}
        />
      ))}
    </div>
  );
}