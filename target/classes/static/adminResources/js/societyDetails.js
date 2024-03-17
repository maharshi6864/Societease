function enableInputs() {
  document.getElementById("submit").style.display = "";
  document.getElementById("edit").style.display = "none";
  var inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = "";

  }
}

function disabledInputs() {
  document.getElementById("submit").style.display = "";
  document.getElementById("edit").style.display = "none";
  var inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = "true";

  }
}

function checkId() {
  var sId = document.getElementById("s-id").value;
  if (sId == "0") {
    enableInputs();
    document.getElementById("submit").value = "Submit";
  }
}