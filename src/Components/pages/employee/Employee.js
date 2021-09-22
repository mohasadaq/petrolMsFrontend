import React from "react";
import MaterialTable from 'material-table'

const Employee = ({ employee, deleteEmployee, editEmployee }) => {

  let index=0
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <MaterialTable
                title="Employee"
                data={employee}
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
                    field: "empName",
                  },
                  {
                    title: "phone",
                    field: "empTell",
                  },
                  {
                    title: "Address",
                    field: "empAddress",
                  },
                  {
                    title: "Gender",
                    field: "empGender",
                  },
                  {
                    title: "user type",
                    field: "usertype",
                  },
                  {
                    title: "branch name",
                    field: "branch.branchName",
                  },
                  //
                ]}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "edit",
                    iconProps: {style: { color: "#01579b" }},
                    onClick: (event, rowData) => {
                      editEmployee(rowData.emId);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete Employee",
                    iconProps: {style: { color: "#CA0B00" }},
                    onClick: (event, rowData) => {
                      deleteEmployee(rowData.emId);
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

export default Employee;
