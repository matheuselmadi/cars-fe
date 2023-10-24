import React, { useState, useEffect } from 'react';

import VehicleList from './components/VehicleList';
import CarForm from './components/CarForm';

import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário

  useEffect(() => {
    // Faça uma solicitação ao backend para obter os dados dos veículos
    fetch('http://localhost:8080/cars/all')
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos veículos:', error);
      });
  }, []);

  // const handleNewCarClick = () => {
  //   setShowForm(true); // Quando o botão "Novo Carro" é clicado, exibe o formulário
  // };

  // Função para lidar com a adição de um novo carro
  const handleAddCar = (newCar) => {
    // Atualize a lista de veículos com o novo carro
    setVehicles([...vehicles, newCar]);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading-container">
      <div className="loading">Carregando</div>
    </div>;
  }

  return (
    <div className="app">
      <h1>Lista de Veículos Agrupada por Marca</h1>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Novo Veículo</button>
      )}
      {showForm ? (
        <CarForm onAddCar={handleAddCar} setShowForm={setShowForm} />
      ) : (
        <VehicleList vehicles={vehicles} />
      )}
    </div>
  );
}

export default App;
