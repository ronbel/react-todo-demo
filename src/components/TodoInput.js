import React, {useState, useRef} from "react";
import PropTypes from 'prop-types';
import axios from 'axios'

function TodoInput({addItem}) {

    const [newTodo, setNewTodo] = useState('');
    const inputRef = useRef();

    const addEvent = async () => {
        let todoObject = {title: newTodo, completed: false};
        let result = await axios.post('http://localhost:3000/todos', todoObject);
        addItem(result.data);
        inputRef.current.value = '';
        setNewTodo('');
    };

    return (
        <>
            <input ref={inputRef} onChange={(event => setNewTodo(event.target.value))} type="text"/>
            <button onClick={addEvent}>Add Temp</button>
        </>
    )
}

TodoInput.propTypes = {
    addItem: PropTypes.func.isRequired
};

export default TodoInput;
