import loadPokemonData from "./loadPokemonData.js";

export async function main(pokemonString) {
    console.log(pokemonString);
    try {
        // Load data for a specific Pokemon
        const testData = await loadPokemonData(pokemonString);

        // Get the top 10 best and worst matchups
        const top10Best = getTopMatchups(testData, true);
        const top10Worst = getTopMatchups(testData, false);


        // Log the results
        return { 
            best: top10Best, 
            worst: top10Worst 
        };


    } catch (error) {
        console.error("An error occurred: ", error);
    }
}

// Call the main function
// let dataPackage = main("pikachu");
// dataPackage.then(result => {
//     for (let i = 0; i < result.best.length; i++) {
//         console.log(result.best[i]["Pokemon"]);
//     }
// }).catch(error => {
//     console.error("An error occurred:", error);
// });

// console.log(typeof(dataPackage));

function getTopMatchups(pokemonData, bestToWorst = true) {
    // Sort the data based on Battle Rating
    let sortedData = pokemonData.sort((a, b) => {
        let ratingA = parseInt(a['Battle Rating'], 10);
        let ratingB = parseInt(b['Battle Rating'], 10);
        return bestToWorst ? ratingB - ratingA : ratingA - ratingB;
    });

    // Return the top 10 matchups
    return sortedData.slice(0, 10);
}