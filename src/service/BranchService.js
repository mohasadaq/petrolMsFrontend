import axios from 'axios'
const url = "http://localhost:8800/branch";

class BranchService {
    getBranchAll(){
        return axios.get(`${url}/list`);
    }
    saveBranch(data){
        return axios.post(`${url}/save`,data)

    }

    //GET ONE BRANCH
    getBranchById(id){
        return axios.get(`${url}/getOneBranch/${id}`)
    }
    //  DELETE BRANCH
    deleteBranch(id){
        return axios.delete(`${url}/delete/${id}`)
    }
}
export default new BranchService ();
