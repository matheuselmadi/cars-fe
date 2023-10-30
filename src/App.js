import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import VehicleList from './components/VehicleList';
import CarForm from './components/CarForm';

import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    // Faça uma solicitação ao backend para obter os dados dos veículos
    const socket = io('52.67.153.18:8080/cars/all');
    socket.on('data', (data) => {
      setVehicles(data);
      setLoading(false);
    });
    return () => {
      socket.disconnect(); // Desconecte-se ao desmontar o componente
    };
  }, []);

  const handleAddCar = (newCar) => {
    if (editingVehicle) {
      // Atualize o veículo existente na lista
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === newCar.id ? newCar : vehicle
        )
      );
      setEditingVehicle(null);
    } else {
      // Adicione o novo veículo à lista
      setVehicles([...vehicles, newCar]);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
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
        <button onClick={() => { setShowForm(true); setEditingVehicle(null); }}>Novo Veículo</button>
      )}
      {showForm ? (
        <CarForm onAddCar={handleAddCar} setShowForm={setShowForm} vehicleToEdit={editingVehicle} />
      ) : (
        <VehicleList vehicles={vehicles} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;
