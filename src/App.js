import { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs
} from 'firebase/firestore';
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

  // Fetch projects and tasks from Firestore on mount
  useEffect(() => {
    const projectsCol = collection(db, 'projects');
    const tasksCol = collection(db, 'tasks');

    const unsubscribeProjects = onSnapshot(projectsCol, (snapshot) => {
      const loadedProjects = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjectState(prev => ({ ...prev, projects: loadedProjects }));
    });

    const unsubscribeTasks = onSnapshot(tasksCol, (snapshot) => {
      const loadedTasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjectState(prev => ({ ...prev, tasks: loadedTasks }));
    });

    return () => {
      unsubscribeProjects();
      unsubscribeTasks();
    };
  }, []);

  async function handleAddTask(text) {
    const task = {
      text,
      projectId: projectState.selectedProjectId,
    };
    await addDoc(collection(db, 'tasks'), task);
  }

  async function handleDeleteTask(id) {
    await deleteDoc(doc(db, 'tasks', id));
  }



  async function handleDelete() {
    // Delete project
    const projectId = projectState.selectedProjectId;
    if (!projectId) return;
    await deleteDoc(doc(db, 'projects', projectId));
    // Delete all tasks for this project
    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);
    for (const taskDoc of querySnapshot.docs) {
      await deleteDoc(doc(db, 'tasks', taskDoc.id));
    }
    setProjectState(prev => ({ ...prev, selectedProjectId: undefined }));
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

  async function handleAddProject(projectData) {
    await addDoc(collection(db, 'projects'), projectData);
    setProjectState(prev => ({ ...prev, selectedProjectId: undefined }));
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
