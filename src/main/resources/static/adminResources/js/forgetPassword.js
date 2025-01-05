async function findUsernameAndGenerateOtp() {
	let username = document.getElementById("username");
	document.getElementById("reset-button").innerHTML = `	<div class="spinner-border" role="status">
	  <span class="visually-hidden"></span>
	</div>`;
	document.getElementById("reset-button").disabled = true;
	document.getElementById("error").style.display = "none";

	const response = (await fetch(`forgetPassword/findUsernameAndGenerateOtp?username=${username.value}`));
	let data = await response.json();
	console.log(data)
	if (data.status) {
		localStorage.setItem("username", username);
		localStorage.setItem("expire", response.body);
		window.location.href = "forgetPassword/changePassword";
	} else {
		document.getElementById("error").style.display = "";
		document.getElementById("reset-button").disabled = false;
		document.getElementById("reset-button").innerHTML = `Reset Password`;
	}

}

function onLoading() {
	let username = localStorage.getItem("username");
	let expire = localStorage.getItem("expire");
	if (expire !== null && username !== null) {
		window.location.href = "forgetPassword/changePassword";
	}
}

onLoading()