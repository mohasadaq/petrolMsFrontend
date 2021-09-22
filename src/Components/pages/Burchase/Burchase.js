import React from "react";
import MaterialTable from "material-table";

const Burchase = ({ burchase, deleteBurchase, editBurchase }) => {
  let index = 0;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <MaterialTable
                title="Burchase"
                data={burchase}
                columns={[
                  {
                    title: "Id",
                    export: true,
                    render: () => {
                      return ++index
                    },
                  },
                  {
                    title: "vendor name",
                    field: "vendorModal.vName",
                  },
                  {
                    title: "Petrol Type",
                    field: "petrolTypeModel.p_type",
                  },
                  {
                    title: "Quantity",
                    field: "quantity",
                  },

                  {
                    title: "Amount",
                    render: (burchase) => {
                      return `$${burchase.quantity * burchase.pricePerLiter}`;
                    },
                  },
                  {
                    title: "Paid Amount",
                    field: "amountPaid",
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
                      editBurchase(rowData.pid);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete Burchase",
                    iconProps: {style: { color: "#CA0B00" }},
                    onClick: (event, rowData) => {
                      deleteBurchase(rowData.pid);
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
};
export default Burchase;
