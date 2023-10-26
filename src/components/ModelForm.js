import React, { useState, useEffect } from 'react';

import BrandForm from './BrandForm';

function ModelForm({ onCancel, onSave }) {
    const [formData, setFormData] = useState({
        nome: '',
        marca_id: '',
        valor_fipe: '',
    });

    const [marcas, setMarcas] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({
        nome: '',
        marca_id: '',
        valor_fipe: '',
    });

    const [showModelForm, setShowModelForm] = useState(true);
    const [showMarcaForm, setShowMarcaForm] = useState(false);

    useEffect(() => {
        // Busque a lista de marcas do backend
        fetch('http://localhost:8080/marca')
            .then(response => response.json())
            .then(data => {
                setMarcas(data);
            })
            .catch(error => console.error('Erro ao buscar marcas:', error));
    }, []);

    useEffect(() => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        const isFormValid = Object.values(formData).every(value => value !== '');
        setFormValid(isFormValid);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNewMarcaClick = () => {
        setShowModelForm(false);
        setShowMarcaForm(true);
    };

    const handleNewMarcaClose = () => {
        setShowMarcaForm(false);
        setShowModelForm(true);
    };

    const handleMarcaSave = () => {
        fetch('http://localhost:8080/marca')
            .then(response => response.json())
            .then(data => {
                setMarcas(data);
            })
            .catch(error => console.error('Erro ao buscar marcas:', error));

        // Restaure o formulário de veículo e oculte o formulário de modelo
        setShowMarcaForm(false);
        setShowModelForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValid) {
            // Envie a solicitação POST para criar o novo modelo
            fetch('http://localhost:8080/modelo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Novo modelo criado com sucesso:', data);
                    onSave(data);
                })
                .catch(error => console.error('Erro ao criar novo modelo:', error));
        } else {
            // Se o formulário não for válido, exiba mensagens de erro
            const newErrors = {
                nome: formData.nome ? '' : 'Campo obrigatório *',
                marca_id: formData.marca_id ? '' : 'Campo obrigatório *',
                valor_fipe: formData.valor_fipe ? '' : 'Campo obrigatório *',
            };
            setErrors(newErrors);
        }
    };

    return (
        <div>
            {showModelForm ? (
                <form onSubmit={handleSubmit}>
                    <h2>Cadastro de Modelo</h2>
                    <div>
                        <label>Nome:</label>
                        <div className="error">{errors.nome}</div>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Marca:</label>
                        <div className="error">{errors.marca_id}</div>
                        <select
                            name="marca_id"
                            value={formData.marca_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione uma marca</option>
                            {marcas.map(marca => (
                                <option key={marca.id} value={marca.id}>{marca.nome_marca}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Valor FIPE:</label>
                        <div className="error">{errors.valor_fipe}</div>
                        <input
                            type="number"
                            name="valor_fipe"
                            value={formData.valor_fipe}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={handleNewMarcaClick}>Nova Marca</button>
                        <div className="button-container right">
                            <button className="cancel" type="button" onClick={onCancel}>Cancelar</button>
                            <button className="new" type="submit">Adicionar Modelo</button>
                        </div>
                    </div>
                </form>
            ) : null}
            {showMarcaForm && (
                <BrandForm onCancel={handleNewMarcaClose} onSave={handleMarcaSave} />
            )}
        </div>
    );
}

export default ModelForm;
