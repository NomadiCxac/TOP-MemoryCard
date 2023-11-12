    import { useState } from 'react';
    import { fetchDataForGame } from './pokeDataFetcher'; // Import the custom hook

    export default function GameConsole({
        searchedPokemon,
        selectedCup,
        selectedMatchupType,
        selectedMatchupList,
        onFetchedData,
    }) {

    
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

        async function handlePlayButtonClick() {
            if (!validateInputFields()) {
                console.log("Some fields are empty or not provided.");
                return;
            }

            // Indicate loading etc...
            try {
                console.log(searchedPokemon);
                const data = await fetchDataForGame(searchedPokemon);
                
                if (data) {
                    onFetchedData(data.pokemon, data.matchups);
                    console.log("this is data matchups")
                    console.log(data.matchups)

                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error in fetching data:', error);
            }
        }




        return (
            <div className='gameConsole'>
            <button onClick={handlePlayButtonClick}>Play</button>
            <div>Top 10 Best/Worst Matchups for Pokemon</div>
            <div>Score</div>
        </div>
        )
    }