import { useState } from 'react';
import './App.css'


function App() {

  return (
    <>
      <div id='head' >
        Room Schedule Manager
      </div>
      <div>
        <input type="text" id="taskName" placeholder="Nome da Tarefa" />
        <input type="time" id="startTime" placeholder="Horário de Início" />
        <input type="time" id="endTime" placeholder="Horário de Término" />
        <button onclick="addTask()">Add Class</button>
      </div>
      <h2>Classes</h2>
      <ul id="taskList"></ul>
      <button onclick="sortTasksByEndTime()">Ordenar por Horário de Término</button>
    </>
  )
}

export default App
