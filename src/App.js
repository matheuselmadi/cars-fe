import React, { useState, useEffect } from 'react';
import VehicleList from './VehicleList';
import CarForm from './CarForm';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Função para lidar com a adição de um novo carro
  const handleAddCar = (newCar) => {
    // Atualize a lista de veículos com o novo carro
    setVehicles([...vehicles, newCar]);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <h1>Lista de Veículos Agrupada por Marca</h1>
      <CarForm onAddCar={handleAddCar} />
      <VehicleList vehicles={vehicles} />
    </div>
  );
}

export default App;
