import React, { useState } from "react";

interface ITodoApp {
    id: number;
    task: string;
}
const TotalHeader = ({ title = 'Title Task', total = 0 }: { title?: string, total?: number }) => (
    <h1>{title} - {total}</h1>
)
const TodoApp = () => {
    const [task, setTask] = useState<string>("");
    console.log(task)

    const[list, setList] = useState<ITodoApp[]>([])

    const handleOnChangeTask = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value)
    }
    const handleAdd = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!task.trim()) return;

        const newTask: ITodoApp = {
            id: Date.now(),
            task: task
        }
        setList(prev => [...prev, newTask])
        setTask("")
    }
    return (
        <div style={{ padding: '20px' }}>
            <TotalHeader title="Danh sách công việc" total={list.length} />
            
            <form onSubmit={handleAdd}>
                <input 
                    type="text" 
                    placeholder='Nhập task tại đây...' 
                    value={task} 
                    onChange={handleOnChangeTask}
                />
                <button type='submit'>Thêm</button>
            </form>

            <ul style={{ marginTop: '20px' }}>
                {list.map((item) => (
                    <li key={item.id}>{item.task}</li>
                ))}
            </ul>
        </div>
    )
}
export default TodoApp;