import axios from "axios";
const url = "https://petrolmanagement.herokuapp.com/transection";
class dashboardService {
  getTotalMoney() {
    return axios.get(`${url}/total`);
  }

  //Number Of liters Sold
  getNumberOfLiteresSold() {
    return axios.get(`${url}/n_of_l_sold`);
  }

    //HOW MANY LITERS ARE REMAINING
    getNumOfLiterRemaining() {
      return axios.get(`${url}/ramaining`);
    }

 //Total expense 
 getTotalExpense() {
  return axios.get(`https://petrolmanagement.herokuapp.com/expense/totalExpense`);
}
  
}
export default new dashboardService();
