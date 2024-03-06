import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(b => b.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const currentLikes = blog.likes

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default {
  getAll,
  setToken,
  create,
  addLike,
  remove
}