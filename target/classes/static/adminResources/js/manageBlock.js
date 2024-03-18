function calHouse() {
  var numberOfFloors = document.getElementById("number-of-floors").value;
  var houseOnEachFloor = document.getElementById("house-on-each-floor").value;
  document.getElementById("number-of-house").innerHTML = numberOfFloors * houseOnEachFloor;
}

function emptyForm() {
  const inputs = document.querySelectorAll('.model-form input')
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  document.getElementById("submit").innerHTML = "Submit";
  document.getElementById("ModalLabel").innerHTML = "Add Block"
}

function editBlock(block) {

  // getting model inputs here
  document.getElementById("ModalLabel").innerHTML = "Edit Block"
  document.getElementById("submit").innerHTML = "Update";
  var row = block.parentNode.parentNode;
  document.getElementById("block-id").value = row.childNodes[1].value;
  document.getElementById("block-name").value = row.cells[0].innerHTML;
  document.getElementById("number-of-floors").value = row.cells[1].innerHTML;
  document.getElementById("house-on-each-floor").value = row.cells[2].innerHTML;
  document.getElementById("type-of-house").value = row.cells[3].innerHTML;
  document.getElementById("number-of-house").innerHTML = row.cells[1].innerHTML * row.cells[2].innerHTML;
  document.getElementById("number-of-floors-search").innerHTML=""
}