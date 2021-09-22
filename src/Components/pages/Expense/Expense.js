import React from 'react'
import MaterialTable from 'material-table'

const Burchase = ({ expense, deleteExpense, editExpense }) => {
  
  let index=0
    return (
      <div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <MaterialTable
                  title="Expense"
                  data={expense}
                  columns={[
                    {
                      title: "Id",
                      export: true,
                      render: () => {
                        return ++index
                      },
                    },
                    {
                      title: "Branch Name",
                      field: "employeeModel.branch.branchName",
                    },
                    {
                      title: "Expense Type",
                      field: "expenseTypeModel.exptype",
                    },
                    {
                      title: "Amount",
                      field: "expAmount",
                    },
                    {
                      title: "Employee Name",
                      field: "employeeModel.empName",
                    }
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "edit",
                      iconProps: {style: { color: "#01579b" }},
                      onClick: (event, rowData) => {
                        editExpense(rowData.expId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Burchase",
                      
                      iconProps: {style: { color: "#CA0B00" }},
                      onClick: (event, rowData) => {
                        deleteExpense(rowData.expId);
                      },
                    }),
                  ]}
                  options={{
                    exportButton: true,
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Burchase;
