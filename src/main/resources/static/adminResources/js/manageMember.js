let tableIndex = 1;

function addMemberToTable() {
    console.log("adding")
   if(validateAddMember())
   {
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
       newTR.insertCell(4).innerHTML = `<input  name="memberFile" type="file">`;
       newTR.insertCell(5).innerHTML = `<button type="button" class="btn btn-outline-danger" id="edit-button${tableIndex}" onclick="deleteMember(this)">Delete</button>`;
       tableIndex++;
   }
}

function deleteMember(x) {
    const table = document.querySelector("#member-table");
    let row = x.parentNode.parentNode;
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
    document.getElementById("member-phone").value = memberObj.memberPhoneNo;
    document.getElementById("member-email").value = memberObj.memberEmail;

}

// form validations..

// add member form validations

function validateAddMember() {
    let memberName = document.getElementById("member-form-name");
    let memberPhone = document.getElementById("member-form-phone");
    let memberEmail = document.getElementById("member-form-email");
    let validForm = true;

    if (memberName.value === "") {
        document.getElementById("memberName1-warning").style.display = "";
        document.getElementById("memberName2-warning").style.display = "none";
        memberName.classList.add("is-invalid");
        memberName.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else if (memberName.value.length < 6) {
        document.getElementById("memberName1-warning").style.display = "none";
        document.getElementById("memberName2-warning").style.display = "";
        memberName.classList.add("is-invalid");
        memberName.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else {
        document.getElementById("memberName1-warning").style.display = "none";
        document.getElementById("memberName1-warning").style.display = "none";
        if (memberName.classList.contains("is-invalid")) {
            memberName.classList.add("is-valid");
            memberName.classList.remove("is-invalid");
        }
    }

    let phoneFormat = /^[0-9]{9,10}$/;

    if (memberPhone.value === "") {
        document.getElementById("memberPhone1-warning").style.display = "";
        document.getElementById("memberPhone2-warning").style.display = "none";
        memberPhone.classList.add("is-invalid");
        memberPhone.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else if (!memberPhone.value.match(phoneFormat)) {
        document.getElementById("memberPhone1-warning").style.display = "none";
        document.getElementById("memberPhone1-warning").style.display = "";
        memberPhone.classList.add("is-invalid");
        memberPhone.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else {
        document.getElementById("memberPhone1-warning").style.display = "none";
        document.getElementById("memberPhone2-warning").style.display = "none";
        if (memberPhone.classList.contains("is-invalid")) {
            memberPhone.classList.add("is-valid");
            memberPhone.classList.remove("is-invalid");
        }
    }

    let emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (memberEmail.value === "") {
        document.getElementById("memberEmail1-warning").style.display = "";
        document.getElementById("memberEmail2-warning").style.display = "none";
        document.getElementById("memberEmail3-warning").style.display = "none";
        memberEmail.classList.add("is-invalid");
        memberEmail.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else if (!memberEmail.value.match(emailFormat)) {
        document.getElementById("memberEmail1-warning").style.display = "none";
        document.getElementById("memberEmail2-warning").style.display = "";
        document.getElementById("memberEmail3-warning").style.display = "none";
        memberEmail.classList.add("is-invalid");
        memberEmail.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else if (usedMemberEmails.includes(memberEmail.value)) {
        document.getElementById("memberEmail1-warning").style.display = "none";
        document.getElementById("memberEmail2-warning").style.display = "none";
        document.getElementById("memberEmail3-warning").style.display = "";
        memberEmail.classList.add("is-invalid");
        memberEmail.setAttribute("onkeyup", "validateAddMember()");
        validForm = false;
    } else {
        document.getElementById("memberEmail1-warning").style.display = "none";
        document.getElementById("memberEmail2-warning").style.display = "none";
        document.getElementById("memberEmail3-warning").style.display = "none";
        if (memberEmail.classList.contains("is-invalid")) {
            memberEmail.classList.add("is-valid");
            memberEmail.classList.remove("is-invalid");
        }
    }
    return validForm;
}

var usedMemberEmails;

function checkForDuplicateEmail() {
    let htp = new XMLHttpRequest();
    htp.onreadystatechange = function () {
        if (htp.readyState === 4) {
            let memberMails = JSON.parse(htp.responseText);
            usedMemberEmails = memberMails;
            console.log(usedMemberEmails);
        }
    };
    htp.open("GET", `http://localhost:8088/user/getAllMembersMails`, true);
    htp.send();
}

function validateAddMemberForm() {

}


function emptyAddMemberForm() {
    const table = document.querySelector("#member-table");
    table.innerHTML = "";
    document.getElementById("member-form-name").value = "";
    document.getElementById("member-form-phone").value = "";
    document.getElementById("member-form-email").value = "";
    document.getElementById("member-form-name").classList.remove("is-invalid");
    document.getElementById("member-form-name").classList.remove("is-valid");
    document.getElementById("member-form-email").classList.remove("is-invalid");
    document.getElementById("member-form-email").classList.remove("is-valid");
    document.getElementById("member-form-phone").classList.remove("is-invalid");
    document.getElementById("member-form-phone").classList.remove("is-valid");
}

