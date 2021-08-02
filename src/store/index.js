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
      errorMessage: "Terjadi kesalahan server"
        
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
        },
        setErrorMessage: async (state, payload) => {
            if(typeof payload !== 'string') {
              console.warn(`[WARN] Payload is not an string, ${typeof payload} given`)
              return
            }
            state.errorMessage = payload
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
        getStudentData: async (state, payload) => {
          try{
            const result = await Request.getStudentData(payload)
            console.log(result)
            if(result.isError) return responseStatus({data: null, isError: true, reason: result.reason})
          }catch(exception){
            console.warn(exception.message)
          }
        }
    },
    modules: {},
    getters: {
        getStudentData: state => state.student,
        getCurrentPage: state => state.currentPage,
        getErrorMessage: state => state.errorMessage
    }
})