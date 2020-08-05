import http from "./http-common"

function create(data) {
  return http.post(`/users`, data)
}

function getAll() {
  return http.get('/users')
}

function get(id) {
  return http.get(`/users/${id}`)
}

function remove(id) {
  return http.delete(`/users/${id}`)
}

function addFood(userid, foodid) {
  return http.post(`/users/${userid}/myfoods`, foodid)
}

function getFoods(userid, pageNumber, search) {
  return http.get(`/users/${userid}/myfoods?search=${search}&pageNumber=${pageNumber}&pageSize=20`)
}

function getMeals(userid, pageNumber, search) {
  return http.get(`/users/${userid}/mymeals?search=${search}&pageNumber=${pageNumber}&pageSize=20`)
}

export default {
  create,
  getAll,
  get,
  remove,
  addFood,
  getFoods,
  getMeals
}