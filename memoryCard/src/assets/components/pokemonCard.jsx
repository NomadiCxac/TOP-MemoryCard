import typeIcons from "../functions/typeIcons";
import { capitalizeFirstLetter } from "../functions/helperFunctions";

function PokemonCard({pokemonName, pokemonSprite, pokemonShinySprite, pokemonTypeOne, pokemonTypeTwo}) {
    
    let monotype = !pokemonTypeTwo; // This checks for both null and undefined

    const typeOneIcon = typeIcons[pokemonTypeOne];
    const typeTwoIcon = pokemonTypeTwo ? typeIcons[pokemonTypeTwo] : null;

    return (
        <div className = 'PokemonCard' id={pokemonName}>
            <div className="cardTopHalf">
                <h3 className="cardTitle">{capitalizeFirstLetter(pokemonName)}</h3>
                <div className="pokemonImageContainer">
                    <div className="defaultImageContainer">
                        <img src={pokemonSprite} alt={pokemonName} id={`pokemon-image-${pokemonName}`} />
                    </div>
                    <div className="shinyImageContainer">
                        <img src={pokemonShinySprite} alt={`${pokemonName} shiny`} id={`pokemon-image-${pokemonName}-shiny`} />
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

export default PokemonCard;