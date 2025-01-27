import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [nonOverlappingTasks, setNonOverlappingTasks] = useState([]);

  function addTask() {
    if (taskName && startTime && endTime) {
      const newTask = { taskName, startTime, endTime };
      const updatedTasks = [...tasks, newTask].sort((a, b) => a.startTime.localeCompare(b.startTime));
      setTasks(updatedTasks);
      clearInputs();
    }
  }

  function clearInputs() {
    setTaskName('');
    setStartTime('');
    setEndTime('');
  }

  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, right);
    }
  }

  function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (arr[j].endTime.localeCompare(pivot.endTime) < 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  function sortTasksByEndTime() {
    const sortedTasks = [...tasks];
    quickSort(sortedTasks);
    setTasks(sortedTasks);
  }

  function filterNonOverlappingTasks() {
    const sortedTasks = [...tasks].sort((a, b) => a.endTime.localeCompare(b.endTime));
    const result = [];
    let lastEndTime = '';

    sortedTasks.forEach(task => {
      if (task.startTime >= lastEndTime) {
        result.push(task);
        lastEndTime = task.endTime;
      }
    });

    setNonOverlappingTasks(result);
  }

  return (
    <>
      <div id='head'>
        Room Schedule Manager
      </div>
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nome da Tarefa"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Horário de Início"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="Horário de Término"
        />
        <button onClick={addTask}>Adicionar atividade</button>
      </div>
      <h2>Atividades da sala</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className='task-item'>
            {`${task.taskName} - Início: ${task.startTime} - Término: ${task.endTime}`}
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={sortTasksByEndTime}>Ordenar lista</button>
      <button onClick={filterNonOverlappingTasks}>Mostrar Atividades organizadas</button>
      <h2>Melhor organização da sala:</h2>
      <ul>
        {nonOverlappingTasks.map((task, index) => (
          <li key={index} className='task-item'>
            {`${task.taskName} - Início: ${task.startTime} - Término: ${task.endTime}`}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
