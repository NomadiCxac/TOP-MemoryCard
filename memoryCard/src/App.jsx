import { useState } from 'react'

import './App.css'
import PokemonQuery from './assets/functions/pokemonQuery'

function App() {

  return (
    <>
    <h1>
      Welcome to PokemonGO Memory Battler
    </h1>
      <PokemonQuery></PokemonQuery>
    </>
  )
}

export default App
