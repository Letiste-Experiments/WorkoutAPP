import http from "./http-common"

function create(data) {
  return http.post("/meals", data)
}

function getFoods(idmeal) {
  return http.get(`/meals/${idmeal}`)
}

function remove(idmeal) {
  return http.delete(`/meals/${idmeal}`)
}

export default {
  create,
  getFoods,
  remove
}