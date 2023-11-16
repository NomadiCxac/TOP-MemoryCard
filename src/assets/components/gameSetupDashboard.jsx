import { useState } from "react";

export default function GameSetUp({ 
    searchedPokemon, 
    setSearchedPokemon, 
    selectedCup, 
    setSelectedCup, 
    selectedMatchupType, 
    setSelectedMatchupType, 
    selectedMatchupList, 
    setSelectedMatchupList,
    isGameStarted
}) {



    return (
        <div className='gameSetupDashboard'>
   {!isGameStarted && 
          <>
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
            <option value="Great League (1500CP and Below)">Great League (1500CP and Below)</option>
            <option value="Ultra League (2500CP and Below)">Ultra League (2500CP and Below)</option>
            <option value="Master League (No CP Restriction)">Master League (No CP Restriction)</option>
          </select>
      
          {/* Pokemon Matchup Type */}
          <label htmlFor="pokemonMatchupType">Pokémon Matchup Type</label>
          <select 
            id="pokemonMatchupType"
            value={selectedMatchupType}
            onChange={(e) => setSelectedMatchupType(e.target.value)}
          >
            <option value="" disabled>Select Matchup Type</option>
            <option value="Best">Best</option>
            <option value="Worst">Worst</option>
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
        </>
        }

          {isGameStarted && 
          <>
            <div className="settingTitle">Pokemon Matchup Data for: {searchedPokemon}</div>
            <div className="settingTitle">Current League Cup: {selectedCup}</div>
            <div className="settingTitle">Current Matchup Setting: {selectedMatchupType} Matchups</div>
            <div className="settingTitle">Pokemon Matchup Data List Source: {selectedMatchupList}</div>
          </>}
        </div>
      )
    }