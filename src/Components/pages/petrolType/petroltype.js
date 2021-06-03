import React from 'react'
import MaterialTable from 'material-table'
import Icons from '../Icons'
const PetrolType = ({ PetrolType, deletePetrolType, editPetrolType }) => {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <MaterialTable
                  title="Petrol Type"
                  data={PetrolType}
                  columns={[
                    {
                      title: "PtId",
                      field: "ptId",
                    },
                    {
                      title: "Petrol Type",
                      field: "p_type",
                    },
                  ]}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "edit",
                      onClick: (event, rowData) => {
                        editPetrolType(rowData.ptId);
                      },
                    },
                    (rowData) => ({
                      icon: "edit",
                      tooltip: "Delete User",
                      onClick: (event, rowData) => {
                        deletePetrolType(rowData.ptId);
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
                  icons={Icons}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default PetrolType;