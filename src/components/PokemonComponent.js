import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const PokemonCard = styled.h1`
  width: 100px;
  height: 200px;
  border-radius: 10px;
  margin: 30px;
  box-shadow: 6px 6px #b6b3b3;
`;
const Card = styled.h1`
display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
font-size: 14px;
`;


const PokemonComponent = () => {
const [ pokemons , setPokemons] = useState();
const [colors , setColors] = useState();
const [img ,setImg] = useState();
const [id , setId] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokedex/${1}`).then((response) => {
            setPokemons(response.data);
        });
    },[]);


    // const getRandomNumber = () => {
    //     return Math.floor(Math.random() * (99 - 0 + 1))
    // }
    // if (pokemons.pokemon_entries){
    //     setId(pokemons.pokemon_entries[0].map(pokemon => pokemon.entry_number)
    // }


    useEffect(() => {
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${2}`).then((response) => {
                setColors(response.data);
            });

        axios.get(`https://pokeapi.co/api/v2/pokemon-form/${2}`).then((response) => {
            setImg(response.data);
        });
    },[]);


    return(
        <Card>
            {pokemons.pokemon_entries?.map((pokemon , index )=> {
                return (
                    <PokemonCard key={index}  style={{backgroundColor : `${colors.color.name}`}}>
                        <img src={img.sprites.back_default} />
                        <Title>{pokemon.pokemon_species.name}</Title>
                        <Title>{pokemon.entry_number}</Title>
                    </PokemonCard>
                )
            })}

        </Card>
    )
}
export default PokemonComponent;