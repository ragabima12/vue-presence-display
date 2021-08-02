import Axios from 'axios'

let responseStatus = {
    isError: false,
    data: null,
    reason: null
}

const Request = async (reqUrl, reqMethod, reqBody, reqHeaders) => {
    let response = { ...responseStatus}

    if (typeof reqUrl !== 'string' || reqUrl == '') {
        response.isError = true
        response.reason = `Request Url must be a string, ${typeof reqUrl} given`
        return response
    }

    if (typeof reqMethod !== 'string') {
        response.isError = true
        response.reason = `Request Method must be a string, ${typeof reqMethod} given`
        return response
    }

    const request = await Axios({
        url: reqUrl,
        method: reqMethod,
        data: reqBody || {},
        headers: reqHeaders || {}
    })

    response.data = request.data
    return response
}

const storeAttendance = async (cardId) => {
    let response = {... responseStatus}
    if (typeof cardId !== 'string') {
        response.isError = true
        response.reason = `Card ID must be a string, given ${typeof cardId} on Card ID`
        return response
    }

    const url = `${process.env.VUE_APP_API_HOST}/api/v1/attendance`
    const method = 'POST'
    const data = {
        id_card: cardId,
    }

    const requestResponse = await Request(url, method, data, null)
    if (requestResponse.isError) {
        response.isError = true
        response.reason = `Error when requesting to API server with error : ${requestResponse.reason}`
        return response
    }

}

const getStudentImage = async (studentData) => {
    let response = {... responseStatus}
    if (typeof studentData !== 'object') {
        response.isError = true
        response.reason = `Student data must be a object, given ${typeof studentData} on Student data`
        return response
    }

    const url = `${process.env.VUE_APP_API_HOST}/api/v1/storage/images/students/${studentData.nisn}.jpg`
    const method = 'GET'

    const requestResponse = await Request(url, method, null, null)
    if (requestResponse.isError) {
        response.isError = true
        response.reason = `Error when requesting to API server with error : ${requestResponse.reason}`
        return response
    }

}

const getStudentData = async (studentId) => {
    let response = {... responseStatus}
    if (typeof studentId !== 'string') {
        response.isError = true
        response.reason = `Student ID must be a object, given ${typeof studentId} on Student ID`
        return response
    }

    const url = `${process.env.VUE_APP_API_HOST}/api/v1/student/machine?mac=11-23-25-59-50-A8&student=${studentId}`
    const method = 'GET'

    const requestResponse = await Request(url, method, null, null)
    if (requestResponse.isError) {
        response.isError = true
        response.reason = `Error when requesting to API server with error : ${requestResponse.reason}`
        return response
    }
    response.data = requestResponse.data?.data
    return response
}

export default {
    storeAttendance,
    getStudentImage,
    getStudentData
}