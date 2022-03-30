import React from 'react';
import PropTypes from 'prop-types';
import { FaPen, FaTimes } from 'react-icons/fa';

export default function Tarefas({ tarefas, handleDelete, handleEdit }) {
  return (
    <div className="w-full h-full flex flex-col justify-center pb-4">
      {tarefas.map((tarefa, index) => (
        <div className="tarefa relative" key={tarefa}>
          <span>{tarefa}</span>
          <div className=" float-right text-lx w-12 h-full flex justify-between items-center">
            <FaPen
              onClick={(e) => handleEdit(e, index)}
              className="cursor-pointer verifyElement"
            />
            <FaTimes onClick={(e) => handleDelete(e, index)} className=" text-red-400 text-2xl cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}

Tarefas.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  tarefas: PropTypes.array.isRequired,
};
