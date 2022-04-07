import axios from "../axios";
export default {
    add: (data) => {
        return axios({
            method: "post",
            url: "/api/bugs/add",
            headers: {
                token: window.localStorage.getItem("token")
            },
            data
        })
    },
    people: (params) => {
        return axios({
            method: "get",
            url: "/api/bug/people",
            params,
            headers: {
                token: window.localStorage.getItem("token")
            }
        })
    },

    update: (data) => {//更新
        return axios({
            method: "patch",
            url: "/api/bugs/update",
            data,
            headers: {
                token: window.localStorage.getItem("token")
            }
        })
    },
    allbug: params => axios({
        method: "get",
        url: "/api/bug/all",
        params,
        headers: {
            token: window.localStorage.getItem("token")
        }
    }),
}