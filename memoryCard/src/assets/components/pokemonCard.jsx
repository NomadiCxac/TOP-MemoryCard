import typeIcons from "../functions/typeIcons";

function PokemonCard({pokemonName, pokemonSprite, pokemonShinySprite, pokemonTypeOne, pokemonTypeTwo}) {
    
    let monotype = !pokemonTypeTwo; // This checks for both null and undefined

    const typeOneIcon = typeIcons[pokemonTypeOne];
    const typeTwoIcon = pokemonTypeTwo ? typeIcons[pokemonTypeTwo] : null;

    return (
        <div className = {pokemonName + '-PokemonCard'}>
            <div className="cardTopHalf">
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
            </div>
        </div>
    );
}

export default PokemonCard;