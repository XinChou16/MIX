import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state;
  }
}

function useReducer(reducer, initState) {
  const [state, setState] = useState(initState);

  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }

  return [state, dispatch];
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  function addTodo() {
    dispatch({ type: 'add', text: 'study' });
  }
  console.log(todos);
  return (
    <div>
      <p>TODOS count: {todos[0]}</p>
      <button onClick={addTodo}>
        Add todo
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
