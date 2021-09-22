import React from 'react'
import MaterialTable from 'material-table'

const Transection = ({transection , deleteTransection, editTransection}) => {

  let index=0
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
                      title: "Id",
                      export: true,
                      render: () => {
                        return ++index
                      },
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
                      render: (transection) => {
                        return `$${transection.priceperLiter}`;
                      },
                      title: "Price per Liter",
                    },
                    {
                      render: (transection) => {
                        return `$${transection.numofliter * transection.priceperLiter}`;
                      },
                      title: "Amount",
                    },
                    {
                      render: (transection) => {
                        return `$${transection.amountpaid}`;
                      },
                      title: "Amount paid",
                    },
                    {
                      title: "Branch",
                      field: "employeeModel.branch.branchName",
                    },
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Edit",
                      iconProps: {style: { color: "#01579b" }},
                      onClick: (event, rowData) => {
                        editTransection(rowData.trnsId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      iconProps: {style: { color: "#CA0B00" }},
                      tooltip: "Delete Transection",
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
export default Transection;
