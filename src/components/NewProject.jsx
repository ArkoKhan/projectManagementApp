import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({onAdd, onCancle}) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const modalRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;
        

        if (enteredTitle.trim() === "" ||
            enteredDescription.trim() === "" ||
            enteredDueDate.trim() === "") {

            // TODO: Error Modal
            modalRef.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        });
    }



    return (
        <>

            <Modal ref={modalRef} btnCaption="Okey">
                <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Please enter a valid title, description, and due date.</p>
                <p className='text-stone-600 mb-4'>All fields are required.</p>
            </Modal>

            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancle}>Cancle</button>
                    </li>
                    <li>
                        <button 
                            className="px-6 py-2 rounded bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >Save</button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} id="title" label="Title"/>
                    <Input ref={descriptionRef} id="description" label="Description" textarea />
                    <Input ref={dueDateRef} id="due-date" type="date" label="Due Date"/>
                </div>
            </div>
        </>
    )
}

export default NewProject;