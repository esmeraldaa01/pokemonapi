import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const PokemonCard = styled.h1`
  width: 150px;
  height: 250px;
  border-radius: 10px;
  margin: 30px;
  box-shadow: 10px 10px 6px  #b6b3b3;
`;
const Card = styled.h1`
display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 10%;
`;

const Number = styled.h1`
font-size: 14px;
  text-align: center;
  margin-top: 20px;
  padding-top: 5px;
  margin-left: 60px;
  border-radius: 40px;
  background-color: #f5f5be;
  width: 30px;
  height: 25px;
`;
const Title = styled.h1`
font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;
const Header = styled.h1`
text-align: center;
  margin-bottom: 0px;
`;

const Square = styled.div`
background-color: white;
  border-radius: 130px;
padding-bottom: 0px;
  height: 120px;
  width: 120px;
  margin-left: 20px;
  margin-top: 10px;
`;

const PokemonComponent = () => {
const [ pokemons , setPokemons] = useState();
const [colors , setColors] = useState();
const [img ,setImg] = useState();
const [id , setId] = useState(1)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokedex/${1}`).then((response) => {
            setPokemons(response.data);
        });
    },[]);


    const getRandomNumber = () => {
        return Math.floor(Math.random() * (99 - 0 + 1))
    }
    // if (pokemons.pokemon_entries){
    //     setId(pokemons.pokemon_entries[0].map(pokemon => pokemon.entry_number)
    // }


    useEffect(() => {
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${getRandomNumber()}`).then((response) => {
                setColors(response.data);
            });

        axios.get(`https://pokeapi.co/api/v2/pokemon-form/${getRandomNumber()}`).then((response) => {
            setImg(response.data);
        });
    },[getRandomNumber()]);


    return(
        <>
            <Header>Pokedex</Header>
        <Card>
            {pokemons.pokemon_entries?.map((pokemon ,index )=> {
                console.log(index, 'index')
                return (
                    <PokemonCard key={index}  style={{backgroundColor : `${colors.color.name}`, opacity:0.8}}>
                        <Square><img width={150} src={img.sprites.back_default} />
                        </Square>
                        <Title>{pokemon.pokemon_species.name.toUpperCase()}</Title>
                        <Number>{pokemon.entry_number}</Number>
                    </PokemonCard>
                )
            })}

        </Card>
            </>
    )
}
export default PokemonComponent;