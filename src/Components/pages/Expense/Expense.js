import React from 'react'
import MaterialTable from 'material-table'

const Burchase = ({expense , deleteExpense, editExpense}) => {
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
                      field: "expId",
                    },
                    {
                      title: "Branch Name",
                      field: "branchModel.branchName",
                    },
                    {
                      title: "Expense Type",
                      field: "expenseTypeModel.exptype",
                    },
                    {
                      title: "Amount",
                      field: "expAmount",
                    },
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "edit",
                      onClick: (event, rowData) => {
                        editExpense(rowData.expId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Burchase",
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
