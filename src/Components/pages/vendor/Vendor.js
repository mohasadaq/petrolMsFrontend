import React from "react";
import MaterialTable from 'material-table'

const vendor = ({ vendor, deleteVendor, editVendor }) => {
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
                    field: "vId",
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
                  //
                ]}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "edit",
                    onClick: (event, rowData) => {
                      editVendor(rowData.vId);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
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
