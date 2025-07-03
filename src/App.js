import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';


import './App.css';

function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text){
     setProjectState(prevState => {
      const taskId = Math.random();
      const newtask = {
        text: text,
        projectId : prevState.selectedProjectId,
        id: taskId,

      }

      return {
        ...prevState,
        tasks: [newtask, ...prevState.tasks],
      }
    })
  };

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        // selectedProjectId: undefined,
        tasks: prevState.tasks.filter(task => task.id !== id),
      }
    })
  };



  function handleDelete() {
    setProjectState(prevState => {
      return {
        ...prevState,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
        selectedProjectId: undefined,
      }
    })
  }


  function handleSelectProject(Id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: Id,
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }
  
  function handleCancleProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);


  let content = (<SelectedProject 
    project={selectedProject} 
    onDelete={handleDelete}
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
  />)

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancle={handleCancleProject}/>
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }



  return (
    <main className='h-screen my-8 flex gap-8'>
    <Sidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}
    />
    {content}
    </main>
  );
}

export default App;
