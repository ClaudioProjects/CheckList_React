import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

export default function Form({ handleChange, handleSubmit, novaTarefa }) {
  return (
    <form
      action="#"
      className=" mt-6 flex justify-center items-center mb-4 w-11/12 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="w-11/12">
        <input
          id=" inputName"
          className="w-full outline-0 rounded-md shadow-md p-2 labelInput focusInput"
          onChange={handleChange}
          type="text"
          placeholder="Nome"
          autoComplete="off"
          value={novaTarefa}
        />
      </div>
      <button className="mt-1 ml-2 w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md rounded-lg text-white text-2xl flex justify-center items-center" type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.defaultProps = {
  novaTarefa: '',
};

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  novaTarefa: PropTypes.string,
};
