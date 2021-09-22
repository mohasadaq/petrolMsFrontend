import React from 'react'
import MaterialTable from 'material-table'

const ExpenseType = ({ expensetype, deleteExpense, editExpense }) => {
  let index=0
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
                    title: "Id",
                    export: true,
                    render: () => {
                      return ++index
                    },
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
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      editExpense(rowData.expid)
                    }
                  },
                  rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    iconProps: {style: { color: "#CA0B00" }},
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
