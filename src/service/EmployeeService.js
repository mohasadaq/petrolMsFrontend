import axios from 'axios'
const url = "http://localhost:8800/Employee";
class EmployeeService {
    
    getEmployeeList(){
        return axios.get(`${url}/list`)
    }
    
    //delete Product
    deleteEmployee(id){
        return axios.delete(`${url}/delete/${id}`)
    }
    saveEmployee(data){
        return axios.post(`${url}/save`,data)
    }

    //get One Emp
    getOneEmplooyee(id){
        return axios.get(`${url}/getOnEmployee/${id}`)
    }


    // get menues
    getMenues(id){
        return axios.get(`http://localhost:8800/menue/list/${id}`)
    }

    getAllMenues(){
        return axios.get(`http://localhost:8800/menue/All`)
    }

     // get sub menues
     getSubMenues(){
        return axios.get(`http://localhost:8800/subMenue/list`)
    }

 // get sub menues
 getAllSubMenues(){
    return axios.get(`http://localhost:8800/subMenue/All`)
}
//change password
changepassword(data){
    return axios.post(`${url}/changepassword`,data)
}

}

export default new EmployeeService();