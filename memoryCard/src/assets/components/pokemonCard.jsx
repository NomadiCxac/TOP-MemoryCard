import typeIcons from "../functions/typeIcons";
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from "../functions/helperFunctions";

function PokemonCard({isSelected, pokemonName, pokemonSprite, pokemonShinySprite, pokemonTypeOne, pokemonTypeTwo, onCardClick}) {
    
    let monotype = !pokemonTypeTwo; // This checks for both null and undefined


    const typeOneIcon = typeIcons[pokemonTypeOne];
    const typeTwoIcon = pokemonTypeTwo ? typeIcons[pokemonTypeTwo] : null;



    return (
        <div className={`PokemonCard ${isSelected ? 'chosen' : ''}`} id={pokemonName} onClick={onCardClick}>
            <div className="cardTopHalf">
                <h3 className="cardTitle">{capitalizeFirstLetter(pokemonName)}</h3>
                <div className="pokemonImageContainer">
                    <div className="defaultImageContainer">
                        <img src={pokemonSprite} alt={pokemonName} id={`pokemon-image-${pokemonName}`} className="defaultImage"/>
                    </div>
                    <div className="shinyImageContainer">
                        <img src={pokemonShinySprite} alt={`${pokemonName} shiny`} id={`pokemon-image-${pokemonName}-shiny`} className="shinyImage"/>
                    </div>
                </div>
            </div>

           
            <div className="cardBottomHalf">
                <div className="pokemonTypeContainer">
                    {monotype ? (
                        // Ensure you have the correct path for the image
                        <img className="typeSymbol" src={typeOneIcon} alt={`${pokemonTypeOne} type`} id={`${pokemonTypeOne}-type`} />
                    ) : (
                        <>
                            <img className="typeSymbol" src={typeOneIcon} alt={`${pokemonTypeOne} type`} id={`${pokemonTypeOne}-type`} />
                            {typeTwoIcon && <img className="typeSymbol" src={typeTwoIcon} alt={`${pokemonTypeTwo} type`} id={`${pokemonTypeTwo}-type`} />}
                        </>
                    )}
                </div>
                <div className="pokemonTypeDescription">
                    {monotype ? (
                        // Ensure you have the correct path for the image
                        <p>{capitalizeFirstLetter(pokemonTypeOne)}</p>
                    ) : (
                        <>
                            <p>{capitalizeFirstLetter(pokemonTypeOne)}</p>
                            <p>{capitalizeFirstLetter(pokemonTypeTwo)}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// Required static values to map to Pokemon Card component:

PokemonCard.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    pokemonSprite: PropTypes.string,
    pokemonShinySprite: PropTypes.string,
    pokemonTypeOne: PropTypes.string.isRequired,
    pokemonTypeTwo: PropTypes.string // Not required as it can be undefined or null
};

export default PokemonCard;