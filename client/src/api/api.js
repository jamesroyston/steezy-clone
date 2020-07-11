import Axios from 'axios';

export default function getClassList(page) {
  return Axios.post('/api/classes', { page })
    .then(res => res)
    .catch(error => console.log(error));
}
