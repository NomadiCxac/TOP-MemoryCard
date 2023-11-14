
    import { fetchDataForGame } from './pokeDataFetcher'; // Import the custom hook
    import PokemonBattlerIntroText from './pokemonGOBattlerText';

    export default function GameConsole({
        searchedPokemon,
        selectedCup,
        selectedMatchupType,
        selectedMatchupList,
        onFetchedData,
        isGameStarted,
        currentRound,
        currentScore,
        isGameEnded,
        onResetGame
    }) {

    
        function validateInputFields() {
            const fields = [searchedPokemon, selectedCup, selectedMatchupType, selectedMatchupList]
            
            return fields.every(field => field !== "" && field != null);
        }

        async function handlePlayButtonClick() {
            if (!validateInputFields()) {
                console.log("Some fields are empty or not provided.");
                return;
            }

            // Indicate loading etc...
            try {
                console.log(searchedPokemon);
                const data = await fetchDataForGame(selectedMatchupType, searchedPokemon);
                
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
            <div className='gcTopHalf'>

                {/* If Game is Not Started Display Help Text */}
                {!isGameStarted && !isGameEnded && <PokemonBattlerIntroText />}


                {/* If game is started play in progress */}
                {isGameStarted && !isGameEnded &&
                <div className='counterContainers'>
                    <div> {searchedPokemon} vs. Top 10 {selectedMatchupType} Matchups</div>
                    <div className='scoreCounter'>Current Score: {currentScore}</div>
                    <div className='roundCounter'>Current Round: {currentRound}</div>    
                </div>
                }

                {/* If game is ended display final result */}
                {isGameEnded && <div>
                    <div>Game Over</div>
                    <button onClick={onResetGame}>Play Again?</button>
                    
                </div>}
                
            </div>
            
            <div className='gcBottomHalf'>
                {!isGameStarted && <button onClick={handlePlayButtonClick}>Start Game</button> }
            </div>
        </div>
        )
    }