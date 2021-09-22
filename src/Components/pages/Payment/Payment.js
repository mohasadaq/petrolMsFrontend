import MaterialTable from 'material-table'
import React from 'react'
// import Edit from '@material-ui/icons/Edit'
const Branch = ({ payment, details, deletePayment }) => {
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
                  {
                    icon: "D",
                    tooltip: 'edit',
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      details(rowData.pId)
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete User",
                    iconProps: {style: { color: "#CA0B00" }},
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
