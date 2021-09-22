import React from 'react'
import MaterialTable from 'material-table'
// import Edit from '@material-ui/icons/Edit'
const Branch = ({ branch, editBranch, deleteBranch }) => {
  let index=0;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              
              <MaterialTable
                title="Branch"
                data={branch}
                columns={[
                  {
                    title: "Id",
                    export: true,
                    render: (branch) => {
                      return ++index
                    },
                  },
                  {
                    title: "Name",
                    field: "branchName",
                  },
                  {
                    title: "Location",
                    field: "brancLocation",
                  },
                  //
                ]}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "edit",
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      editBranch(rowData.bId);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete User",
                    iconProps: {style: { color: "#CA0B00" }},
                    onClick: (event, rowData) => {
                      deleteBranch(rowData.bId);
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
