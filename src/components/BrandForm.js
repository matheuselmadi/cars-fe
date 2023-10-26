import React, { useState, useEffect } from 'react';

function BrandForm({ onCancel, onSave }) {
    const [formData, setFormData] = useState({
        nome_marca: '',
    });

    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({
        nome_marca: '',
    });

    useEffect(() => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        const isFormValid = Object.values(formData).every(value => value !== '');
        setFormValid(isFormValid);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValid) {
            fetch('http://localhost:8080/marca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Nova marca criada com sucesso:', data);
                    onSave(data);
                })
                .catch(error => console.error('Erro ao criar nova marca:', error));
        } else {
            // Se o formulário não for válido, exiba mensagens de erro
            const newErrors = {
                nome_marca: formData.nome_marca ? '' : 'Campo obrigatório *',
            };
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Marca</h2>
            <div>
                <label>Nome:</label>
                <div className="error">{errors.nome_marca}</div>
                <input
                    type="text"
                    name="nome_marca"
                    value={formData.nome_marca}
                    onChange={handleInputChange}
                />
            </div>
            <div className="button-container">
                <button className="cancel" type="button" onClick={onCancel}>Cancelar</button>
                <button className="new" type="submit">Adicionar Marca</button>
            </div>
        </form>
    );
}

export default BrandForm;
