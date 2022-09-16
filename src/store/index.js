import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

//actions——用于响应组件中的动作
const actions = {
    updatetoken(context,value){
        context.commit('updateToken',value)
    },
    updatereqdata(context,value){
        context.commit('updateReqdata',value)
    },
    updatereqdata2(context,value){
        context.commit('updateReqdata2',value)
    },
    updatereqdata3(context,value){
        context.commit('updateReqdata3',value)
    }

}
//mutations——用于操作数据(state)
const mutations = {
    updateToken(state,value){
        localStorage.setItem(`token`,JSON.stringify(value))
        state.token = value
    },
    updateReqdata(state,value){
        sessionStorage.setItem(`reqdata`,JSON.stringify(value))
        state.reqdata = value
    },
    updateReqdata2(state,value){
        sessionStorage.setItem(`reqdata2`,JSON.stringify(value))
        state.reqdata2 = value
    },
    updateReqdata3(state,value){
        sessionStorage.setItem(`reqdata3`,JSON.stringify(value))
        state.reqdata3 = value
    }
}
//准备state——用于存储数据
const state = {
    token:''||localStorage.getItem(`token`),
    // token:''||JSON.parse(localStorage.getItem(`token`)),
    reqdata:''||JSON.parse(sessionStorage.getItem(`reqdata`)),
    reqdata2:''||JSON.parse(sessionStorage.getItem(`reqdata2`)),
    reqdata3:''||JSON.parse(sessionStorage.getItem(`reqdata3`)),
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})
