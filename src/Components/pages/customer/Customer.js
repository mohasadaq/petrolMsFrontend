import React from 'react'
import MaterialTable from 'material-table'


const Customer = ({ customer, deleteCustomer, editCustomer }) => {
  
  let index=0
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <MaterialTable
                  title="Customer"
                  data={customer}
                  columns={[
                    {
                      title: "Id",
                      export: true,
                      render: () => {
                        return ++index
                      },
                    },
                    {
                      title: "Name",
                      field: "cname",
                    },
                    {
                      title: "phone",
                      field: "cphone",
                    },
                    {
                      title: "Address",
                      field: "caddress",
                    },
                    {
                      title: "balance",
                      field: "balance"
                    },
                    {
                      title: "Branch",
                      field: "employeeModel.branch.branchName",
                    },
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "edit",
                      iconProps: {style: { color: "#01579b" }},
                      onClick: (event, rowData) => {
                        editCustomer(rowData.cId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Employee",
                      iconProps: {style: { color: "#CA0B00" }},
                      onClick: (event, rowData) => {
                        deleteCustomer(rowData.cId);
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
export default Customer;
