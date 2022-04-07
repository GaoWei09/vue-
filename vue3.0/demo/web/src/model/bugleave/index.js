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
    test:(params)=>{
        return axios({
           method:"get",
           url:"/api/bugs/all",
           params,
           headers:{
               token:window.localStorage.getItem("token")
           } 
        })
    },
    update: (data) => {
        return axios({
            method: "patch",
            url: "/api/bugs/update",
            data,//data 不要写错了
            headers: {
                token: window.localStorage.getItem("token")
            }
        })

    },

}