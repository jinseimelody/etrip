import React, {useEffect, useReducer} from 'react';
import {TodoService} from '~/services';

const iniState = {
  job: '',
  jobs: [],
  msg: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'job_change':
      return {...state, job: action.payload.value};
    case 'submit': {
      if (!state.job) {
        return {...state, msg: 'ERR: task must be named~'};
      }

      const jobs = [...state.jobs, state.job];
      // save to local storage
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return {
        ...state,
        job: '',
        jobs,
        msg: ''
      };
    }

    case 'remove': {
      const jobs = state.jobs.filter((_, i) => i !== action.payload.index);
      // save to local storage
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return {
        job: '',
        jobs,
        msg: ''
      };
    }
    default:
      throw new Error('Invalid action name');
  }
};

const Todo = () => {
  // const [state, dispatch] = useReducer(reducer, iniState, () => {
  //   const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  //   return {
  //     job: '',
  //     jobs,
  //     msg: ''
  //   };
  // });
  const [state, dispatch] = useReducer(reducer, iniState);
  useEffect(() => {
    TodoService.getTodos(res => {
      console.log(res);
    });
  });

  const {job, jobs, msg} = state;

  return (
    <>
      <h3>
        Todo list
        <span role="img" aria-label="none">
          ✔️
        </span>
      </h3>
      <div className={msg ? 'd-flex' : 'd-flex mb-1'}>
        <input
          value={job}
          placeholder="Enter todo..."
          onChange={e =>
            dispatch({type: 'job_change', payload: {value: e.target.value}})
          }
          onKeyUp={e => {
            if (e.key === 'Enter') dispatch({type: 'submit'});
          }}
          className="form-control flex-grow-1 mr-1"
          type="text"></input>
        <button onClick={() => dispatch({type: 'submit'})} className="btn">
          Add
        </button>
      </div>
      {msg && (
        <div className="text-danger mb-1">
          <code>{msg}</code>
        </div>
      )}
      {jobs.map((x, i) => (
        <div className="note" key={i}>
          <div>{x}</div>
          <span
            role="img"
            aria-label="aria-label"
            style={{marginLeft: 'auto'}}
            onClick={() => dispatch({type: 'remove', payload: {index: i}})}>
            ❎
          </span>
        </div>
      ))}
    </>
  );
};

export default Todo;
