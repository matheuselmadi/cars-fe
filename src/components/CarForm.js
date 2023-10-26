import React, { useState, useEffect } from 'react';

import ModelForm from './ModelForm';

function CarForm({ setShowForm, vehicleToEdit, onAddCar }) {
  const [formData, setFormData] = useState({
    ano: '',
    combustivel: 'FLEX',
    num_portas: 4,
    cor: '',
    modelo_id: '', // Valor do modelo selecionado
  });

  const [modelos, setModelos] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    ano: '',
    cor: '',
    modelo_id: '',
  });

  const [showModelForm, setShowModelForm] = useState(false);
  const [showCarForm, setShowCarForm] = useState(true);

  useEffect(() => {
    // Busque a lista de modelos do backend
    fetch('http://localhost:8080/modelo')
      .then(response => response.json())
      .then(data => {
        setModelos(data);
      })
      .catch(error => console.error('Erro ao buscar modelos:', error));
  }, []);

  useEffect(() => {
    if (vehicleToEdit) {
      // Preencha o formulário com os dados do veículo a ser editado
      setFormData({
        ano: vehicleToEdit.ano,
        combustivel: vehicleToEdit.combustivel,
        num_portas: vehicleToEdit.num_portas,
        cor: vehicleToEdit.cor,
        modelo_id: vehicleToEdit.modelo_id,
      });
    }
  }, [vehicleToEdit]);

  useEffect(() => {
    // Verifique se todos os campos obrigatórios estão preenchidos
    const isFormValid = Object.values(formData).every(value => value !== '');
    setFormValid(isFormValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewModelClick = () => {
    setShowCarForm(false);
    setShowModelForm(true);
  };

  const handleNewModelClose = () => {
    setShowModelForm(false);
    setShowCarForm(true);
  };

  const handleModelSave = () => {
    // Faça uma nova solicitação GET para a lista de modelos para atualizá-la
    fetch('http://localhost:8080/modelo')
      .then(response => response.json())
      .then(data => {
        setModelos(data);
      })
      .catch(error => console.error('Erro ao buscar modelos:', error));

    // Restaure o formulário de veículo e oculte o formulário de modelo
    setShowModelForm(false);
    setShowCarForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid) {
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

      if (vehicleToEdit) {

        const editCarro = {
          ...novoCarro,
          id: vehicleToEdit.id
        };

        // Se estiver em modo de edição, envie uma solicitação PUT para atualizar o veículo
        fetch(`http://localhost:8080/cars/${vehicleToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editCarro),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Veículo atualizado com sucesso:', data);
            // onAddCar(data); // Atualize o veículo na lista
            setShowForm(false); // Saia do modo de edição
            window.location.reload();
          })
          .catch((error) => console.error('Erro ao atualizar o veículo:', error));
      } else {

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
            window.location.reload();
          })
          .catch(error => console.error('Erro ao criar novo carro:', error));
      }
    } else {
      // Se o formulário não for válido, exiba mensagens de erro
      const newErrors = {
        ano: formData.ano ? '' : 'Campo obrigatório *',
        cor: formData.cor ? '' : 'Campo obrigatório *',
        modelo_id: formData.modelo_id ? '' : 'Campo obrigatório *',
      };
      setErrors(newErrors);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza de que deseja excluir este veículo?')) {
      if (vehicleToEdit) {
        fetch(`http://localhost:8080/cars/${vehicleToEdit.id}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('Veículo excluído com sucesso');
            setShowForm(false);
            window.location.reload();
          })
          .catch((error) => console.error('Erro ao excluir veículo:', error));
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Oculta o formulário quando o botão "Cancelar" é clicado
  };

  return (
    <div>
      {showCarForm ? (
        <form onSubmit={handleSubmit}>
          <h2>{vehicleToEdit ? 'Editar Veículo' : 'Cadastro de Veículo'}</h2>
          <div>
            <label>Ano:</label>
            <div className="error">{errors.ano}</div>
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
              <option value="ALCOOL">ÁLCOOL</option>
              <option value="GASOLINA">GASOLINA</option>
              <option value="DIESEL">DIESEL</option>
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
            <div className="error">{errors.cor}</div>
            <input
              type="text"
              name="cor"
              value={formData.cor}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Modelo:</label>
            <div className="error">{errors.modelo_id}</div>
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
          <div className="button-container">
            {vehicleToEdit
              ? <button className="cancel" type="button" onClick={handleDelete}>Excluir Veículo</button>
              : <button type="button" onClick={handleNewModelClick}>Novo Modelo</button>}
            <div className="button-container right">
              <button className="cancel" type="button" onClick={handleCancel}>Cancelar</button>
              <button className="new" type="submit">{vehicleToEdit ? 'Salvar Alterações' : 'Adicionar Carro'}</button>
            </div>
          </div>
        </form>
      ) : null}
      {showModelForm && (
        <ModelForm onCancel={handleNewModelClose} onSave={handleModelSave} />
      )}
    </div>
  );
}

export default CarForm;
