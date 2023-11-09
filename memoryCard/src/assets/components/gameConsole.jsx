import { useState } from 'react';
import { usePokeFetcher } from './pokeDataFetcher'; // Import the custom hook

export default function GameConsole({
    searchedPokemon,
    selectedCup,
    selectedMatchupType,
    selectedMatchupList,
    onFetchedData,
}) {
 
    const { loading, pokemonData, pokemonMatchupsList, fetchData } = usePokeFetcher(searchedPokemon);

    function validateInputFields() {
        const fields = [searchedPokemon, selectedCup, selectedMatchupType, selectedMatchupList]
        
        return fields.every(field => field !== "" && field != null);
    }

    function logValues () {
        console.log(  
            searchedPokemon,
            selectedCup,
            selectedMatchupType,
            selectedMatchupList
            )
    }

    async function handlePlayButtonClick () {
        if (!validateInputFields()) {
            console.log("Some fields are empty or not provided.");
    
            return false; // Stop the function if validation fails
        }
        
        logValues(); // Proceed to log values if validation is successful
        // ... other actions after validation and logging values

        await fetchData()
        onFetchedData(pokemonData, pokemonMatchupsList);
    }


    return (
        <div className='gameConsole'>
        <button onClick={handlePlayButtonClick}>Play</button>
        <div>Top 10 Best/Worst Matchups for Pokemon</div>
        <div>Score</div>
      </div>
    )
}