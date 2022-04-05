import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PokemonCard = styled.h1`
  width: 150px;
  height: 250px;
  border-radius: 10px;
  margin: 30px;
  box-shadow: 10px 10px 6px #b6b3b3;
`;
const Card = styled.h1`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 9%;
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
  const [pokemons, setPokemons] = useState([]);

  const getProfileAndColor = async (id) => {
    const color = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    const img = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${id}`);

    return {
      img: img.data,
      color: color.data,
    };
  };

  const getPokemons = async () => {
    const pokData = await axios.get(
      `https://pokeapi.co/api/v2/pokedex/5/?limit=20&offset=20`
    );
    let pokArray = [];

    for (let i = 0; i < pokData.data.pokemon_entries.length; i++) {
      const colorAndProfile = await getProfileAndColor(
        pokData.data.pokemon_entries[i].entry_number
      );


      pokArray.push({
        ...pokData.data.pokemon_entries[i],
        ...colorAndProfile,
      });
    }
    setPokemons(pokArray);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <Header>Pokedex</Header>
      <Card>
        {pokemons.map((pokemon, index) => {
          return (
            <PokemonCard
              key={index}
              style={{
                backgroundColor: `${pokemon.color.color.name}`,
                opacity: 0.7,
              }}
            >
              <Square>
                <img width={150} src={pokemon.img.sprites.back_default} />
              </Square>
              <Title>{pokemon.pokemon_species.name.toUpperCase()}</Title>
              <Number>{pokemon.entry_number}</Number>
            </PokemonCard>
          );
        })}
      </Card>
    </>
  );
};
export default PokemonComponent;
