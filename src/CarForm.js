import React, { useState, useEffect } from 'react';

function CarForm() {
  const [formData, setFormData] = useState({
    ano: '',
    combustivel: 'FLEX',
    num_portas: 4,
    cor: '',
    modelo_id: '', // Valor do modelo selecionado
  });

  const [modelos, setModelos] = useState([]);
  
  useEffect(() => {
    // Busque a lista de modelos do backend
    fetch('http://localhost:8080/modelo')
      .then(response => response.json())
      .then(data => {
        setModelos(data);
      })
      .catch(error => console.error('Erro ao buscar modelos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gere a data atual no formato adequado
    const dataCadastro = new Date().toISOString();
    
    // Crie o objeto do novo carro
    const novoCarro = {
      ano: formData.ano,
      combustivel: formData.combustivel,
      cor: formData.cor,
      modelo_id: formData.modelo_id,
      num_portas: formData.num_portas,
      timestamp_cadastro: dataCadastro,
    };

    // Envie a solicitação POST para criar o novo carro
    fetch('http://localhost:8080/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoCarro),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Novo carro criado com sucesso:', data);
      // Limpe o formulário ou faça outra ação desejada após a criação do carro
    })
    .catch(error => console.error('Erro ao criar novo carro:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ano:</label>
        <input
          type="number"
          name="ano"
          value={formData.ano}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Combustível:</label>
        <select
          name="combustivel"
          value={formData.combustivel}
          onChange={handleInputChange}
        >
          <option value="FLEX">FLEX</option>
          {/* Adicione outras opções de combustível, se aplicável */}
        </select>
      </div>
      <div>
        <label>Número de Portas:</label>
        <input
          type="number"
          name="num_portas"
          value={formData.num_portas}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cor:</label>
        <input
          type="text"
          name="cor"
          value={formData.cor}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Modelo:</label>
        <select
          name="modelo_id"
          value={formData.modelo_id}
          onChange={handleInputChange}
        >
          <option value="">Selecione um modelo</option>
          {modelos.map(modelo => (
            <option key={modelo.id} value={modelo.id}>{modelo.nome}</option>
          ))}
        </select>
      </div>
      <button type="submit">Adicionar Carro</button>
    </form>
  );
}

export default CarForm;
