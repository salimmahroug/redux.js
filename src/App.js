import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, completeTodo, deleteTodo, updateTodo } from './Action/TodoAction';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [filter, setFilter] = useState('all');
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <div className="div">
        <input
          className="input"
          type="text"
          placeholder="add task..."
          onChange={(e) => setTask(e.target.value)}/>
        <button className="add" onClick={() => dispatch(addTodo(task))}>
          Add Task
        </button>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('done')}>Done</button>
        <button onClick={() => setFilter('undone')}>Undone</button>
        {filter === 'all'
          ? todos.map((el) =><div>
              <h2>{el.title}</h2>
              <Button variant="primary" onClick={() => { setEditTask(el.title); handleShow(); }}>
                Update
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="text"
                    placeholder="edit task..."
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch(updateTodo(el.id, editTask));
                      handleClose();
                    }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <button onClick={() => dispatch(deleteTodo(el.id))}>Delete</button>
              <button className="bbb" onClick={() => dispatch(completeTodo(el.id))}>{el.complete ? 'Done' : 'Undone'}</button>
            </div>
          )
          : filter === 'done'
            ? todos
              .filter((el) => el.complete === true)
              .map((el) => (
                <div key={el.id}>
                  <h2>{el.title}</h2>
                  <button onClick={() => dispatch(deleteTodo(el.id))}>Delete</button>
                  <button className="bbb" onClick={() => dispatch(completeTodo(el.id))}>
                    {el.complete ? 'Done' : 'Undone'}
                  </button>
                </div>
              ))
            : todos
              .filter((el) => el.complete === false)
              .map((el) => (
                <div key={el.id}>
                  <h2>{el.title}</h2>
                  <button onClick={() => dispatch(deleteTodo(el.id))}>Delete</button>
                  <button className="bbb" onClick={() => dispatch(completeTodo(el.id))}>
                    {el.complete ? 'Done' : 'Undone'}
                  </button>
                </div>
              ))}
      </div>
    </div>
  );
}
export default App;
