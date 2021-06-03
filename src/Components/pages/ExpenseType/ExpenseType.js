import React from 'react'
import MaterialTable from 'material-table'

const ExpenseType = ({expensetype,deleteExpense,editExpense}) => {
    return (
        <div>
              <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">

            <MaterialTable
                title="Expense Type"
                data={expensetype}
                columns={[
                  {
                    title: 'Id',
                    field: 'expid'
                  },
                  {
                    title: 'Expense Type',
                    field: 'exptype'
                  }
                  // 
                ]}
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit',
                    onClick: (event, rowData) => {
                      editExpense(rowData.expid)
                    }
                  },
                  rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => {
                      deleteExpense(rowData.expid)
                    }
                  })
                ]}
                options={{
                  exportButton : true,
                  actionsColumnIndex: -1,
                   headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    }
                }}

                

              />

            </div>
          </div>
        </div>
      </div>             
        </div>
        
    )
}
export default ExpenseType;
