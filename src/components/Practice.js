import React, {useEffect, useState} from "react";
import axios from "axios";

const Practice = () => {
const [pokemons , setPokemons] = useState([])

    const addPokemon  = async () => {
        const pokemon = {name: 'esme'}
        const result = await  axios.post('https://pokeapi.co/api/v2/pokemon', pokemon)
            .then(response => setPokemons(response.data));
        setPokemons(result.data)
    }

    useEffect(() => {
        addPokemon();
    }, []);

    console.log(pokemons.data , 'p')
    return (
        <div>
            Pokedex
        </div>
    )
}
export default Practice;