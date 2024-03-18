function blockChange(x) {
    var htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var blockObj = JSON.parse(htp.responseText);
            changeValues(blockObj)
            console.log("block changed")
        }
    };
    htp.open("GET", "http://localhost:8088/searchForFloor/" + x.value, true);
    htp.send();
    document.getElementById("ModalLabel").innerHTML = "Add Owners";
    document.getElementById("submit-model").innerHTML = "Submit";
}

//Call value function when floor value changes;
function floorChange(floor) {
    console.log(floor)
    var numberOfHouse = document.getElementById("number-of-house").value;
    document.getElementById("house-numbers-label").innerHTML = `<div class="col-lg-4">
  <label for="type-of-house" class="col-form-label"
  >Houses No:
  </label>
  </div><div class="col-lg-8">
  <label for="type-of-house" class="col-form-label"
  >Owner Name:
  </label>
  </div>`
    var blockNumber = document.getElementById("block-name-form").value;
    bringOwnersToform(numberOfHouse, floor.value, blockNumber);
    document.getElementById("ModalLabel").innerHTML = "Add Owners";
    document.getElementById("submit-model").innerHTML = "Submit";
}


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


function changeValues(obj) {
    console.log(obj)
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


function changeFloorsForTable(obj) {
    console.log(obj)
    document.getElementById("house-numbers-label").innerHTML = ""
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    document.getElementById("number-of-house").value = obj.houseOnEachFloor;
    var numberOfHouse = document.getElementById("number-of-floors-search");
    numberOfHouse.innerHTML = "<option selected disabled>Select Floor Number</option>"
    for (let i = 0; i < obj.noOfFloors; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = i + 1;
        numberOfHouse.add(option);
    }
}


function bringOwnersToform(numberOfHouse, floor, blockNumber) {
    var blockName = document.getElementById("blockSearch").value;
    console.log(`http://localhost:8088/searchOwners/${floor}/${blockNumber}`);
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

//Creates Owner input boxes.
function createOwnerForm(ownerList, numberOfHouse, floor) {

    if (ownerList.length !== 0) {
        document.getElementById("ModalLabel").innerHTML = "Edit Owners";
        document.getElementById("submit-model").innerHTML = "Update";
    }
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    for (let i = 0; i < numberOfHouse; i++) {
        var prevoiusHouse = document.getElementById("house-numbers-ownwers").innerHTML;
        document.getElementById("house-numbers-ownwers").innerHTML = prevoiusHouse + `<div class="row mb-2" ><div class="col-lg-4">
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
    <div class="col-lg-8">
    <input
          type="text"
          placeholder="Type Owner Name"
          class="form-control"
          id=""
          value="${ownerList.length === 0 ? '' : ownerList[i].ownerName}"
          name="ownerName"
    />`
    }
}


function bringOwnersToTable(floor) {
    var blockName = document.getElementById("blockSearch").value;
    var floorNumber = floor.value;

    console.log(`http://localhost:8088/searchOwners/${floorNumber}/${blockName}`);
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


function createTable(listOfOwners) {
    var table = document.querySelector("#owner-table");
    table.innerHTML = "";
    if (listOfOwners.length === 0) {
        table.innerHTML = `<tr>
                              <td colspan="3" style="text-align: center; padding: 50px">No Owner Details Found For Block and Floor.</td>
                            </tr>`
        var blockElemet = document.getElementById("block-name-form");
        blockElemet.value=document.getElementById("blockSearch").value;
        console.log(blockElemet);
        blockChange(blockElemet);
       setTimeout(function ()
       {
           var floorNumbers = document.getElementById("number-of-floors");
           floorNumbers.value=document.getElementById("number-of-floors-search").value;
           console.log(floorNumbers.value);
           floorChange(floorNumbers)
       },1000)

    }
    for (var index = 0; index < listOfOwners.length; index++) {
        var newTR = table.insertRow(-1);
        newTR.insertCell(0).innerHTML = `<p>${1 + index
        }</p>`;
        newTR.insertCell(1).innerHTML = `${listOfOwners[index].houseNo}`;
        newTR.insertCell(2).innerHTML = `${listOfOwners[index].ownerName}`;

    }
}

function emptyForm() {
    const inputs = document.querySelectorAll('.model-form input selector')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("house-numbers-ownwers").innerHTML = ""
    document.getElementById("submit-model").innerHTML = "Submit";
    document.getElementById("ModalLabel").innerHTML = "Add Owners"
    document.getElementById("house-numbers-label").innerHTML="";
}
