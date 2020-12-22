/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import api from '../../services/api';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      // TODO ADD A NEW FOOD AND CLOSE THE MODAL
      const { name, image, description, price } = data;
      handleAddFood({
        name,
        image,
        description,
        price,
      });
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <label htmlFor="image">URL da imagem</label>
        <Input name="image" placeholder="Cole o link aqui" />
        <div style={{ display: 'flex' }}>
          <div>
            <label htmlFor="name">Nome do prato</label>
            <Input name="name" placeholder="Ex: Moda Italiana" />
          </div>
          <div>
            <label htmlFor="price">Preço</label>
            <Input name="price" placeholder="Ex: 19.90" />
          </div>
        </div>
        <label htmlFor="description">Descrição do prato</label>
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
