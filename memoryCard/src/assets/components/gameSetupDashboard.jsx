import { useState } from "react";

export default function GameSetUp({ 
    searchedPokemon, 
    setSearchedPokemon, 
    selectedCup, 
    setSelectedCup, 
    selectedMatchupType, 
    setSelectedMatchupType, 
    selectedMatchupList, 
    setSelectedMatchupList 
}) {



    return (
        <div className='gameSetupDashboard'>
      
          {/* Poke Searcher Input */}
          <label htmlFor="pokemonInput">Pokémon Searcher</label>
          <input
            id="pokemonInput"
            type="text"
            value={searchedPokemon}
            onChange={(e) => setSearchedPokemon(e.target.value)}
            placeholder="Enter Pokémon Name"
          />
      
          {/* Pokemon Cup Selector */}
          <label htmlFor="pokemonCupSelector">Pokémon Cup Selector</label>
          <select 
            id="pokemonCupSelector"
            value={selectedCup}
            onChange={(e) => setSelectedCup(e.target.value)}
          >
            <option value="" disabled>Select Cup</option>
            <option value="greatLeague">Great League (1500CP and Below)</option>
            <option value="ultraLeague">Ultra League (2500CP and Below)</option>
            <option value="masterLeague">Master League (No CP Restriction)</option>
          </select>
      
          {/* Pokemon Matchup Type */}
          <label htmlFor="pokemonMatchupType">Pokémon Matchup Type</label>
          <select 
            id="pokemonMatchupType"
            value={selectedMatchupType}
            onChange={(e) => setSelectedMatchupType(e.target.value)}
          >
            <option value="" disabled>Select Matchup Type</option>
            <option value="All">All Pokémon</option>
            <option value="Meta">Meta-Relevant Pokémon</option>
          </select>
      
          {/* Pokemon Matchup List Source */}
          <label htmlFor="pokemonListSelector">Pokémon List Selector</label>
          <select 
            id="pokemonListSelector"
            value={selectedMatchupList}
            onChange={(e) => setSelectedMatchupList(e.target.value)}
          >
            <option value="" disabled>Select Source List</option>
            <option value="All">All Sources</option>
            <option value="Meta">Meta Sources</option>
          </select>
        </div>
      )
    }