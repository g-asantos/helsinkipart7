import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = async () => {
  const request = await axios.get(baseUrl)
  const response = request.data.sort((a,b) => {
    return b.likes - a.likes
  })
  return response
}

const create = async (newObj, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
 
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const comment = async (newObj, id) => {
  const response = axios.post(`${baseUrl}/${id}/comments`, newObj)

  return response.data
}


const update = async (newObj, token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObj, config)
  
  return response
}


const remove = async (token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll, create, update, remove, comment  }