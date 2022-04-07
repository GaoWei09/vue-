import axios from "../axios";

export default {
    login: data => axios({
        method: "post",
        url: "/api/users/login",
        data
    }),

    register: data => axios({
        method: "post",
        url: "/api/users/register",
        data,
        headers: {
            token: window.localStorage.getItem("token")
        }
    }),
    manage:params=>axios({
        method:"get",
        url:"/api/users/manage",
        params,
        headers:{
            token: window.localStorage.getItem("token")
        }
    })


}