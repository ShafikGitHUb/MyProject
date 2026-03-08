const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function(e){
    e.preventDefault();

    const userInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const userName = userInput.value;
    const password = passwordInput.value;

    if(userName === "admin" && password === "admin123"){
        alert("Login Successful");
        // অন্য page এ যাবে
        window.location.assign("./home.html");
    }
    else{
        alert("Login Fail");
    }

});