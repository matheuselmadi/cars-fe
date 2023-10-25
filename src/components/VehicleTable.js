import React from 'react';

function VehicleTable({ vehicles, onEdit }) {
  return (
    <table className="vehicle-list">
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ano</th>
          <th>Combustível</th>
          <th>Portas</th>
          <th>Cor</th>
          <th>Valor</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.brand}</td>
            <td>{vehicle.nome_modelo}</td>
            <td>{vehicle.ano}</td>
            <td>{vehicle.combustivel}</td>
            <td>{vehicle.num_portas}</td>
            <td>{vehicle.cor}</td>
            <td>{vehicle.valor}</td>
            <td>
              <button onClick={() => onEdit(vehicle)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehicleTable;
