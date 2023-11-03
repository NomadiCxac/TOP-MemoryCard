const fs = require('fs');
const gameMasterJSON = require('./gamemaster.json');
// const GameMaster = require('./GameMaster.js')
const Battle = require('./Battle.js');
const pokemonList = require('./filteredPokemon.json');
const moveList = require('./filteredMoves.json')
const PokemonReal = require('./Pokemon.js')

class TypeService {
    static getEffectiveness(moveType, targetTypes) {
        let effectiveness = 1;
        moveType = moveType.toLowerCase();

        for (let i = 0; i < targetTypes.length; i++) {
            let type = targetTypes[i].toLowerCase();
            let traits = TypeService.getTypeTraits(type);

            if (traits.weaknesses.includes(moveType)) {
                effectiveness *= 1.6;
            } else if (traits.resistances.includes(moveType)) {
                effectiveness *= 0.625;
            } else if (traits.immunities.includes(moveType)) {
                effectiveness *= 0.390625;
            }
        }
        return effectiveness;
    }

    static getTypeTraits(type) {
        // Define type traits here or fetch from a static source
    }

    static getAllTypes() {
        // Returns all types
    }
}

getBattleRating = function(opponent){

    if(! opponent){
        return 0;
    }

    return Math.floor( (500 * ((opponent.stats.hp - opponent.hp) / opponent.stats.hp)) + (500 * (self.hp / self.stats.hp)))
}

var Pokemon1 = "Medicham";
var Pokemon2 = "Jellicent";

var searchPokemon1 = pokemonList.findIndex(pokemon => pokemon.speciesName == Pokemon1);
var searchPokemon2 = pokemonList.findIndex(pokemon => pokemon.speciesName == Pokemon2);


function Pokemon(species, typesArray, fastMovesArray, chargedMovesArray, atk, def, hp, energy, shields, statBuffs, cooldown, opponent) {
    this.species = species;
    this.types = typesArray;
    this.fastMovesArray = fastMovesArray;
    this.chargedMovesArray = chargedMovesArray;
    this.atk = atk;
    this.def = def;
    this.hp = hp;
    this.energy = energy;
    this.shields = shields;
    this.statBuffs = statBuffs;
    this.cooldown = cooldown;
    this.opponent = opponent;

    this.getTypeTraits = function(type){
		var traits = {
			weaknesses: [],
			resistances: [],
			immunities: []
		};

		switch(type){
			case "normal":
				traits = { resistances: [],
				  weaknesses: ["fighting"],
				  immunities: ["ghost"] };
				break;

			case "fighting":
				traits = { resistances: ["rock", "bug", "dark"],
				  weaknesses: ["flying", "psychic", "fairy"],
				  immunities: [] };
				break;

			case "flying":
				traits = { resistances: ["fighting", "bug", "grass"],
				  weaknesses: ["rock", "electric", "ice"],
				  immunities: ["ground"] };
				break;

			case "poison":
				traits = { resistances: ["fighting", "poison", "bug", "fairy","grass"],
				  weaknesses: ["ground", "psychic"],
				  immunities: [] };
				break;

			case "ground":
				traits = { resistances: ["poison", "rock"],
				  weaknesses: ["water", "grass", "ice"],
				  immunities: ["electric"] };
				break;

			case "rock":
				traits = { resistances: ["normal", "flying", "poison", "fire"],
				  weaknesses: ["fighting", "ground", "steel", "water", "grass"],
				  immunities: [] };
				break;

			case "bug":
				traits = { resistances: ["fighting", "ground", "grass"],
				  weaknesses: ["flying", "rock", "fire"],
				  immunities: [] };
				break;

			case "ghost":
				traits = { resistances: ["poison", "bug"],
				  weaknesses: ["ghost","dark"],
				  immunities: ["normal", "fighting"] };
				break;

			case "steel":
				traits = { resistances: ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
				  weaknesses: ["fighting", "ground", "fire"],
				  immunities: ["poison"] };
				break;

			case "fire":
				traits = { resistances: ["bug", "steel", "fire", "grass", "ice", "fairy"],
				  weaknesses: ["ground", "rock", "water"],
				  immunities: [] };
				break;

			case "water":
				traits = { resistances: ["steel", "fire", "water", "ice"],
				  weaknesses: ["grass", "electric"],
				  immunities: [] };
				break;

			case "grass":
				traits = { resistances: ["ground", "water", "grass", "electric"],
				  weaknesses: ["flying", "poison", "bug", "fire", "ice"],
				  immunities: [] };
				break;

			case "electric":
				traits = { resistances: ["flying", "steel", "electric"],
				  weaknesses: ["ground"],
				  immunities: [] };
				break;

			case "psychic":
				traits = { resistances: ["fighting", "psychic"],
				  weaknesses: ["bug", "ghost", "dark"],
				  immunities: [] };
				break;

			case "ice":
				traits = { resistances: ["ice"],
				  weaknesses: ["fighting", "fire", "steel", "rock"],
				  immunities: [] };
				break;

			case "dragon":
				traits = { resistances: ["fire", "water", "grass", "electric"],
				  weaknesses: ["dragon", "ice", "fairy"],
				  immunities: [] };
				break;

			case "dark":
				traits = { resistances: ["ghost", "dark"],
				  weaknesses: ["fighting", "fairy", "bug"],
				  immunities: ["psychic"] };
				break;

			case "fairy":
				traits = { resistances: ["fighting", "bug", "dark"],
				  weaknesses: ["poison", "steel"],
				  immunities: ["dragon"] };
				break;
		}

		return traits;
	}
    


    this.consolidateTraits = function() {
        let consolidatedTraits = {
            weaknesses: [],
            resistances: [],
            immunities: []
        };

        this.types.forEach(type => {
            let traits = this.getTypeTraits(type);

            traits.weaknesses.forEach(weakness => {
                if (!consolidatedTraits.weaknesses.includes(weakness)) {
                    consolidatedTraits.weaknesses.push(weakness);
                }
            });

            traits.resistances.forEach(resistance => {
                if (!consolidatedTraits.resistances.includes(resistance)) {
                    consolidatedTraits.resistances.push(resistance);
                }
            });

            traits.immunities.forEach(immunity => {
                if (!consolidatedTraits.immunities.includes(immunity)) {
                    consolidatedTraits.immunities.push(immunity);
                }
            });
        });

        consolidatedTraits.weaknesses = consolidatedTraits.weaknesses.filter(weakness => !consolidatedTraits.resistances.includes(weakness));
        consolidatedTraits.resistances = consolidatedTraits.resistances.filter(resistance => !consolidatedTraits.weaknesses.includes(resistance));

        return consolidatedTraits;
    };

    this.traits = this.consolidateTraits();

    this.getBattleRating = function(){;

		if(! opponent){
			return 0;
		}

		return Math.floor( (500 * ((opponent.hp - opponent.currentHp) / opponent.hp)) + (500 * (self.hp / self.currentHp)))
	}

    // Include any other methods or properties that are required for a Pokemon
    // in the context of the Battle class. For instance, if each Pokemon needs
    // to have a method to perform an attack, you should include that here.
    this.getPokemonIdFromJson = function () {
        var searchPokemon = pokemonList.findIndex(pokemon => pokemon.speciesName == species);

        return searchPokemon;
    }
    this.pokemonId = this.getPokemonIdFromJson()

    this.getFastMoveArray = function(){

        var fastMoves = []
        
        fastMovesArray.forEach(move => {
            var localMoveId = moveList.findIndex(m => m.moveId == move);
            var moveObject = moveList[localMoveId]
            fastMoves.push(moveObject);
        });

        return fastMoves;
    }

    this.fastMoves = this.getFastMoveArray(); // Now this will be an array



    this.getChargedMoveArray = function () {

        var chargedMoves = []

        this.chargedMovesArray.forEach(move => {
            var moveId = moveList.findIndex(m => m.moveId == move);
            var moveObject = moveList[moveId]
            chargedMoves.push(moveObject);
        });

        return chargedMoves
    }

    this.chargedMoves = this.getChargedMoveArray();


   this.getAllTypes = function () {
		var types = ["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"];

        console.log(types);
		return types;
	}

    this.calculateEffectiveness = function (moveType) {
        // Using getEffectiveness function by passing getTypeTraits method as an argument
        return getEffectiveness(moveType, this.types, this.getTypeTraits.bind(this));
    };
  
}

// Usage
var pokemon1 = new Pokemon(
    pokemonList[searchPokemon1]["speciesName"], 
    pokemonList[searchPokemon1]["types"], 
    pokemonList[searchPokemon1]["fastMoves"],
    pokemonList[searchPokemon1]["chargedMoves"],
    pokemonList[searchPokemon1]["baseStats"].atk, 
    pokemonList[searchPokemon1]["baseStats"].def,
    pokemonList[searchPokemon1]["baseStats"].hp,
    100, 
    1, 
    [0, 0],
    0,
    pokemon2);

var pokemon2 = new Pokemon(
    pokemonList[searchPokemon2]["speciesName"], 
    pokemonList[searchPokemon2]["types"],
    pokemonList[searchPokemon2]["fastMoves"],
    pokemonList[searchPokemon2]["chargedMoves"],
    pokemonList[searchPokemon2]["baseStats"].atk, 
    pokemonList[searchPokemon2]["baseStats"].def,
    pokemonList[searchPokemon2]["baseStats"].hp,
    100, 
    1, 
    [0, 0],
    0,
    pokemon1);


var battle = new Battle(pokemon1, pokemon2);
console.log(pokemon1);
console.log(battle.simulate());

// Extract the list of shadow Pokémon names from gameMasterJSON
const shadowPokemonNames = gameMasterJSON.shadowPokemon;

// Filter the list of Pokémon to omit those with "shadow" or "mega" in their speciesId
const filteredPokemon = gameMasterJSON.pokemon.filter(pokemon => {
    // Check if the speciesId contains "shadow" or "mega" (case-sensitive)
    if (pokemon.speciesId.includes('shadow') || pokemon.speciesId.includes('mega')) {
        return false;
    }
    return true;
});

// Save the filtered Pokémon list to a file
fs.writeFileSync('filteredPokemon.json', JSON.stringify(filteredPokemon, null, 2));


const filteredMoves = gameMasterJSON.moves;

fs.writeFileSync('filteredMoves.json', JSON.stringify(filteredMoves, null, 2));

