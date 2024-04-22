import React, { useState, useEffect } from 'react'; // Import React and Hooks

import { BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts';
import axios from 'axios';

const Status = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (pokemonId) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonData(response.data);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonData) {
      const stats = [
        { name: 'HP', value: pokemonData.stats[0].base_stat },
        { name: 'Attack', value: pokemonData.stats[1].base_stat },
        { name: 'Sp. Attack', value: pokemonData.stats[4].base_stat },
        { name: 'Defense', value: pokemonData.stats[2].base_stat },
        { name: 'Sp. Defense', value: pokemonData.stats[5].base_stat },
        { name: 'Speed', value: pokemonData.stats[3].base_stat },
      ];
      setStatsData(stats);
    }
  }, [pokemonData]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stats-graph">
      <BarChart width={500} height={300} data={statsData}>
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#88e534" />
      </BarChart>
    </div>
  );
};

export default Status;
