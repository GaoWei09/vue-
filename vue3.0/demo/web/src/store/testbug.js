
import bugModel from "../model/bugleave/index";
export default {
    namespaced: true,

    state: {
        bugList: [],//整个bug列表
    },
    mutations: {
        allUserbugList(state, list) {
            state.bugList = list;

        },
        orderBugList(state, list) {
            state.bugList = list;
        }
    },
    actions: {
        allUserbugList({ commit }) {
            return new Promise(async (resolve) => {
                let { data } = await bugModel.test({});
                commit("allUserbugList", data.data);
                resolve({ code: data.code });//返回状态码
            })
        },
        orderBugList({ commit }, playload) {
            return new Promise(async (resolve) => {
                let { data } = await bugModel.test(playload);
                commit("orderBugList", data.data);
                resolve({ code: data.code,total:data.total });//返回状态码
            })
        }
    }
}