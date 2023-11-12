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
  

  // State Logic to set the specified and desired game conditions
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const [selectedCup, setSelectedCup] = useState('');
  const [selectedMatchupType, setSelectedMatchupType,] = useState('');
  const [selectedMatchupList, setSelectedMatchupList] = useState('');



  // Handlers:

  function handleFetchedData (pokemon, matchups) {
    setPokemonData(pokemon);
    setPokemonMatchupsList(matchups);
    console.log('handleFetchedData called with matchups:', matchups); // Log the matchups received
    setIsDataLoaded(true);
    setIsGameStarted(true);

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
      />

      {/* <div className='gameSetupDashboard'>
        <div>Poke Search</div>
        <div>Pokemon List</div>
        <div>League</div>
        <div>Best / Worst</div>
      </div> */}
      <GameConsole
        searchedPokemon={searchedPokemon}
        selectedCup={selectedCup}
        selectedMatchupType={selectedMatchupType}
        selectedMatchupList={selectedMatchupList}
        onFetchedData={handleFetchedData}
        isGameStarted={isGameStarted}
        currentRound={currentRound}
        currentScore={currentScore}
        isGameEnded={isGameEnded}
      />

      <div className='currentPokemon'>
        <h2>Selected Pokemon:</h2>
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
   
      {isDataLoaded && isGameStarted && <CardContainer 
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
