import fs from 'fs/promises'; // Use promise-based version of fs
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function loadPokemonData(pokemonName) {
    // Update this line to the correct path
    const filePath = path.join(__dirname, '..', '..', 'data', 'allPokemonMatchups', `${pokemonName.toLowerCase()}-matchup.json`);
    console.log(`Loading from: ${filePath}`);

    // Return a promise that resolves with the parsed data
    return fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => {
            console.error(`Error reading file from disk: ${err}`);
            throw err; // Re-throw the error for handling it outside
        });
}

loadPokemonData("Abomasnow").then(result => {
    console.log(result);
})