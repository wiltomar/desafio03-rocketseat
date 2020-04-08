import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const resp = await api.get('/repositories');
        
        setRepositories(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const repository = {
        url: 'https://github.com/wiltomar/desafio03',
        title: 'Terceiro desafio GoStack - Conhecendo o Reactjs',
        techs: ['JavaScript', 'Reactjs', 'Node.js']
      };

      const resp = await api.post('/repositories', repository);

      setRepositories([...repositories, resp.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter((repository) => repository.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
