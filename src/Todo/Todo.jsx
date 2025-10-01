import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import "../Todo/Todo.css";
const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const check = (id) => {
    const newList = todoList.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setTodoList(newList);
  };
  const [isEdit, setIsEdit] = useState(false);

  const edit = (id) => {
    const editList = todoList.find((todoList) => todoList.id === id);
    setTodo(editList.name);
    setIsEdit(true);
    setCurrentEleId(id);
  };
  const remove = (id) => {
    const removeList = todoList
      .filter((todoList) => todoList.id !== id)
      .map((todoList, index) => {
        {
          return { ...todoList, id: index + 1 };
        }
      });
    console.log(removeList);
    setTodoList(removeList);
  };

  const [currentEleId, setCurrentEleId] = useState(null);
  const addOrSave = () => {
    if (isEdit) {
      const editList = todoList.map((todoList) => {
        return todoList.id === currentEleId
          ? { ...todoList, name: todo }
          : todoList;
      });
      setTodoList(editList);
      setCurrentEleId(null);
      setTodo("");
      setIsEdit(false);
    } else {
      if (todo.trim() === "") return;
      setTodoList([
        ...todoList,
        { id: todoList.length + 1, name: todo, checked: false },
      ]);
      setTodo("");
    }
  };
  return (
    <main>
      <div className="main-container">
        <div className="title">
          <h1>To-Do List</h1>
        </div>
        <div className="inputbox">
          <input
            type="text"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            className="inputlist"
            placeholder="Add new list.."
          />
          <button onClick={addOrSave} className={isEdit ? "save" : "add"}>
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
        <ul className="todo-list">
          {todoList.map((todoList) => {
            return (
              <li key={todoList.id}>
                <div className="text">
                  <input
                    type="checkbox"
                    checked={todoList.checked}
                    onChange={() => check(todoList.id)}
                  />
                  <span>{todoList.name}</span>
                </div>
                <div className="icon">
                  <MdEditSquare
                    role="button"
                    tabIndex={0}
                    onClick={() => edit(todoList.id)}
                    size={30}
                    className="edit"
                  />
                  <MdDeleteForever
                    role="button"
                    tabIndex={0}
                    onClick={() => remove(todoList.id)}
                    size={33}
                    className="delete"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
export default Todo;
