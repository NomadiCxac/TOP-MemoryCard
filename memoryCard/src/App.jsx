import { useState, useEffect } from 'react'
import  GameSetUp  from './assets/components/gameSetupDashboard'
import GameConsole from './assets/components/gameConsole'
import './App.css'
import PokemonQuery from './assets/functions/pokemonQuery'
import PokemonVariant from './assets/functions/pokemonVariantQuery'
import PokemonCard from './assets/components/pokemonCard'
import CardContainer from './assets/components/CardContainer'

function App() {
  

  // Game State Progression
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentRound, setCurrentRound] = useState(0);
  const [currentScore, setCurrentScore] = useState(0); 
  const [isGameEnded, setIsGameEnded] = useState(false);

  // Data for Game States
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonMatchupsList, setPokemonMatchupsList] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  // State Logic to set the specified and desired game conditions
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const [selectedCup, setSelectedCup] = useState('');
  const [selectedMatchupType, setSelectedMatchupType,] = useState('');
  const [selectedMatchupList, setSelectedMatchupList] = useState('');


  useEffect(() => {
    // This code runs whenever currentScore changes
    console.log('Current Score has changed:', currentScore);

    // If you want to perform some action based on the score change, do it here
    // For example, you might want to check if a new high score has been reached
    // and update some state or localStorage, etc.

  }, [currentScore]); // Only re-run the effect if currentScore changes

  useEffect(() => {
    // This code runs whenever currentScore changes
    console.log('There was an error', error);
    console.log('The error was the following:', errorMessage);

    // If you want to perform some action based on the score change, do it here
    // For example, you might want to check if a new high score has been reached
    // and update some state or localStorage, etc.

  }, [error]); // Only re-run the effect if currentScore changes


  

  useEffect(() => {
    // This code runs whenever currentScore changes
    console.log('Game Has Ended');

    // If you want to perform some action based on the score change, do it here
    // For example, you might want to check if a new high score has been reached
    // and update some state or localStorage, etc.

  }, [isGameEnded]); // Only re-run the effect if currentScore changes

  // Handlers:

  function handleFetchedData (pokemon, matchups) {
    setPokemonData(pokemon);
    setPokemonMatchupsList(matchups);
    console.log('handleFetchedData called with matchups:', matchups); // Log the matchups received
    setIsDataLoaded(true);
    setIsGameStarted(true);
  }

  
  function resetGame() {
    setIsGameStarted(false);
    setIsLoading(false);
    setError(false);
    setErrorMessage("");
    setCurrentRound(0);
    setCurrentScore(0);
    setIsGameEnded(false);
    setIsDataLoaded(false);
    setPokemonData({});
    setPokemonMatchupsList([]);
    // Reset other states if necessary
  }


  return (
    <>
    <div className='topHalf'>

      <GameSetUp 
        searchedPokemon={searchedPokemon}
        setSearchedPokemon={setSearchedPokemon}
        selectedCup={selectedCup}
        setSelectedCup={setSelectedCup}
        selectedMatchupType={selectedMatchupType}
        setSelectedMatchupType={setSelectedMatchupType}
        selectedMatchupList={selectedMatchupList}
        setSelectedMatchupList={setSelectedMatchupList}
        isGameStarted={isGameStarted}
      />


      <GameConsole
        setIsLoading={setIsLoading}
        setError={setError}
        setErrorMessage={setErrorMessage}
        searchedPokemon={searchedPokemon}
        selectedCup={selectedCup}
        selectedMatchupType={selectedMatchupType}
        selectedMatchupList={selectedMatchupList}
        onFetchedData={handleFetchedData}
        isGameStarted={isGameStarted}
        currentRound={currentRound}
        currentScore={currentScore}
        isGameEnded={isGameEnded}
        onResetGame={resetGame}
      />

      <div className='currentPokemon'>
        {isDataLoaded && <h2>Selected Pokemon:</h2>}
        {isDataLoaded && <PokemonCard 
          isSelected = {true}
          key={"currentPokemon-" + pokemonData.pokemonName}
          pokemonName={pokemonData.pokemonName}
          pokemonSprite={pokemonData.pokemonSprite}
          pokemonShinySprite={pokemonData.pokemonShinySprite}
          pokemonTypeOne={pokemonData.pokemonTypeOne}
          pokemonTypeTwo={pokemonData.pokemonTypeTwo}
          onCardClick={null}
        />}
      </div>

    </div>
    <div className='bottomHalf'>  

      {loading &&  <div>Pokemon Data is Loading...</div>}

      {error && 
      <div>
      <div>Error: {errorMessage}</div>
      <button onClick={resetGame}>Restart Search</button>
      </div>}
   
      {isDataLoaded && isGameStarted && !error && <CardContainer 
        key={"CardContainer"}
        setIsGameEnded={setIsGameEnded}
        isSelected ={false}
        pokemonMatchupsList={pokemonMatchupsList}
        setCurrentRound = {setCurrentRound}
        setCurrentScore = {setCurrentScore}
      />}
      </div>
      
      {isGameEnded && <div>Game Ended Dude</div>}

    </>
  )
}

export default App
