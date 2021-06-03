import React from 'react'
import MaterialTable from 'material-table'

const Loan = ({transection , deleteTransection, editTransection}) => {

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <MaterialTable
                  title="Transection"
                  data={transection}
                  columns={[
                    {
                      title: "Tr No",
                      field: "trnsId",
                    },
                    {
                      title: "Customer",
                      field: "customerModel.cname",
                    },
                    {
                      title: "Petrol type",
                      field: "petrolTypeModel.p_type",
                    },
                    {
                      title: "Number of liter",
                      field: "numofliter",
                    },
                    {
                      title: "Price per Liter",
                      field: "priceperLiter",
                    },
                    {
                      title: "Amount paid",
                      field: "amountpaid",
                    },
                    {
                      render: (loan) => {
                        return `$${loan.numofliter * loan.priceperLiter}`;
                      },
                      title: "Amount",
                    },
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Edit",
                      onClick: (event, rowData) => {
                        editTransection(rowData.trnsId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Loan",
                      onClick: (event, rowData) => {
                        deleteTransection(rowData.trnsId);
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
export default Loan;
