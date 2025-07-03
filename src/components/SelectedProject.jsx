import Tasks from "./Tasks.jsx";


function SelectedProject({project, onDelete, onAddTask, onDeleteTask, tasks}) {
    if (!project) {
        return (
            <div className="w-[35rem] mt-16 text-center text-stone-500">
                <h2 className="text-xl font-bold">Project not found</h2>
                <p>Please select a valid project.</p>
            </div>
        );
    }

    const formatedDate = project.dueDate
        ? new Date(project.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        : '';

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>Delete</button>
            </div>
            <p className="mb-4 text-stone-400">{formatedDate}</p>
            <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <Tasks 
                projectId={project.id}
                onAddTask={onAddTask} 
                onDeleteTask={onDeleteTask}
                tasks={tasks}
            />
        </div>
    );
}

export default SelectedProject;