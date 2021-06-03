import React from 'react'
import MaterialTable from 'material-table'


const Customer = ({ customer, deleteCustomer, editCustomer }) =>{
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
                      field: "cId",
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
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "edit",
                      onClick: (event, rowData) => {
                        editCustomer(rowData.cId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Employee",
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
