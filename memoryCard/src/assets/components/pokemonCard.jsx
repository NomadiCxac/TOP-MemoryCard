import typeIcons from "../functions/typeIcons";
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from "../functions/helperFunctions";

function PokemonCard({
    isSelected,
    isShadow,
    pokemonName,
    pokemonSprite,
    pokemonShinySprite,
    pokemonTypeOne,
    pokemonTypeTwo,
    onCardClick
  }) {
    // Determine if the Pokemon has a second type to display or not
    let monotype = !pokemonTypeTwo;
    // Append "(Shadow)" to the name if it is a shadow Pokemon
    let displayName = isShadow ? `${pokemonName} (Shadow)` : pokemonName;
  
    const typeOneIcon = typeIcons[pokemonTypeOne];
    const typeTwoIcon = pokemonTypeTwo ? typeIcons[pokemonTypeTwo] : null;

    console.log(pokemonTypeTwo);
  
    return (
      <div className={`PokemonCard ${isSelected ? 'chosen' : ''} ${isShadow ? 'Shadow' : ""}`} onClick={onCardClick}>
        <div className="cardTopHalf">
          <h3 className="cardTitle">{capitalizeFirstLetter(displayName)}</h3>
          <div className="pokemonImageContainer">
            <div className="defaultImageContainer">
              <img src={pokemonSprite} alt={displayName} className="defaultImage"/>
            </div>
            <div className="shinyImageContainer">
              <img src={pokemonShinySprite} alt={`${displayName} shiny`} className="shinyImage"/>
            </div>
          </div>
        </div>
        <div className="cardBottomHalf">
          <div className="pokemonTypeContainer">
            {monotype ? (
              <img className="typeSymbol" src={typeOneIcon} alt={`${pokemonTypeOne} type`} />
            ) : (
              <>
                <img className="typeSymbol" src={typeOneIcon} alt={`${pokemonTypeOne} type`} />
                {typeTwoIcon && <img className="typeSymbol" src={typeTwoIcon} alt={`${pokemonTypeTwo} type`} />}
              </>
            )}
          </div>
          <div className="pokemonTypeDescription">
            <p>{capitalizeFirstLetter(pokemonTypeOne)}</p>
            {pokemonTypeTwo && pokemonTypeTwo !== "N/A" && (
                <p>{capitalizeFirstLetter(pokemonTypeTwo)}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  PokemonCard.propTypes = {
    isSelected: PropTypes.bool,
    isShadow: PropTypes.bool,
    pokemonName: PropTypes.string.isRequired,
    pokemonSprite: PropTypes.string,
    pokemonShinySprite: PropTypes.string,
    pokemonTypeOne: PropTypes.string.isRequired,
    pokemonTypeTwo: PropTypes.string,
    onCardClick: PropTypes.func,
  };
  
  export default PokemonCard;