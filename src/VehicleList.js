import React from 'react';
import VehicleTable from './VehicleTable';

function VehicleList({ vehicles }) {
  // Função para agrupar veículos por marca
  const groupVehiclesByBrand = (vehicles) => {
    return vehicles.reduce((grouped, vehicle) => {
      const brand = vehicle.brand;
      if (!grouped[brand]) {
        grouped[brand] = [];
      }
      grouped[brand].push(vehicle);
      return grouped;
    }, {});
  };

  // Agrupe os veículos por marca
  const groupedVehicles = groupVehiclesByBrand(vehicles);

  return (
    <div>
      {Object.entries(groupedVehicles).map(([brand, brandVehicles]) => (
        <div key={brand}>
          <h2>{`Marca: ${brand}`}</h2>
          <VehicleTable vehicles={brandVehicles} />
        </div>
      ))}
    </div>
  );
}

export default VehicleList;
