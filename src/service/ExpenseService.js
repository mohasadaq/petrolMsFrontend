import axios from "axios"
const url = "http://localhost:8800/expense";

class ExpenseService {
    getExpenseList(){
        return axios.get(`${url}/list`)
    }
    saveExpense(date){
        return axios.post(`${url}/save`,date)
    }
    getOneExpense(id){
        return axios.get(`${url}/getOneExpense/${id}`)
    }
    deleteExpense(id){
        return axios.delete(`${url}/delete/${id}`);
    }
    
}
export default new ExpenseService();
