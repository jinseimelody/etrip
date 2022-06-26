import axios from 'axios';
const baseUrl = 'https://m.coetorise.com/api/';
const TodoService = {};

TodoService.getTodos = callback => {
  axios
    .get(baseUrl + 'todos')
    .then(res => {
      callback(res.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export default TodoService;
