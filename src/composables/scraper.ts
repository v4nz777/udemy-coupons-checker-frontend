import axios from "axios"


export const getCourse = async(courseName:string)=> {

    const response = await axios.get(`/courses/${courseName}`)
    return response.data
}
