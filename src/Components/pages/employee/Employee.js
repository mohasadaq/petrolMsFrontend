import React from "react";
import MaterialTable from 'material-table'

const Employee = ({ employee, deleteEmployee, editEmployee }) => {
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
                    field: "emId",
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
                  //
                ]}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "edit",
                    onClick: (event, rowData) => {
                      editEmployee(rowData.emId);
                    },
                  },
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete Employee",
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
