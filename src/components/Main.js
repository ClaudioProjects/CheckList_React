import React, { Component } from 'react';

import Form from './Form';

import Tarefas from './Tarefas';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    edit: false,
    indexEdit: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    this.setState(
      {
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      },
    );
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    const { edit } = this.state;
    let element = e.target.parentNode;
    if (!e.target.classList.contains('verifyElement')) element = element.parentNode;
    if (tarefas.length === 0) {
      this.setState({ edit: false });
    }
    if (edit === false) {
      element.parentNode.querySelector('span').innerHtml = '';
      element.parentNode.classList.toggle('focus');
      element.insertAdjacentHTML('afterend', `<input id="inputEdit" class="inputEdit" type="text" value="${tarefas[index]}" />`);
      this.setState({
        edit: true,
        indexEdit: index,
      });
      return;
    }
    try {
      const tarefaEditada = element.parentNode.querySelector('.inputEdit');
      const novasTarefas = [...tarefas];
      const { indexEdit } = this.state;
      novasTarefas[indexEdit] = tarefaEditada.value;
      this.setState({
        tarefas: novasTarefas,
        edit: false,
      });
      tarefaEditada.remove();
      element.parentNode.classList.toggle('focus');
    } catch {
      const main = document.querySelector('#main');
      const errorBox = document.createElement('span');
      errorBox.innerText = 'Edite uma tarefa por vez';
      errorBox.classList.add('errorText');
      main.appendChild(errorBox);
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  render() {
    const { tarefas, novaTarefa } = this.state;

    return (

      <div id="main" className="w-72 sm:w-96 mx-auto bg-gray-100 rounded-xl shadow-sm shadow-gray-300 font-sans">
        <div className=" h-10 pt-3">
          <h1 className=" text-2xl text-center font-medium">Lista de tarefas</h1>
        </div>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}
