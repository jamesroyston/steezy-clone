import Axios from 'axios';

export function getClassList(page) {
  return Axios.post('/api/classes', { page })
    .then(res => res)
    .catch(error => console.log(error));
}

export function getClassById(id) {
  return Axios.get(`/api/classes/${id}`)
    .then(res => res)
    .catch(error => console.log(error));
}

export function login(username = '', password = '') {
  return Axios.post('/api/login', {
    username,
    password,
  })
    .then(res => res)
    .catch(error => console.log(error));
}

export function signup(username = '', password = '') {
  return Axios.post('/api/signup', {
    username,
    password,
  })
    .then(res => (res.status === 200 ? login(username, password) : res))
    .catch(error => console.log(error));
}

export function logout() {
  return Axios.delete('/api/logout')
    .then(res => console.log(res, 'logged out'))
    .catch(error => console.log(error));
}

export function sessionCheck() {
  return Axios.get('/api/sessionCheck')
    .then(res => res.data)
    .catch(error => console.log(error));
}
