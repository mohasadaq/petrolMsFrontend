// validates form inputs
import $ from "jquery";


class AppFunction {
 validate_form_inputs(inputs, selector = "#") {
    let inputs_value = {};
    let input
    let error;
    for (input of inputs) {
        let value = null;
        try {
            value = $(`${selector}${input}`).val().trim();
            value = value === "null" ? null : value;
        } catch (error) {
            value = $(`${selector}${input}`).val();
        }

        if (value == "" || value == null) {
            $(`${selector}${input}`).css("border", "1px solid red");
            $(`${selector}${input}`).focus();
            // toastr.error(`the ${input} field is required`);

            inputs_value = null;
            break;
        } else {
            $(`${selector}${input}`).css("border", "1px solid rgba(0,0,0,.2)");
            error = true;
            inputs_value[input] = $(`${selector}${input}`).val();
        }
    }
    return inputs_value;
}




 make_special_id(prefix, size, id) {
    let zeros = "";
    let s = 0;
    while (s < size) {
        zeros += "0";
        s++;
    }
    if (zeros.length < String(id).split("").length) {
        return prefix + id;
    }
    return (
        prefix + zeros.substr(0, zeros.length - String(id).split("").length) + id
    );
}


 unset(inputs, selector = "#") {
    inputs.forEach((input) => {
        if ($(`${selector}${input}`).attr("type") !== undefined) {
            $(`${selector}${input}`).val(null);
        } else {
            $(`${selector}${input} option:first`).prop("selected", true);
            $(`${selector}${input}`).val("null").trigger("change");
        }
        $(`${selector}${input}`).css("border", "1px solid rgba(0,0,0,.2)");
    });
}


//  loading_button(button, state) {
//     let btn = Ladda.create(document.querySelector(button));
//     state === "loading" ? btn.start() : btn.stop();
// }

 load_spinner(state) {
    $.fakeLoader({
        loading: state,
    });
}




 reset(inputs) {
     let input
    for (input of inputs) {
        if ($(`#${input}`).attr("type") === undefined) {
            $(`#${input} option:eq(0)`).prop("selected", true);
            // $(`#${input}`).text('');
        } else {
            $(`#${input}`).val("");
        }
    }
}



 massage(massage,Icon ="success") {
    $.toast({
      heading: "Success",
      text: massage,
      icon: Icon,
      position: "top-right",
      loader: true, // Change it to false to disable loader
      loaderBg: "#28ad7c", // To change the background #28ad7c
    });
  }



validate_fileupload(fileName)
{
    var allowed_extensions = new Array("jpg","png","gif");
    var file_extension = fileName.split('.').pop().toLowerCase(); // split  will split the filename by dot(.), and pop  will pop the last element from the array which will give you the extension as well. If there will be no extension then it will return the filename.

    for(var i = 0; i <= allowed_extensions.length; i++)
    {
        if(allowed_extensions[i]==file_extension)
        {
            return true; // valid file extension
        }
    }

    return false;
}



 success(success) {
    $.toast({
      heading: "Success",
      text: success,
      icon: "success",
      position: "top-right",
      loader: true, // Change it to false to disable loader
      loaderBg: "#28ad7c", // To change the background
    });
  }
}

export default new AppFunction();
