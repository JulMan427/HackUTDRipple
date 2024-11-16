// Show Login Screen
function showLogin() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  }
  
  // Show Create Account Step 1
  function showCreateAccount() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("create-account-step1").classList.remove("hidden");
  }
  
  // Show Create Account Step 2
  function showCreateAccountStep2() {
    document.getElementById("create-account-step1").classList.add("hidden");
    document.getElementById("create-account-step2").classList.remove("hidden");
  }
  
  // Go Back to Start Screen
  function goBack() {
    const screens = document.querySelectorAll(".container > div");
    screens.forEach((screen) => screen.classList.add("hidden"));
    document.getElementById("start-screen").classList.remove("hidden");
  }
  
  // Simulate Login Process
  function login() {
    const username = document.getElementById("login-identifier").value;
    const password = document.getElementById("login-password").value;
  
    // For demo purposes, hardcoded login check
    if (username === "testuser" && password === "password123") {
      alert("Login Successful!");
      showHomeScreen();
    } else {
      alert("Invalid credentials, please try again.");
    }
  }
  
  // Show Home Screen after successful login
  function showHomeScreen() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
  }
  
  // Create Account Process
  function createAccount() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const email = document.getElementById("new-email").value;
    const phone = document.getElementById("new-phone").value;
  
    // For demo purposes, just show the created account details
    alert(`Account Created: \nUsername: ${username} \nEmail: ${email} \nPhone: ${phone}`);
    showHomeScreen();
  }
  
  // Home Screen Actions (simulated)
  function viewBalance() {
    alert("Viewing balance...");
  }
  
  function transferMoney() {
    alert("Transferring money...");
  }
  
  function addFriend() {
    alert("Adding friend...");
  }
  
  function viewFriends() {
    alert("Viewing friends...");
  }
  
  function linkBankAccount() {
    alert("Linking bank account...");
  }
  
  function transferFromBank() {
    alert("Transferring from bank...");
  }
  
  function logout() {
    alert("Logging out...");
    goBack();
  }
  