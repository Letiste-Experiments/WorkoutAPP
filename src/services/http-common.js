import axios from "axios"

export default axios.create({
  baseURL: "http://192.168.1.43:8080/workoutapi/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
})