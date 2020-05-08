//dependencias
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import nextId from 'react-id-generator'
import { reorder } from 'react-reorder';

//componentes
import Nav from './components/Nav'
import PendingTasks from './components/PendingTasks';
import CompletedTasks from './components/CompletedTasks';
import EditTask from './components/EditTask';
import Timer from './components/Timer';
import Graph from './components/Graph'

//servicio backend
import taskService from './services/tasks'

//rutas
import * as ROUTES from './constants/routes'

//estilos
import './style/index.css'

const App = () => {

  //tareas
  const [tasks, setTasks] = useState([])

  //estado de inputs
  //titulo de tarea
  const [newTask, setNewTask] = useState('')
  //descripcion
  const [newDescription, setNewDescription] = useState('')
  //horas
  const [newHour, setNewHour] = useState('')
  //minutos
  const [newMinute, setNewMinute] = useState('')

  //estado del filtro
  const [filter, setFilter] = useState('all')

  //controlador de pantalla de detalles de tarea
  const [details, setDetails] = useState({
    display: false,
    id: '',
    title: '',
    description: '',
    completed: false,
    duration: {
      hours: 0,
      minutes: 0,
    }
  })

  //controlador de pantalla de timer
  const [timer, setTimer] = useState({
    display: false,
    title: '',
    hours: 0,
    minutes: 0
  })

  //controlador de grafica
  const [graphData, setGraphData] = useState([
    { firstDayOfWeek: 0 },
    [
      { daysOfWeek: 1, completedTasks: 0 },
      { daysOfWeek: 2, completedTasks: 0 },
      { daysOfWeek: 3, completedTasks: 0 },
      { daysOfWeek: 4, completedTasks: 0 },
      { daysOfWeek: 5, completedTasks: 0 },
      { daysOfWeek: 6, completedTasks: 0 },
      { daysOfWeek: 7, completedTasks: 0 },
    ]
  ])

  //cuando el componente es montado verifica si el dia actual corresponde a la semana que 
  //se ha estado graficando. Si no es asi, resetea la grafica.
  useEffect(() => {

    //obtiene las tareas de api
    taskService
      .getAll()
      .then(initialTasks => {
        setTasks(initialTasks)
      })

    let d = new Date()
    let firstDayOfWeek = getMonday()

    if (d.getDay() - firstDayOfWeek > 6) {
      setGraphData([
        graphData[0],
        [
          { daysOfWeek: 1, completedTasks: 0 },
          { daysOfWeek: 2, completedTasks: 0 },
          { daysOfWeek: 3, completedTasks: 0 },
          { daysOfWeek: 4, completedTasks: 0 },
          { daysOfWeek: 5, completedTasks: 0 },
          { daysOfWeek: 6, completedTasks: 0 },
          { daysOfWeek: 7, completedTasks: 0 },
        ]
      ])
    }

    setGraphData([
      { firstDayOfWeek: firstDayOfWeek },
      graphData[1]
    ])

  }, [])

  //determina el primer dia de la semana
  const getMonday = () => {
    let d = new Date()
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return diff;
  }

  //controladores de inputs de detalles de tarea
  const handleNewTask = event => {
    setNewTask(event.target.value)
  }

  const handleNewDescription = event => {
    setNewDescription(event.target.value)
  }

  const handleNewHour = event => {
    setNewHour(Number(event.target.value))
  }

  const handleNewMinute = event => {
    setNewMinute(Number(event.target.value))
  }

  //agregar nueva tarea a la lista
  const addTask = event => {

    event.preventDefault()

    const taskObject = {
      id: nextId(),
      title: newTask,
      description: '',
      completed: false,
      duration: {
        hours: 0,
        minutes: 30,
      }
    }

    taskService
      .create(taskObject)
      .then(returnedTask => {
        setTasks(tasks.concat(returnedTask))
        setNewTask('')
      })

  }

  //marcar una tarea pendiente como completada
  const markComplete = (id) => {

    //si la pantalla de detalles se encuentra abierta, la cierra
    if (details.display) {
      toggleDetails(id)
    }

    const task = tasks.find(t => t.id === id)
    const changedTask = {
      ...task,
      completed: !task.completed
    }

    taskService
      .update(id, changedTask)
      .then(returnedTask => {
        setTasks(tasks.map(task => task.id !== id ? task : returnedTask))
      })
      .catch(error => {
        alert('already deleted from db')
        setTasks(tasks.filter(t => t.id !== id))
      })

    updateGraphData()

  }

  //abre o cierra la pantalla de detalles de tarea
  const toggleDetails = (id) => {

    const currentTask = tasks.filter(t => t.id === id)

    //si estaba cerrada, la abre y llena los campos con los datos de la tarea seleccionada
    if (!details.display) {
      setDetails({
        display: !details.display,
        ...currentTask
      })
      setNewTask(currentTask[0].title)
      setNewDescription(currentTask[0].description)
      setNewHour(currentTask[0].duration.hours)
      setNewMinute(currentTask[0].duration.minutes)
    } else {
      setDetails({
        display: !details.display,
        id: '',
        title: '',
        description: '',
        duration: {
          hours: 0,
          minutes: 0,
        },
      })
      setNewTask('')
      setNewDescription('')
      setNewHour('')
      setNewMinute('')
    }

  }

  //guarda los detalles modificados de la tarea
  const save = (id) => {

    const task = tasks.find(t => t.id === id)
    const changedTask = {
      ...task,
      title: newTask,
      description: newDescription,
      duration: {
        hours: newHour,
        minutes: newMinute
      }
    }

    taskService
      .update(id, changedTask)
      .then(returnedTask => {
        setTasks(tasks.map(task => task.id !== id ? task : returnedTask))
      })
      .catch(error => {
        alert('already deleted from db')
        setTasks(tasks.filter(t => t.id !== id))
      })

    //al guardar cierra la pantalla de detalles
    toggleDetails(id)
  }

  //elimina la tarea
  const removed = (id) => {

    const newTasks = tasks.map(task => {
      if (task.id !== id) {
        return task
      }
    })

    taskService
    .remove(id)
    .then(() => {
      setTasks(newTasks)
    })

  }

  //modificacion del orden de las tareas
  const reorderList = (previousIndex, nextIndex) => {

    setTasks(reorder(tasks, previousIndex, nextIndex))

  }

  //cierra o abre la pantalla de timer
  const toggleTimer = (id) => {

    const currentTask = tasks.filter(task => task.id === id)
    const title = currentTask[0].title
    const hours = currentTask[0].duration.hours
    const minutes = currentTask[0].duration.minutes

    console.log(currentTask)

    if (!timer.display) {
      toggleDetails(id)
      setTimer({
        display: !timer.display,
        id: id,
        title: title,
        hours: hours,
        minutes: minutes
      })
    } else {
      setTimer({
        display: !timer.display,
        id: '',
        title: '',
        hours: 0,
        minutes: 0,
      })
    }

  }

  //actualizacion de datos de grafica, aumenta una tarea en el dia actual cada vez que es ejecutada
  const updateGraphData = () => {

    let d = new Date()
    let dayOfWeek = 1

    switch (d.getDay()) {
      case 1:
        dayOfWeek = 1
        break
      case 2:
        dayOfWeek = 2
        break
      case 3:
        dayOfWeek = 3
        break
      case 4:
        dayOfWeek = 4
        break
      case 5:
        dayOfWeek = 5
        break
      case 6:
        dayOfWeek = 6
        break
      case 0:
        dayOfWeek = 7
        break
    }

    const newGraphData = [
      { firstDayOfWeek: graphData[0].firstDayOfWeek },
      graphData[1].map(data => {
        if (data.daysOfWeek === dayOfWeek) {
          data.completedTasks = data.completedTasks + 1
        }
        return data
      })
    ]

    setGraphData(newGraphData)

  }

  //modificacion del estado del filtro de tareas
  const newFilter = (value) => {
    setFilter(value)
  }

  return (
    <>
      <Router>
        <Nav />
        <Redirect to={ROUTES.TASKS} />
        <Route
          path={ROUTES.TASKS}
          render={() => {
            if (timer.display) {
              return (
                <Timer
                  timer={timer}
                  toggleTimer={toggleTimer}
                  markComplete={markComplete}
                />
              )
            } else if (details.display) {
              return (
                <EditTask
                  newTask={newTask}
                  newDescription={newDescription}
                  newHour={newHour}
                  newMinute={newMinute}
                  handleNewTask={handleNewTask}
                  handleNewDescription={handleNewDescription}
                  handleNewHour={handleNewHour}
                  handleNewMinute={handleNewMinute}
                  details={details}
                  markComplete={markComplete}
                  toggleDetails={toggleDetails}
                  save={save}
                  remove={removed}
                  toggleTimer={toggleTimer}
                />
              )
            } else {
              return (
                <PendingTasks
                  newTask={newTask}
                  handleNewTask={handleNewTask}
                  addTask={addTask}
                  tasks={tasks.filter(task => !task.completed)}
                  markComplete={markComplete}
                  toggleDetails={toggleDetails}
                  reorderList={reorderList}
                  filter={filter}
                  newFilter={newFilter}
                />
              )
            }
          }}
        />
        <Route
          path={ROUTES.COMPLETED}
          render={() =>
            <CompletedTasks
              tasks={tasks.filter(task => task.completed)}
              markComplete={markComplete}
            />
          }
        />
        <Route
          path={ROUTES.GRAPH}
          render={() =>
            <Graph
              graphData={graphData[1]}
            />
          }
        />
      </Router>
    </>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))

