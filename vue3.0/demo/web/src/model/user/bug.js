import axios from "../axios";

export default {
    allbug:params=>axios({
        method:"get",
        url:"/api/bugs/all",
        params,
        headers:{
            token:window.localStorage.getItem("token")
        }
    }),
    // 图表接口
    group:()=>axios({
        method:"get",
        url:"/api/bugs/group",
        headers:{
            token:window.localStorage.getItem("token")
        }
    })

}