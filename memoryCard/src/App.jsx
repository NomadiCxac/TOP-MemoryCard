import { useState } from 'react'

import './App.css'
import PokemonQuery from './assets/functions/pokemonQuery'
import PokemonVariant from './assets/functions/pokemonVariantQuery'

function App() {

  const [currentRound, setCurrentRound] = useState(0);
  const [currentPokemon, setCurrentPokemon] = useState("");

  return (
    <>
    <div className='topHalf'>

      <div className='gameSetupDashboard'>
        <div>Poke Search</div>
        <div>Pokemon List</div>
        <div>League</div>
        <div>Best / Worst</div>
      </div>
      <div className='gameConsole'>
        <button>Play</button>
        <div>Top 10 Best/Worst Matchups for Pokemon</div>
        <div>Score</div>
      </div>

      <div className='currentPokemon'>
        <div>Pokemon Card Goes Here</div>
      </div>

    </div>
    <div className='bottomHalf'>  
    <h1>
      Welcome to PokemonGO Memory Battler
    </h1>
    <PokemonVariant></PokemonVariant>
      <PokemonQuery></PokemonQuery>
      </div>

    </>
  )
}

export default App
