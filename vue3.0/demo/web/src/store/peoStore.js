
import bugModel from "../model/bugPeople";

export default {
    namespaced: true,

    state: {
        userbugList: [],//整个bug列表
    },
    mutations: {
        initUserbugList(state, list) {//初始化bug列表
            state.userbugList = list;

        },
        orderBugList(state, list) {
            state.userbugList = list;
        }
    },
    actions: {
        initUserbugList({ commit }, playload) {
            return new Promise(async (resolve) => {
                let { data } = await bugModel.people({});
                commit("initUserbugList", data.data);
                resolve({ code: data.code });//返回状态码
            })
        },
        orderBugList({ commit }, playload) {//传了一个参数去后端，做分页
            return new Promise(async (resolve) => {
                let { data } = await bugModel.allbug(
                    playload
                );
                console.log(data)
                commit("orderBugList", data.data);
                resolve({
                    code: data.code,
                    total: data.total
                })
            })
        }
    }

}