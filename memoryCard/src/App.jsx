import { useState } from 'react'
import  GameSetUp  from './assets/components/gameSetupDashboard'
import GameConsole from './assets/components/gameConsole'
import './App.css'
import PokemonQuery from './assets/functions/pokemonQuery'
import PokemonVariant from './assets/functions/pokemonVariantQuery'
import PokemonCard from './assets/components/pokemonCard'

function App() {

  // Game State Progression
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentRound, setCurrentRound] = useState(0);
  const [currentScore, setCurrentScore] = useState(0); 

  // Data for Game States
  const [loading, setLoading] = useState(false);
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
    setIsDataLoaded(true);
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
      />

      <div className='currentPokemon'>
        {isDataLoaded &&<PokemonCard 
          key={"currentPokemon-" + pokemonData.pokemonName}
          pokemonName={pokemonData.pokemonName}
          pokemonSprite={pokemonData.pokemonSprite}
          pokemonShinySprite={pokemonData.pokemonShinySprite}
          pokemonTypeOne={pokemonData.pokemonTypeOne}
          pokemonTypeTwo={pokemonData.pokemonTypeTwo}
        />}
      </div>

    </div>
    <div className='bottomHalf'>  
      {/* <CardContainer></CardContainer>
    <h1>
      Welcome to PokemonGO Memory Battler
    </h1>
    <PokemonVariant></PokemonVariant>
      <PokemonQuery></PokemonQuery> */}
      </div>

    </>
  )
}

export default App
