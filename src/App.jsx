import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [input, setInput] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  async function getPokemonList() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;

    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError("Error fetching Pokémon list");
        setPokemonList([]);
      } else {
        setPokemonList(data.results);
        setError("");
      }
    } catch (error) {
      setError("Error fetching Pokémon list");
      setPokemonList([]);
    }

    setLoading(false);
  }

  async function getPokemon() {
    if (!input) return;

    const url = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;

    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError("Pokémon not found");
        setPokemon(null);
      } else {
        setPokemon(data);
        console.log(data);
        setError("");
      }
    } catch (error) {
      setError("Error fetching Pokémon");
      setPokemon(null);
    }

    setLoading(false);
  }

  return (
    <>
    <div className="pokemon-app">
    <h1>Ash's Pokedex</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div className="pokemon">
          <h2>Hi, I'm {pokemon.name}</h2>
          {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} /> */}
          <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
        </div>
      )}

      {pokemonList.length === 0 ? (
        <button onClick={getPokemonList}>Load Pokémon List</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <select value={input} onChange={handleChange}>
            {pokemonList.map((poke) => (
              <option key={poke.name} value={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>
          <button type="submit">Check</button>
        </form>
      )}
    </div>
    </>
  );
}

export default App;
