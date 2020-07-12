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
