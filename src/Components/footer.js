import $ from "jquery";
import React, { useEffect } from "react";
import CompanyService from "../service/ComponayService";
export default function Footer() {
  useEffect(() => {
    SystemDetails();
  }, []);
  //conpanay details
  const SystemDetails = () => {
    CompanyService.getCompanyServiceAll().then((response) => {

      if (response.length>0) {
        
        $("#com_name").text(response.data[0].cmpname);
        $("#com_phone").text(response.data[0].cmpphone);
      }
    });
  };

  return (
    <div>
      <footer class="footer">
        <div class="row ">
          <div class="col-md-6 ">
            <a href="" style={{ fontSize: 17 }} id="com_name"></a>
          </div>
          <div class="col-md-6">
            <div class="text-md-end footer-links d-none d-sm-block text-right mr-0">
              <a
                href="javascript:void(0);"
                className="mr-0"
                style={{ fontSize: 17 }}
              >
                Contect Us
              </a>
              <a
                href="javascript:void(0);"
                className="ml-1"
                id="com_phone"
                style={{ fontSize: 17 }}
              ></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
