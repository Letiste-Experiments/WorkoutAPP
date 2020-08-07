import http from "./http-common"
import base from "./http-wger"

const API_KEY = "TFSFQU0eLmqvdoiBHjJeTMaEt1XV5KHOyh9fS9gd"


function getAll(pageNumber, search, pageSize = 20) {
  return http.get(`/foods?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

function create(data) {
  return http.post('/foods', data)
}

function getOne(id) {
  return http.get(`/foods/${id}`)
}

export default {
  getAll,
  getOne,
  create
}
