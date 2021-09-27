import axios from 'axios'
const url = "https://petrolmanagement.herokuapp.com/Employee";
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
        return axios.get(`https://petrolmanagement.herokuapp.com/menue/list/${id}`)
    }

    getAllMenues(){
        return axios.get(`https://petrolmanagement.herokuapp.com/menue/All`)
    }

     // get sub menues
     getSubMenues(){
        return axios.get(`https://petrolmanagement.herokuapp.com/subMenue/list`)
    }

 // get sub menues
 getAllSubMenues(){
    return axios.get(`https://petrolmanagement.herokuapp.com/subMenue/All`)
}
//change password
changepassword(data){
    return axios.post(`${url}/changepassword`,data)
}

}

export default new EmployeeService();
