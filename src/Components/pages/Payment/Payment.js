import React from 'react'
import MaterialTable from 'material-table'
// import Edit from '@material-ui/icons/Edit'
const Branch = ({ payment, editPayment, deletePayment }) => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <MaterialTable
                title="Payment"
                data={payment}
                columns={[
                  {
                    title: "Id",
                    field: "pId",
                  },
                  {
                    title: "Customer Name",
                    field: "customerModel.cname",
                  },
                  {
                    title: "Amount",
                    render:(payment)=>{
                      return `$${payment.amount}`
                    }
                  },
                  {
                    title: "Date",
                    field: "date",
                  },
                  //
                ]}
                actions={[
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete User",
                    onClick: (event, rowData) => {
                      deletePayment(rowData.pId);
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
export default Branch;
