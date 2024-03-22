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
    console.log(row.childNodes[0].childNodes.innerHTML);
    console.log(row.rowIndex);
    table.deleteRow(row.rowIndex - 1);
    updateRowCount(table);
    tableIndex--;
}

function updateRowCount(table) {
    var rowcountAfterDelete = table.rows.length;
    for (var i = 0; i < rowcountAfterDelete; i++) {
        table.rows[i].childNodes[0].childNodes[0].innerHTML = i + 1;
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

function changeEditMemberForm(membersObj) {

}

function editMember(memberId) {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState == 4) {
            let membersObj = JSON.parse(htp.responseText);
            changeEditMemberForm(membersObj);
        }
    };
    htp.open("GET", `http://localhost:8088/user/getMembersById/${memberId}`, true);
    htp.send();
}

function changeEditMemberForm(memberObj) {
    document.getElementById("member-id").value = memberObj.id;
    document.getElementById("member-name").value = memberObj.memberName;
    document.getElementById("member-phone").value = memberObj.memberEmail;
    document.getElementById("member-email").value = memberObj.memberPhoneNo;

}