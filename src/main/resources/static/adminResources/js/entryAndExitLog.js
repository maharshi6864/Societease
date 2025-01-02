$(document).ready(function () {
  $("#custom-dataTable").DataTable({
    processing: true, // Show a processing indicator
    serverSide: false, // Client-side processing (set to true for server-side processing)
    ajax: {
      url: "getVehicleEntryAndExitLogs", // Replace with your server endpoint
      type: "GET", // HTTP method
      dataSrc: "", // Assuming the server response is a plain array
      error: function (xhr, error, thrown) {
        console.error("Error fetching data:", error);
      },
    },
    columns: [
      { data: "time", title: "Time" },
      { data: "data", title: "Data" },
      { data: "vehicleNumber", title: "Vehicle Number" },
      { data: "knowUnknownStatus", title: "Status" },
      { data: "ownerId", title: "Owner ID" },
      {
        data: "imageURL",
        title: "Image",
        render: function (data) {
          return data
            ? `<img src="${data}" alt="Vehicle Image" style="width: 100px; height: auto;">`
            : "No Image";
        },
      },
    ],
    responsive: true, // Enable responsive design
  });
});
