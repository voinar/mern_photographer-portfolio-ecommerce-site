//-----------
// use reducer counter
//-----------

import React, { useState, useReducer } from 'react';

const Experiments = () => {
  const [name, setName] = useState('');
  const [edit, setEdit] = useState('');

  const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo',
    EDIT_TODO_START: 'edit-todo-start',
    EDIT_TODO_SUBMIT: 'edit-todo-submit',
  };

  const reducer = (todos, action) => {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTIONS.TOGGLE_TODO:
        // console.log('content: ' + JSON.stringify(action.payload));
        // console.log('todos: ' + JSON.stringify(todos));
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo) => todo.id !== action.payload.id);
      case ACTIONS.EDIT_TODO_START:
        return todos.map((todo) => {
          if (todo.id !== action.payload.id) {
            return { ...todo, editing: false };
          }
          if (todo.id === action.payload.id) {
            setEdit(todo.name);
            return { ...todo, editing: !todo.editing };
          }
          return todo;
        });
      case ACTIONS.EDIT_TODO_SUBMIT:
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            // setEdit(todo.name)
            return { ...todo, name: edit, editing: !todo.editing };
          }
          return todo;
        });
      default:
        return todos;
    }
  };

  const newTodo = (name) => {
    return {
      id: Date.now(),
      key: Date.now(),
      name: name,
      complete: false,
      editing: false,
    };
  };

  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  };

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   // dispatch({ type: ACTIONS.EDIT_TODO_END})

  //   setEdit('');
  // };

  // const submitEdit = (todo,e) => {
  //   // e.preventDefault();
  //   console.log(todo.id)
  //   dispatch({ type: ACTIONS.EDIT_TODO_END, payload: { id: todo.id, name: edit }})
  //   // dispatch({ type: ACTIONS.EDIT_TODO_START, payload: { id: id }})

  //   // return;
  // };
  // console.log('todos: ' + JSON.stringify(todos));

  return (
    <>
      <div
        style={{
          marginTop: '200px',
          padding: '10vw',
          height: '100vh',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button>add item</button>
          </form>
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              color: 'white',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 'auto',
              }}
            >
              {todos.map((todo) => {
                return (
                  <li
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      background: 'blue',
                      width: '540px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '6px',
                        alignSelf: 'center',
                      }}
                    >
                      {todo.editing === false ? (
                        <span
                          style={
                            todo.complete === true ? { color: 'grey' } : null
                          }
                        >
                          {todo.name}
                        </span>
                      ) : (
                        <form
                          onSubmit={() => {
                            dispatch({
                              type: ACTIONS.EDIT_TODO_SUBMIT,
                              payload: {
                                id: todo.id,
                                name: edit,
                                editing: todo.editing,
                              },
                            });
                          }}
                        >
                          <input
                            type="text"
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                          />
                          <button>save edit</button>
                        </form>
                      )}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <button
                        style={{ width: '80px' }}
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.TOGGLE_TODO,
                            payload: { id: todo.id },
                          })
                        }
                      >
                        {todo.complete ? 'done' : 'to do'}
                      </button>
                      <button
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.EDIT_TODO_START,
                            payload: { id: todo.id },
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.DELETE_TODO,
                            payload: { id: todo.id },
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experiments;

//-----------
// use reducer counter
//-----------

// import React, { useState, useReducer } from 'react';

// const ACTIONS = {
//   INCREMENT: 'increment',
//   DECREMENT: 'decrement',
//   RESET: 'reset',
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ACTIONS.INCREMENT:
//       return { count: state.count + 1 };
//     case ACTIONS.DECREMENT:
//       return { count: state.count - 1 };
//     case ACTIONS.RESET:
//       return { count: (state.count = 0) };
//     default:
//       return state;
//   }
// };

// const Tests = () => {
//   const [state, dispatch] = useReducer(reducer, { count: 5 });

//   // const [count, setCount] = useState(0);

//   const increment = () => {
//     dispatch({ type: ACTIONS.INCREMENT });
//     // setCount((prevCount) => prevCount + 1);
//   };

//   const decrement = () => {
//     dispatch({ type: ACTIONS.DECREMENT });
//     // setCount((prevCount) => prevCount - 1);
//   };

//   const reset = () => {
//     dispatch({ type: ACTIONS.RESET });
//   };

//   return (
//     <>
//       <div
//         style={{
//           marginTop: '200px',
//           padding: '10vw',
//           height: '100vh',
//           border: '1px solid rgba(255,255,255,0.2)',
//           display: 'flex',
//           justifyContent: 'center',
//         }}
//       >
//         <div>
//           <button
//             style={{ padding: '0 16px', fontSize: '24px' }}
//             onClick={decrement}
//           >
//             -
//           </button>
//           <span style={{ padding: '14px', fontSize: '24px', color: 'white', border: '1px solid rgba(255,255,255,1)'}}>
//             {state.count}
//           </span>
//           <button
//             style={{ padding: '0 16px', fontSize: '24px' }}
//             onClick={increment}
//           >
//             +
//           </button>
//           <br/>
//           <button onClick={reset}>reset</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Tests;

//-----------
//old stuff
//-----------

// import { useState } from 'react';

// const Exercises = () => {
//   const [userName, setUserName] = useState('');
//   const [userAge, setUserAge] = useState('');
//   const [userList, setUserList] = useState(['joe', 'jim']);
//   const [removeUser, setRemoveUser] = useState('type user name');

//   return (
//     <div
//       style={{
//         marginTop: '300px',
//         color: 'rgb(220,220,220)',
//         fontWeight: 'thin',
//         padding: '0 160px',
//       }}
//     >
//       <h1>add user</h1>
//       <form>
//         <input
//           type="text"
//           required
//           value={userName}
//           onChange={(e) => {
//             setUserName(e.target.value);
//           }}
//         />
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             // setUserList((userList) => [...userList, userName]);
//           }}
//         >
//           Add
//         </button>
//         <input
//           type="text"
//           value={userAge}
//           onChange={(e) => {
//             setUserAge(e.target.value);
//           }}
//         />
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setUserAge((userAge) => [...userAge, userAge]);
//           }}
//         >
//           Enter
//         </button>
//       </form>
//       <div>
//         Current users:{' '}
//         {userList
//           ? userList.map((element) => {
//               return <li>element</li>;
//             })
//           : 'empty'}
//       </div>
//       <div>User age: {userAge}</div>

//       <h1>remove user</h1>
//       <form>
//         <input
//           type="text"
//           value={removeUser}
//           onChange={(e) => {
//             setRemoveUser(e.target.value);
//           }}
//         />
//       </form>
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setUserList((prevList) =>
//             prevList.filter(function (user) {
//               return user !== removeUser;
//             })
//           );
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// export default Exercises;
