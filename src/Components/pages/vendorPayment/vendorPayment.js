import React from 'react'
import MaterialTable from 'material-table'
// import Edit from '@material-ui/icons/Edit'
const Branch = ({ payment, details, deletePayment }) => {
  let index = 0;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <MaterialTable
                title="vendor payment"
                data={payment}
                columns={[
                  {
                    title: "Id",
                    export: true,
                    render: () => {
                      return ++index
                    },
                  },
                  {
                    title: "vendor Name",
                    field: "vendorModal.vName",
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
                      details(rowData.id)
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete User",
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      deletePayment(rowData.id);
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
