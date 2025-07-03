function Input({textarea, label, id, type = "text", ...props}) {
    const textareaClass = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
         <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500" for={id}>{label}</label>
            {textarea ? (
                    <textarea className={textareaClass} id={id} type={type} {...props}></textarea>
                ) : (
                    <input className={textareaClass} id={id} type={type} {...props} />
                    )}
            
        </p>
    )
}
export default Input;