//Ajax function after change in block value.
function blockChange(x) {
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var blockObj = JSON.parse(htp.responseText);
            changeValues(blockObj)
        }
    };
    htp.open("GET", "http://localhost:8088/searchForFloor/" + x.value, true);
    htp.send();
    document.getElementById("ModalLabel").innerHTML = "Add Owners";
    document.getElementById("submit-model").innerHTML = "Submit";
}

// Floor dropdown after ajax function blockChange(x) for form.
function changeValues(obj) {
    document.getElementById("house-numbers-label").innerHTML = ""
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    document.getElementById("number-of-house").value = obj.houseOnEachFloor;
    var numberOfHouse = document.getElementById("number-of-floors");
    numberOfHouse.innerHTML = "<option selected disabled>Select Floor Number</option>"
    for (let i = 0; i < obj.noOfFloors; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = i + 1;
        numberOfHouse.add(option);
    }
}


// Ajax function after floor value changes for form.
function bringOwnersToform(numberOfHouse, floor, blockNumber) {
    var blockName = document.getElementById("blockSearch").value;
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var ownerList = JSON.parse(htp.responseText);
            createOwnerForm(ownerList, numberOfHouse, floor);
        }
    };
    htp.open("GET", `http://localhost:8088/searchOwners/${floor}/${blockNumber}`, true);
    htp.send();
}

// Creating label for form after ajax function bringOwnersToform(numberOfHouse,
// floor, blockNumber) for form.
function floorChange(floor) {
    console.log(floor)
    var numberOfHouse = document.getElementById("number-of-house").value;
    document.getElementById("house-numbers-label").innerHTML = `<div class="col-lg-2">
  <label for="type-of-house" class="col-form-label"
  >Houses No:
  </label>
  </div><div class="col-lg-5">
  <label for="type-of-house" class="col-form-label"
  >Owner Name:
  </label>
  </div><div class="col-lg-5">
  <label for="type-of-house" class="col-form-label"
  >Owner Email Address:
  </label>
  </div>`
    var blockNumber = document.getElementById("block-name-form").value;
    bringOwnersToform(numberOfHouse, floor.value, blockNumber);
    document.getElementById("ModalLabel").innerHTML = "Add Owners";
    document.getElementById("submit-model").innerHTML = "Submit";
}

// Creates Owner form after ajax function bringOwnersToform(numberOfHouse,
// floor, blockNumber) for form.
function createOwnerForm(ownerList, numberOfHouse, floor) {

    if (ownerList.length !== 0) {
        document.getElementById("ModalLabel").innerHTML = "Edit Owners";
        document.getElementById("submit-model").innerHTML = "Update";
    }
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    for (let i = 0; i < numberOfHouse; i++) {
        var prevoiusHouse = document.getElementById("house-numbers-ownwers").innerHTML;
        document.getElementById("house-numbers-ownwers").innerHTML = prevoiusHouse + `<div class="row mb-2" ><div class="col-lg-2">
<input
          type="hidden"
          class="form-control"
          id="type-of-house"
          value="${ownerList.length === 0 ? 0 : ownerList[i].id}"
          name="ownerId"
          />
          <input
          type="text"
          class="form-control"
          id="type-of-house"
          value="${ownerList.length === 0 ? (parseInt(floor) * 100 + i + 1) : ownerList[i].houseNo}"
          name="houseNo"
          />
      </div>
    <div class="col-lg-5">
    <input
          type="text"
          placeholder="Type Owner Name"
          class="form-control"
          id=""
          value="${ownerList.length === 0 ? '' : ownerList[i].ownerName}"
          name="ownerName"
    /></div>
 <div class="col-lg-5">
    <input
          type="text"
          placeholder="Type Owner Email Address"
          class="form-control"
          id=""
          value="${ownerList.length === 0 ? '' : ownerList[i].ownerEmail}"
          name="ownerEmail"
    /></div>`
    }
}

// Ajax function after block changes for table.
function blockChangeForTable(x) {
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var blockObj = JSON.parse(htp.responseText);
            changeFloorsForTable(blockObj)
        }
    };
    htp.open("GET", "http://localhost:8088/searchForFloor/" + x.value, true);
    htp.send();
}

// Floor dropdown after ajax function blockChangeForTable(x) for table.
function changeFloorsForTable(obj) {
    document.getElementById("house-numbers-label").innerHTML = ""
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    var numberOfHouse = document.getElementById("number-of-floors-search");
    numberOfHouse.innerHTML = "<option selected disabled>Select Floor Number</option>"
    for (let i = 0; i < obj.noOfFloors; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = i + 1;
        numberOfHouse.add(option);
    }
}

// Ajax function after floor values changes for table.
function bringOwnersToTable(floor) {
    var blockName = document.getElementById("blockSearch").value;
    var floorNumber = floor.value;
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var ownerObj = JSON.parse(htp.responseText);
            createTable(ownerObj);
        }
    };
    htp.open("GET", `http://localhost:8088/searchOwners/${floorNumber}/${blockName}`, true);
    htp.send();
}

// Creating owner table after ajax function bringOwnersToTable(floor) for table.
function createTable(listOfOwners) {
    var table = document.querySelector("#owner-table");
    table.innerHTML = "";
    if (listOfOwners.length === 0) {
        table.innerHTML = `<tr>
                              <td colspan="5" style="text-align: center; padding: 50px">No Owner Details Found For Block and Floor.</td>
                            </tr>`
    }
    for (var index = 0; index < listOfOwners.length; index++) {
        var newTR = table.insertRow(-1);
        newTR.insertCell(0).innerHTML = `<p>${1 + index
        }</p>`;
        newTR.insertCell(1).innerHTML = `${listOfOwners[index].houseNo}`;
        newTR.insertCell(2).innerHTML = `${listOfOwners[index].ownerName}`;
        newTR.insertCell(3).innerHTML = `${listOfOwners[index].ownerEmail}`;
        newTR.insertCell(4).innerHTML = `<button onclick="editOwner(${listOfOwners[index].id})" class="btn btn-primary"  data-toggle="modal"
                        data-target="#exampleModal-3">Edit</button>`;
    }
}

//Ajax for editing Owner Name
function editOwner(ownerId) {
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var ownerObj = JSON.parse(htp.responseText);
            createEditOwnerForm(ownerObj)
        }
    };
    htp.open("GET", `http://localhost:8088/findOwner/${ownerId}`, true);
    htp.send();
}

var editOwnerObj;

//Create Model For Owner Edit.
function createEditOwnerForm(ownerObj) {
    editOwnerObj = ownerObj;
    document.getElementById("owner-edit-id").value = ownerObj.id;
    document.getElementById("owner-edit-name").value = ownerObj.ownerName;
    document.getElementById("owner-edit-email").value = ownerObj.ownerEmail;
    document.getElementById("block").value = ownerObj.blockVo.id;
    document.getElementById("floor").value = ownerObj.floorNo;
    document.getElementById("block").innerHTML = ownerObj.blockVo.blockName;
    document.getElementById("floor").innerHTML = ownerObj.floorNo;
    document.getElementById("owner-edit-house-no").value = ownerObj.houseNo;
}


function updateOwnerObj() {
    editOwnerObj.ownerName = document.getElementById("owner-edit-name").value;
    editOwnerObj.ownerEmail = document.getElementById("owner-edit-email").value;
    editOwnerObj.houseNo = document.getElementById("owner-edit-house-no").value;
    updateOwner(editOwnerObj);
}

function updateOwner(ownerObj) {
    var htp = new XMLHttpRequest();
    htp.open("PUT", "http://localhost:8088/updateOwner", true);
    htp.setRequestHeader("Content-Type", "application/json");
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            bringOwnersToTable(document.getElementById("number-of-floors-search"));
        }
    };
    htp.send(JSON.stringify(ownerObj));
}

// Emptying form after close button.
function emptyForm() {
    const inputs = document.querySelectorAll('.model-form input selector')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    document.getElementById("submit-model").innerHTML = "Submit";
    document.getElementById("ModalLabel").innerHTML = "Add Owners"
    document.getElementById("house-numbers-label").innerHTML = "";
    document.getElementById("number-of-house").value = "- -"
    document.getElementById("number-of-floors").innerHTML = " <option value=''>- -</option>";
    document.getElementById("block-name-form").value = "null";
}
