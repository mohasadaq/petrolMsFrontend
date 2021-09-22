import React from "react";
import MaterialTable from 'material-table'

const vendor = ({ vendor, deleteVendor, editVendor }) => {

  let index=0
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <MaterialTable
                title="vendor"
                data={vendor}
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
                    field: "vName",
                  },
                  {
                    title: "phone",
                    field: "vPhone",
                  },
                  {
                    title: "Address",
                    field: "vAddress",
                  },
                  {
                    title: "Balance",
                    field: "vBalance",
                  },
                  {
                    title: "Branch",
                    field: "employeeModel.branch.branchName",
                  },
                  //
                ]}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "edit",
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      editVendor(rowData.vId);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    iconProps: {style: { color: "#CA0B00" }},
                    tooltip: "Delete vendor",
                    onClick: (event, rowData) => {
                      deleteVendor(rowData.vId);
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

export default vendor;
