

export function returnBaseName(searchString) {

    return searchString.toLowerCase().split(' ')[0]; // This will get 'ponyta' from 'Ponyta (Galarian)'

}

export function formatPokemonVariantName(searchString) {

    // console.log(typeof(searchString));
    // let baseName = searchString.toLowerCase().split(' ')[0]; // This will get 'ponyta' from 'Ponyta (Galarian)'

    const zygardeFormeMap = {
        '50% forme': '50-power-construct',
        '10% forme': '10-power-construct',
        'complete forme': 'complete',
    };

    if (searchString.includes("Shadow")) {
        searchString = searchString.replace("Shadow", "");
    }

    // Convert to lowercase
    searchString = searchString.toLowerCase();

    // Special handling for 'Zygarde' forms due to their unique naming convention
    for (const form in zygardeFormeMap) {
        if (searchString.includes(form)) {
            searchString = searchString.replace(form, zygardeFormeMap[form]);
            // If a zygarde form was replaced, we remove parenthesis that may not be necessary
            searchString = searchString.replace(/\s*\(\s*/g, '-').replace(/\s*\)\s*/g, '');
        }
        
    }

    

    // General replacement for cases not covered by special rules
    if (!searchString.includes('zygarde')) { // This check is to avoid conflicting replacements with Zygarde special handling
        searchString = searchString.replace(/\s*\(\s*/g, '-').replace(/\s*\)\s*/g, ''); // Replace parenthesis with hyphen or remove
    }

    // Replace multiple hyphens with a single hyphen if any found
    searchString = searchString.replace(/--+/g, '-');

    // Trim hyphens at the start or end of the string
    searchString = searchString.replace(/^-+|-+$/g, '');

    return searchString // This is after your replacements and trimmings.
 
}


export function fetchPokemonVariants(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`)
      .then((response) => {
        if (!response.ok) {
          console.log(`Response was not ok for ${pokemonName}`)
          switch (response.status) {
            case 404:
              throw new Error('Pokémon not found.');
            default:
              throw new Error('An error occurred. Please try again.');
          } 
        }
        return response.json();
      })
      .then((data) => {
        // Extract and return the variants here if available
        if (data.varieties) {
          // Filter out the default variety
          return data.varieties
            .filter(variety => !variety.is_default) // Exclude the default variant
            .map((variety) => ({
              name: variety.pokemon.name,
              url: variety.pokemon.url,
            }));
        }
        return []; // Return an empty array if there are no varieties or only default is present
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error.message);
        throw error; // Rethrow the error to be handled where the function is called
      });
  }
  

export function findVariantName(variants, searchString) {
    // Normalize the search string: convert to lowercase and remove parentheses for comparison
    const normalizedSearchString = formatPokemonVariantName(searchString)

    console.log(normalizedSearchString);
  
    // Find the variant object where the name matches the normalized search string
    const matchingVariant = variants.find(v => {
      // Assuming v.name is the Pokémon name, you need to normalize it the same way as the search string
      return normalizedSearchString.includes(v.name.toLowerCase());
    });
  
    // Return the found variant's URL or null if not found
    console.log(matchingVariant);
    return matchingVariant ? matchingVariant.name : returnBaseName(searchString);
  }
  
  // Example usage inside a component or function:
  // (assuming variants is an array of variant objects with 'name' and 'url' properties)
  
  
