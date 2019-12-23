import React from "react";
import axios from 'axios';


export default function TodoItem({item, editItem, deleteItem}){

    const onCheckboxChange = async (event) => {
      let isCompleted = !item.completed;
      let editedItem = {
          title: item.title,
          id: item.id,
          completed: isCompleted
      };
      await axios.put(`http://localhost:3000/todos/${item.id}`, editedItem );
      editItem(editedItem);
    };

    const onDeletePress = async () => {
        await axios.delete(`http://localhost:3000/todos/${item.id}`);
        deleteItem(item.id);
    };


    return(
        <div className="todo-item">
            <input onClick={onCheckboxChange} checked={item.completed} type="checkbox"/>
            <p className={item.completed ? 'complete-item' : ''}>{item.title}</p>
            <button onClick={onDeletePress}>Delete</button>
        </div>
    )
}
