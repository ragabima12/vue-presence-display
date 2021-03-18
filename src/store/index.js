import Vue from 'vue';
import Vuex from 'vuex';
import Request from '@/plugins/APIRequest';

Vue.use(Vuex)

let responseStatus = ({data, iserror, reason}) => ({
    isError: iserror || false,
    data: data || null,
    reason: reason || null
})

export default new Vuex.Store({
    state: {
        student: {},
        currentPage: "waiting",
        
    },
    mutations: {
        setStudentData: async (state, payload) => {
            if(typeof payload !== 'object') {
                console.warn(`[WARN] Payload is not an object, ${typeof payload} given`)
                return
            }

            state.student = payload
        },
        setCurrentPage: async (state, payload) => {
            if(typeof payload !== 'string') {
                console.warn(`[WARN] Payload is not an string, ${typeof payload} given`)
                return
            }
            state.currentPage = payload
        }
    },
    actions: {
        storeAttendance: async (state, payload) => {
            if(typeof payload !== 'string') {
                console.warn(`[ERR] Payload must be an  string, ${typeof payload} given`)
                return responseStatus({data: null, isError: true, reason: 'INVALID_PAYLOAD'})
            }
            try {
                const result = await Request.storeAttendance(cardId)
                if(result.isError) return responseStatus({data: null, isError: true, reason: result.reason}) 
                console.log(result)
                return result
            }
            catch(exception) {
                console.warn(exception.message)
            }
        },
        getStudentImage: async (state) => {
            if(typeof payload !== 'object') {
                console.warn(`[ERR] Payload must be an  object, ${typeof payload} given`)
                return responseStatus({data: null, isError: true, reason: 'INVALID_PAYLOAD'})
            }
            let studentData = state.getters.getStudentData
            try {
                const result = await Request.getStudentImage(studentData)
                if(result.isError) return responseStatus({data: null, isError: true, reason: result.reason}) 
                console.log(result)
                return result
            }
            catch(exception) {
                console.warn(exeception.message)
            }
        }
    },
    modules: {},
    getters: {
        getStudentData: state => {
            return state.student
        },
        getCurrentPage: state => {
            return state.currentPage
        }
    }
})