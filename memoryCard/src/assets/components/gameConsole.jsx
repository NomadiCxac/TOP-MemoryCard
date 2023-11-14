
    import { fetchDataForGame } from './pokeDataFetcher'; // Import the custom hook
    import PokemonBattlerIntroText from './pokemonGOBattlerText';

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
            <div className='gcTopHalf'>
                <PokemonBattlerIntroText />
            </div>
            <div className='gcBottomHalf'>
                <button onClick={handlePlayButtonClick}>Start Game</button>
                <div>Score</div>
            </div>
        </div>
        )
    }