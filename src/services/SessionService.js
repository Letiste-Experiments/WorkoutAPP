import http from "./http-common"

function create(data) {
  return http.post("/sessions", data)
}

function get() {
  return http.get("/sessions")
}

function forget() {
  return http.delete("/sessions")
}

export default {
  get,
  create,
  forget,
}
