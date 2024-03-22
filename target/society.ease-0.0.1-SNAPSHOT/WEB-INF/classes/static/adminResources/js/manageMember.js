//Ajax function after change in block value.
function blockChange(x) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var blockObj = JSON.parse(htp.responseText);
            changeValues(blockObj)
        }
    };
    htp.open("GET", "http://localhost:8088/searchForFloor/" + x.value, true);
    htp.send();
}

// Floor dropdown after ajax function blockChange(x) for form.
function changeValues(obj) {
    let numberOfHouse = document.getElementById("number-of-floors");
    numberOfHouse.innerHTML = "<option selected disabled>Select Floor Number</option>"
    for (let i = 0; i < obj.noOfFloors; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = i + 1;
        numberOfHouse.add(option);
    }
}

//Ajax to bring Owners objs.
function floorChange(floor) {
    let blockName = document.getElementById("blockSearch").value;
    let floorNumber = floor.value;
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var ownerObj = JSON.parse(htp.responseText);
            changeOwnerValues(ownerObj);
        }
    };
    htp.open("GET", `http://localhost:8088/searchOwners/${floorNumber}/${blockName}`, true);
    htp.send();
}

function changeOwnerValues(listOfOwners) {
    let ownerDetails = document.getElementById("owner-details");
    ownerDetails.innerHTML = "<option selected disabled>Select House No</option>"
    for (let i = 0; i < listOfOwners.length; i++) {
        let option = document.createElement("option");
        option.value = `${listOfOwners[i].id}`
        option.text = `${listOfOwners[i].houseNo + "  " + listOfOwners[i].ownerName}`;
        ownerDetails.add(option);
    }
    if (listOfOwners.length === 0) {
        ownerDetails.innerHTML = "<option selected disabled>No House At This Floor.</option>"
    }
}

let tableIndex = 1;

function addMemberToTable() {
    const memberName = document.getElementById("member-form-name").value;
    const memberPhone = document.getElementById("member-form-phone").value;
    const memberEmail = document.getElementById("member-form-email").value;
    const table = document.querySelector("#member-table");
    if (tableIndex === 1) table.innerHTML = "";
    const newTR = table.insertRow(-1);
    newTR.insertCell(0).innerHTML = `<p>${tableIndex}</p>`;
    newTR.insertCell(1).innerHTML = `<input class="form-control edit${tableIndex}" name="memberName" value="${memberName}">`;
    newTR.insertCell(2).innerHTML = `<input class="form-control edit${tableIndex}" name="memberPhone" value="${memberPhone}">`;
    newTR.insertCell(3).innerHTML = `<input class="form-control edit${tableIndex}" name="memberEmail" value="${memberEmail}">`;
    newTR.insertCell(4).innerHTML = `<input type="file" name="memberFile" accept="image/x-png,image/gif,image/jpeg"/>`;
    newTR.insertCell(5).innerHTML = `<button type="button" class="btn btn-outline-danger" id="edit-button${tableIndex}" onclick="deleteMember(this)">Delete</button>`;
    tableIndex++;
}

function deleteMember(x) {
    const table = document.querySelector("#member-table");
    let row = x.parentNode.parentNode;
    console.log(row.rowIndex);
    table.deleteRow(row.rowIndex - 1);
}

function blockChangeForTable(x) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var blockObj = JSON.parse(htp.responseText);
            changeFloorsForTable(blockObj);
        }
    };
    htp.open("GET", "http://localhost:8088/searchForFloor/" + x.value, true);
    htp.send();
}

function changeFloorsForTable(blockObj) {
    let numberOfHouse = document.getElementById("floorSearchForTable");
    numberOfHouse.innerHTML = "<option selected disabled>Select Floor Number</option>"
    for (let i = 0; i < blockObj.noOfFloors; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = i + 1;
        numberOfHouse.add(option);
    }
}

function floorChangeForTable(floor) {
    let blockName = document.getElementById("blockSearchForTable").value;
    let floorNumber = floor.value;
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            var ownerObj = JSON.parse(htp.responseText);
            changeOwnerForTables(ownerObj);
        }
    };
    htp.open("GET", `http://localhost:8088/searchOwners/${floorNumber}/${blockName}`, true);
    htp.send();
}

function changeOwnerForTables(listOfOwners) {
    let ownerDetails = document.getElementById("ownerSearchForTable");
    ownerDetails.innerHTML = "<option selected disabled>Select House No</option>"
    for (let i = 0; i < listOfOwners.length; i++) {
        let option = document.createElement("option");
        option.value = `${listOfOwners[i].id}`
        option.text = `${listOfOwners[i].houseNo + "  " + listOfOwners[i].ownerName}`;
        ownerDetails.add(option);
    }
    if (listOfOwners.length === 0) {
        ownerDetails.innerHTML = "<option selected disabled>No House At This Floor.</option>"
    }
}

function ownerChangeForTable(owner) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            let membersObj = JSON.parse(htp.responseText);
            createTableForMember(membersObj);
        }
    };
    htp.open("GET", `http://localhost:8088/searchMembers/${owner.value}`, true);
    htp.send();
}

function createTableForMember(listOfMembers) {
    var table = document.querySelector("#member-table-view");
    table.innerHTML = "";
    if (listOfMembers.length === 0) {
        table.innerHTML = `<tr>
                              <td colspan="5" style="text-align: center; padding: 50px">No Owner Details Found For Block and Floor.</td>
                            </tr>`
    }
    for (var index = 0; index < listOfMembers.length; index++) {
        var newTR = table.insertRow(-1);
        newTR.insertCell(0).innerHTML = `<p>${1 + index
        }</p>`;
        newTR.insertCell(1).innerHTML = `${listOfMembers[index].memberName}`;
        newTR.insertCell(2).innerHTML = `${listOfMembers[index].memberPhoneNo}`;
        newTR.insertCell(3).innerHTML = `${listOfMembers[index].memberEmail}`;
        newTR.insertCell(4).innerHTML = `<button class="btn btn-outline-info" onclick="editMember(${listOfMembers[index].id})">Edit</button> <button class="btn btn-outline-danger" onclick="deleteMemberForTable(${listOfMembers[index].id})" >Delete</button>`
    }
}

function editMember(memberId) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            let membersObj = JSON.parse(htp.responseText);
            changeEditMemberForm(membersObj);
        }
    };
    htp.open("GET", `http://localhost:8088/getMember/${memberId}`, true);
    htp.send();
}

function deleteMemberForTable(memberId) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            ownerChangeForTable(document.getElementById("ownerSearchForTable"));
        }
    };
    htp.open("GET", `http://localhost:8088/deleteMembers/${memberId}`, true);
    htp.send();
}

function changeEditMemberForm(membersObj) {

}