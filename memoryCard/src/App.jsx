import { useState } from 'react'

import './App.css'
import PokemonQuery from './assets/functions/pokemonQuery'
import PokemonVariant from './assets/functions/pokemonVariantQuery'

function App() {

  return (
    <>
    <h1>
      Welcome to PokemonGO Memory Battler
    </h1>
    <PokemonVariant></PokemonVariant>
      <PokemonQuery></PokemonQuery>
    </>
  )
}

export default App
