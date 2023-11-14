
import React, { useState } from 'react';

const InfoModal = ({ showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>How to Set-Up:</h2>
        <ol>
          <li>Enter a Pokemon that you are interested in understanding the matchups for, into the Pokemon Searcher</li>
          <li>Select the League that you typically battle in</li>
          <li>Select whether you want to understand your BEST or WORST matchups</li>
          <li>Choose whether to fight against the META (Most Effective Tactic Available) Pokemon OR ALL the Pokemon that are eligible for the chosen league</li>
          <li>When you are ready to play; click "Start Game"</li>
        </ol>
        <h2>Scoring & Gameplay:</h2>
        <p>Your goal is to get the highest score as possible and to remember all the pokemon that you beat/lose to. Starting with round 1, you will be shown 5 different cards at a time, where you must select a pokemon that you have not yet seen before. For example, if Pikachu is shown and selected on Round 1, you must not select him on Round 2. 

For each successful guess of a pokemon that you have not clicked before; you will get 1 point!
For each incorrect guess of a pokemon that you have clicked before, you will lose 1 life! 

You have a total of 3 lives. GLHF!
</p>
        {/* Close button */}
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
}

const PokemonBattlerIntroText = () => {
const [showModal, setShowModal] = useState(false);
  return (
    <div className="battlerText">
      <h1>Welcome to the PokemonGO Memory Card Battler!</h1>
      <p>This App uses data generated from battle simulations run from 
      <a href="https://pvpoke.com/" target="_blank" rel="noopener noreferrer"> pvpoke.com</a> to generate a list of the BEST OR WORST pokemon matchups for a selected pokemon.
      If you want to know what matchups your pokemon are great or terrible against, you can use this tool to help you memorize what you should be afraid OR excited to see in your PokemonGO PvP battles!</p>
      <button onClick={() => setShowModal(true)}>
        <span>ℹ️</span>
      </button>
      <InfoModal showModal={showModal} setShowModal={setShowModal} />

    </div>
  );
};

export default PokemonBattlerIntroText;