let tableIndex = 1;

function addMemberToTable() {
    const memberName = document.getElementById("member-form-name").value;
    const memberPhone = document.getElementById("member-form-phone").value;
    const memberEmail = document.getElementById("member-form-email").value;
    const table = document.querySelector("#member-table");
    if (tableIndex === 1) table.innerHTML = "";
    const newTR = table.insertRow(-1);
    newTR.insertCell(0).innerHTML = `<p>${tableIndex}</p>`;
    newTR.insertCell(1).innerHTML = `<input type="text" disabled="true" class="form-control edit${tableIndex}" value="${memberName}" name="memberName"/>`;
    newTR.insertCell(2).innerHTML = `<input type="text" disabled="true" class="form-control edit${tableIndex}" value="${memberEmail}" name="memberPhone"/>`;
    newTR.insertCell(3).innerHTML = `<input type="text" disabled="true" class="form-control edit${tableIndex}" value="${memberPhone}" name="memberEmail"/>`;
    newTR.insertCell(4).innerHTML = `<input type="file" name="memnerFile"/>`;
    newTR.insertCell(5).innerHTML = `<button class="btn btn-primary" id="edit-button${tableIndex}" onclick="editMember(this)">Edit</button>`;
    tableIndex++;
}

function editMember(x)
{
    var row=x.parentNode.parentNode;
    // console.log(row);
    var rowNumber=row.childNodes[0].childNodes[0].innerHTML;
    var inputList=document.getElementsByClassName(`edit${rowNumber}`);
    inputList[0].disabled="";
    inputList[1].disabled="";
    inputList[2].disabled="";
    document.getElementById(`edit-button${rowNumber}`).innerHTML="Update";
    document.getElementById( `edit-button${rowNumber}` ).setAttribute( "onClick", "javascript: updateRow(this);" );
}

function updateRow(x)
{
    var row=x.parentNode.parentNode;
    // console.log(row);
    var rowNumber=row.childNodes[0].childNodes[0].innerHTML;
    var inputList=document.getElementsByClassName(`edit${rowNumber}`);
    inputList[0].disabled="true";
    inputList[1].disabled="true";
    inputList[2].disabled="true";
    document.getElementById(`edit-button${rowNumber}`).innerHTML="Edit";
    document.getElementById( `edit-button${rowNumber}` ).setAttribute( "onClick", "javascript: editMember(this);" );
}