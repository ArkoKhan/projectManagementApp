import { useState } from 'react';


function NewTask({onAddTask, projectId}) {

    const [enteredTask, setEnteredTask] = useState("");


    function handleInputChange(event) {
        setEnteredTask(event.target.value);
    }


    function handleClick(){
        onAddTask(enteredTask)
        setEnteredTask("");
    }

    console.log(projectId);
    


    return (
        <div className="flex items-center gap-4">
            <input 
                className="w-64 px-2 py-1 rounded-sm bg-stone-200" 
                type="text" 
                value={enteredTask} 
                onChange={handleInputChange}

            />
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
        </div>
    )
}

export default NewTask;