import React, {useState, useEffect} from 'react';
import './App.css';
import TodoInput from "./components/TodoInput";
import axios from 'axios';
import TodoItem from './components/TodoItem'

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isScreenReady, setReady] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/todos').then(
            res => {
                setTodoList(res.data);
                setReady(true);
            }
        )
    }, []);

    const addItem = (item) => {
        setTodoList([...todoList, item])
    };

    const editItem = (editedItem) => {
        let todoListCopy = todoList;
        let itemIndex = todoListCopy.findIndex(item => item.id === editedItem.id);
        todoListCopy[itemIndex] = editedItem;
        setTodoList([...todoListCopy]);
    };

    const deleteItem = (id) => {
        setTodoList(todoList.filter(item => item.id !== id))
    };

    if (!isScreenReady) {
        return (<p>Loading...</p>)
    }

    return (
        <div className="App">
            <h1>My Todo List</h1>

            <TodoInput addItem={addItem}/>

            <div className="list">
                {
                    todoList.length === 0 ? <p>List is empty</p> : todoList.map((item, index) => {
                        return (
                            <TodoItem editItem={editItem} deleteItem={deleteItem} item={item}/>
                        )
                    })
                }
            </div>
        </div>
    );
}


export default App;
