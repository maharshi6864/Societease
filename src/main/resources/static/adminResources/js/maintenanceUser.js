var date = new Date();

var ownerObj;

function printInvoice() {
  const divToPrint = document.getElementById("bordered-div");

  if (!divToPrint) {
    console.error("Div with id 'bordered-div' not found!");
    return;
  }

  // Get the content of the div
  const divContent = divToPrint.outerHTML;

  // Open a new window
  const printWindow = window.open("", "_blank");

  // Write the content to the new window, including styles
  printWindow.document.write(`
        <html>
        <head>
            <title>Print Invoice</title>
            <style>
                /* Copy styles from the main page */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                ${Array.from(document.styleSheets)
                  .map((styleSheet) => {
                    try {
                      return Array.from(styleSheet.cssRules)
                        .map((rule) => rule.cssText)
                        .join("\n");
                    } catch (e) {
                      console.warn(
                        "Cannot access stylesheet:",
                        styleSheet.href
                      );
                      return "";
                    }
                  })
                  .join("\n")}
            </style>
        </head>
        <body>
            ${divContent}
        </body>
        </html>
    `);

  // Wait for the content to load, then print
  printWindow.document.close();
  printWindow.focus();

  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
}

function getMaintenance() {
  let month = document.getElementById("month").value;
  document.getElementById(
    "invoice-heading"
  ).innerHTML = `${month} ${date.getFullYear()}`;
  var htp = new XMLHttpRequest();
  htp.onreadystatechange = function () {
    if (htp.readyState == 4) {
      var maintenanceChargesObjs = JSON.parse(htp.responseText);
      printMaintenanceTable(maintenanceChargesObjs);
    }
  };
  htp.open("GET", `http://localhost:8088/user/getMaintenance/${month}`, true);
  htp.send();
}

function printMaintenanceTable(maintenanceList) {
  maintenanceChargesObjs = maintenanceList[1];
  var table = document.querySelector("#maintenance-table-view");
  table.innerHTML = "";
  if (maintenanceChargesObjs.length === 0) {
    table.innerHTML = `<tr>
<td colspan="4" class="text-center">
<div class="d-flex justify-content-center align-items-center flex-column" style="padding: 100px"><p  >No Maintenance Details Found For selected Year And House Type.</p></div>
</td>
</tr>`;
  }
  document.getElementById("amount-total").innerHTML = "0";
  for (var index = 0; index < maintenanceChargesObjs.length; index++) {
    var newTR = table.insertRow(-1);
    newTR.classList.add("text-right");
    newTR.style.height = "0px";
    let cell1 = newTR.insertCell(0);
    cell1.classList.add("text-left");
    cell1.style.height = "0px";
    cell1.innerHTML = `${1 + index}`;
    let cell2 = newTR.insertCell(1);
    cell2.classList.add("text-left");
    cell2.style.height = "0px";
    cell2.innerHTML = `${maintenanceChargesObjs[index].maintenanceType}`;
    let cell3 = newTR.insertCell(2);
    cell3.innerHTML = `&#8377;${maintenanceChargesObjs[index].amount}`;
    cell3.style.height = "0px";
    document.getElementById("amount-total").innerHTML =
      parseInt(document.getElementById("amount-total").innerHTML) +
      parseInt(maintenanceChargesObjs[index].amount);
  }

  if (maintenanceList[2].maintenanceStatus === true) {
    document.getElementById("paid-div").style.display = "";
    document.getElementById("pending-div").style.display = "none";
    document.getElementById("pay-button").style.display = "none ";
    document.getElementById("print-button").style.display = "";
  } else {
    document.getElementById("paid-div").style.display = "none";
    document.getElementById("pending-div").style.display = "";
    document.getElementById("pay-button").style.display = "";
    document.getElementById("print-button").style.display = "none ";
  }
}

function getDetails() {
  let date = new Date();
  document.getElementById(
    "month"
  ).innerHTML = ` <option value="January">January ${date.getFullYear()}</option>
                                    <option value="February">February ${date.getFullYear()}</option>
                                    <option value="March">March ${date.getFullYear()}</option>
                                    <option value="April">April ${date.getFullYear()}</option>
                                    <option value="May">May ${date.getFullYear()}</option>
                                    <option value="June">June ${date.getFullYear()}</option>
                                    <option value="July">July ${date.getFullYear()}</option>
                                    <option value="August">August ${date.getFullYear()}</option>
                                    <option value="September">September ${date.getFullYear()}</option>
                                    <option value="October">October ${date.getFullYear()}</option>
                                    <option value="November">November ${date.getFullYear()}</option>
                                    <option value="December">December ${date.getFullYear()}</option>`;
  var htp = new XMLHttpRequest();
  htp.onreadystatechange = function () {
    if (htp.readyState == 4) {
      ownerObj = JSON.parse(htp.responseText);
      printDetails(ownerObj);
    }
  };
  htp.open("GET", "http://localhost:8088/user/getCurrentOwner", true);
  htp.send();
}

function printDetails(ownerObj) {
  let owner = ownerObj[0];
  let society = ownerObj[1];
  document.getElementById(
    "socityAddress"
  ).innerHTML = `<b>${society.societyName}</b>
<br>${society.socityAddress}`;
  document.getElementById("owner-name").innerHTML = `${owner.ownerName}`;
  document.getElementById("house-number").innerHTML = `/${owner.houseNo}`;
  document.getElementById(
    "block-name"
  ).innerHTML = `${owner.blockVo.blockName}`;
  document.getElementById(
    "owner-address"
  ).innerHTML = `${society.societyName}<br>${society.socityAddress}`;
  document.getElementById(
    "invoice-heading"
  ).innerHTML = `${owner.blockVo.blockName}/${owner.houseNo}`;
  var date = new Date();
  document.getElementById("invoice-date").innerHTML = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  document.getElementById("invoice-title").innerHTML = `${society.societyName}`;
  var monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("month").value = monthList[date.getMonth()];
  getMaintenance();
}

// First Function to Create Order Id.
async function payMaintenance() {
  let paymentAmount = document.getElementById("amount-total").innerHTML;
  let month = document.getElementById("month").value;
  let description = `Maintenance paid for ${month} ${date.getFullYear()}`;
  let ownerDetails = ownerObj[0];
  console.log(ownerDetails);
  if (paymentAmount > 0) {
    try {
      // Making GET request to create the order
      // let response = await fetch(payMaintenance/${paymentAmount});
      let response = await fetch(`payMaintenance/${paymentAmount}`);

      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      let serverSideRazorPay = JSON.parse(data.razorPay);
      console.log(serverSideRazorPay);

      // Razorpay options
      let option = {
        key: "rzp_test_lSxFEtSAXFYF8P",
        amount: paymentAmount * 100,
        currency: "INR",
        name: "SocietEase",
        description: description,
        // image: "http://localhost:7081/userResources/images/logo1.jpg",//logo image
        order_id: data.razorPay.id,
        handler: function (responseFromRazorPay) {
          paymentSuccess(serverSideRazorPay, responseFromRazorPay);
        },
        prefill: {
          name: ownerDetails.ownerName,
          email: ownerDetails.loginVo.username,
          contact: ownerDetails.phoneNo,
        },
        notes: {
          address: "document.getElementById().value",
        },
        theme: {
          color: "#3399cc",
        },
      };

      let rzp = new Razorpay(option);

      rzp.on("payment.failed", function (responseFromRazorPay) {
        paymentFailed(responseFromRazorPay);
      });

      rzp.open();
      console.log(data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }
}

async function paymentSuccess(serverSideRazorPay, responseFromRazorPay) {
  let paymentConfimEntity = {
    orderId: serverSideRazorPay.id,
    paymentId: responseFromRazorPay.razorpay_payment_id,
    month: document.getElementById("month").value,
    year: date.getFullYear(),
    amount: document.getElementById("amount-total").innerHTML,
  };

  console.log(paymentConfimEntity);
  let data;
  try {
    // Making POST request to finalize the payment
    let response = await fetch("maintenancePaymentConfirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentConfimEntity),
    });

    if (response.status) {
      swal({
        title: "Payment Confirmed!",
        text: `Your payment for month ${paymentConfimEntity.month} and year ${paymentConfimEntity.year}.`,
        icon: "success",
        button: {
          text: "Continue",
          value: true,
          onclick: "closeConfirmBox()",
          visible: true,
          className: "btn btn-primary",
        },
      });
      setTimeout(() => {
        window.location.href = "maintenance";
      }, 2500);
    } else {
      swal({
        title: "Payment Canceled!",
        text: "If the amount has been debited i will be creadited in your account within 7-days.",
        icon: "warning",
        buttons: {
          text: "Continue",
          value: true,
          visible: true,
          className: "btn btn-primary",
        },
      });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
}

function paymentFailed(responseFromRazorPay) {
  console.log(responseFromRazorPay.error.code);
  console.log(responseFromRazorPay.error.description);
  console.log(responseFromRazorPay.error.source);
  console.log(responseFromRazorPay.error.step);
  console.log(responseFromRazorPay.error.reason);
  console.log(responseFromRazorPay.error.metadata.order_id);
  swal({
    title: "Payment Canceled!",
    text: "If the amount has been debited i will be creadited in your account within 7-days.",
    icon: "warning",
    button: {
      text: "Continue",
      value: true,
      visible: true,
      className: "btn btn-primary",
    },
  });
}

window.addEventListener("load", getDetails);

function closeConfirmBox() {
  window.location.href = "maintenance";
}
