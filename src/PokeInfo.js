import Status from './Status';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Style from './style.css';
const typeIcons = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  eletric: 13,
  psyquic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,    
}


const App = () => {
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const handleInputChange = (event) => {
    const newPokemonId = (event.target.value); // Convert input to number
    if (newPokemonId >= 0 && newPokemonId <= 1025) {
      // Valid input, update state
      setPokemonId(newPokemonId);
    } else {
      // Invalid input, reset state
      setPokemonId('');
    }
  };
  const fetchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => {
        setPokemonData(response.data);
        const abilities = response.data.abilities.map(ability => {
          return {
            name: ability.ability.name,
            description: ability.ability.effect_short
          };
        });
        setPokemonAbilities(abilities);
        const types = response.data.types.map(type => type.type.name);
        setPokemonTypes(types);
      })
      .catch(() => {
        setPokemonData(null); // Handle errors (optional: display a message)
      });
  };
  useEffect(() => {
    fetchPokemon();
  }, [pokemonId]); // Re-fetch data when pokemonId changes
console.log(pokemonTypes)
  
  return (
    <div>
      <div id='pesquisa'>
        <form onSubmit={(event) => {
        event.preventDefault();
        fetchPokemon();
      }}>
        <input id='botaoPesquisa' type="text" value={pokemonId} onChange={handleInputChange} />
        <button type="submit">Buscar Pokémon</button>
      </form>
      <button id='botaoShiny' onClick={() => setIsShiny(!isShiny)}>
            {isShiny ? 'Desativar Shiny' : 'Ativar Shiny'}
          </button>
      </div>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
            alt={`Imagem do Pokémon ${pokemonData.name}`}
            onError={(event) => {
            }}
          />
        </div>
      )}
      {pokemonData && (
            <div className="type-icons">
               {pokemonTypes.map(typeName => (
                 <div className="type-icon" key={typeName}>
                   <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${typeIcons[typeName]}.png`} alt={`${typeName} type icon`} />
                 </div>
               ))}
           </div>
      )}
      {pokemonData && <Status pokemonId={pokemonId} />}
      
      {pokemonData && (
               <div className="pokemon-abilities">
               {pokemonAbilities.map(ability => (
                 <div className="ability" key={ability.name}>
                   <h3>{ability.name}</h3>
                   <p>{ability.description}</p>
                 </div>
               ))}
             </div>
      )}
    </div>
  );
};


export default App;