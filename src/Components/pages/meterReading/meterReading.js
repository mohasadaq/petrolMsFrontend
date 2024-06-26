import React from "react";
import MaterialTable from "material-table";
import { ToastContainer, toast } from "react-toastify";

const MeterReading = ({
  meterReading,
  deleteMeterReading,
  editMeterReading,
}) => {
  let index=0
  return (
    <>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                
                <MaterialTable
                  onRowClick={(event, rowData) => {
                    if (rowData.numberofliterinloan == 0)
                      toast.info("No Loan Available");
                  }}
                  title="Meter Reading"
                  data={meterReading}
                  columns={[
                    {
                      title: "Id",
                      export: true,
                      render: () => {
                        return ++index
                      },
                    },
                    {
                      title: "petrol type",
                      field: "petrolTypeModel.p_type",
                    },
                    {
                      title: "Start Reading",
                      field: "startReading",
                    },
                    {
                      title: "End Reading",
                      field: "endReading",
                    },
                    {
                      title: "Price Per Liter",
                      render: (meterReading) => {
                        return `$${meterReading.pricePerltrId}`;
                      },
                    },
                    {
                      title: "number of Liter Sold",
                      export: true,
                      render: (meterReading) => {
                        return `${
                          meterReading.endReading - meterReading.startReading
                        }`;
                      },
                    },
                    {
                      title: "Amount",
                      export: true,
                      render: (meterReading) => {
                        return `$${
                          (meterReading.endReading -
                            meterReading.startReading) *
                          meterReading.pricePerltrId
                        }`;
                      },
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
                        editMeterReading(rowData.mtrrdId);
                      },
                    },
                    (rowData) => ({
                      icon: "delete",
                      tooltip: "Delete Burchase",
                      iconProps: {style: { color: "#CA0B00" }},
                      onClick: (event, rowData) => {
                        deleteMeterReading(rowData.mtrrdId);
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
      <ToastContainer />
    </>
  );
};
export default MeterReading;
