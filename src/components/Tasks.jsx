import NewTask from "./NewTask.jsx";

function Tasks({ projectId, onAddTask, onDeleteTask, tasks}) {
  
    const newTasks = tasks.filter(task => task.projectId === projectId);
    
    return (
        <section className="tasks">
            <h2 className="text-2xl font-bold text-stone-700 mb-4">New Tasks</h2>
            <NewTask 
                onAddTask={onAddTask}
                projectId={projectId}
            />

            { newTasks.length === 0 && (
            <p className="text-stone-800 my-4">This Project has no tasks</p>
            )}

            { newTasks.length > 0 && (
              <ul className="p-4 mt-8 rounded-md bg-stone-100">{
                newTasks.map(task =>(
                    <li key={task.id} className="flex justify-between my-4">
                        <span>{task.text}</span>
                        <button 
                            className="text-stone-700 hover:text-red-500"
                            onClick={() => onDeleteTask(task.id)}
                        >Clear</button>
                    
                    </li>
                ))
              }</ul>  
            )}
        </section>
    )
}

export default Tasks;