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

    // Find user by username, email, or phone
    const user = users.find(u => u.username === username || u.email === username || u.phone === username);

    // Check if the credentials match
    if (user && user.password === password) {
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

    // Check if the username, email, or phone is already used
    const existingUser = users.find(u => u.username === username || u.email === email || u.phone === phone);

    if (existingUser) {
        alert("Username, email, or phone already in use.");
        return;
    }

    // Create a new user and add them to the users array
    const newUser = { username, password, email, phone };
    users.push(newUser);

    alert(`Account Created: \nUsername: ${username} \nEmail: ${email} \nPhone: ${phone}`);
    showHomeScreen();
}

// Home Screen Actions

// View Balance
function viewBalance() {
    alert(`Your Cash App Balance: $${cashAppBalance}`);
}

// Withdraw Money
function withdraw() {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Please enter a valid number.");
        return;
    }

    // Simulate selecting a bank account to withdraw from
    const bankAccount = prompt("Enter your bank account number: 12345 or 67890");
    const selectedAccount = bankAccounts.find(account => account.accountNumber === bankAccount);

    if (!selectedAccount) {
        alert("Bank account not found.");
        return;
    }

    // Check if the bank account has enough balance
    if (selectedAccount.balance >= amount) {
        selectedAccount.balance -= amount;
        cashAppBalance += amount;
        alert(`Withdrawal successful! $${amount} has been transferred to your Cash App. Bank Account Balance: $${selectedAccount.balance}`);
    } else {
        alert("Insufficient funds in bank account.");
    }
}

// Transfer Money
function transferMoney() {
    const amount = parseFloat(prompt("Enter amount to transfer:"));

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Please enter a valid number.");
        return;
    }

    if (cashAppBalance >= amount) {
        cashAppBalance -= amount;
        alert(`$${amount} has been transferred from your Cash App.`);
    } else {
        alert("Insufficient funds in Cash App balance.");
    }
}


function viewFriends() {
    const friendsList = document.getElementById("friends-list");
    friendsList.innerHTML = '';
    currentUser.friends.forEach(friend => {
      const li = document.createElement("li");
      li.innerText = friend.username;
      li.onclick = () => showFriendDetails(friend, true); // Pass true to indicate from View Friends
      friendsList.appendChild(li);
    });
  }

  function searchFriends() {
    const query = document.getElementById("friend-search").value.toLowerCase();
    const friendList = document.getElementById("friend-list");
    friendList.innerHTML = '';
    users.filter(user => user.username.toLowerCase().includes(query))
      .forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.username;
        li.onclick = () => showFriendDetails(user, false); // Pass false to indicate from Add Friends
        friendList.appendChild(li);
      });
  }
  

// Link Bank Account
function linkBankAccount() {
    alert("Bank account linked successfully.");
}

// Transfer from Bank
function transferFromBank() {
    const amount = parseFloat(prompt("Enter amount to transfer from bank to Cash App:"));

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Please enter a valid number.");
        return;
    }

    const bankAccount = prompt("Enter your bank account number: 12345 or 67890");
    const selectedAccount = bankAccounts.find(account => account.accountNumber === bankAccount);

    if (!selectedAccount) {
        alert("Bank account not found.");
        return;
    }

    // Check if the bank account has enough balance
    if (selectedAccount.balance >= amount) {
        selectedAccount.balance -= amount;
        cashAppBalance += amount;
        alert(`$${amount} has been transferred from your bank to Cash App. New Bank Account Balance: $${selectedAccount.balance}`);
    } else {
        alert("Insufficient funds in bank account.");
    }
}

// Logout
function logout() {
    alert("Logging out...");
    goBack();
}

function showTransferToFriendScreen() {
    hideAllScreens();
    document.getElementById("transfer-friend-screen").classList.remove("hidden");
    const selectedFriend = document.getElementById("friend-details-screen").dataset.selectedFriend;
    document.getElementById("transfer-friend-username").innerText = selectedFriend;
  }
  
  function confirmTransfer() {
    const amount = parseFloat(document.getElementById("transfer-amount").value);
    const friendUsername = document.getElementById("transfer-friend-username").innerText;
  
    if (amount <= 0 || amount > currentUser.balance) {
      alert("Invalid amount or insufficient balance.");
      return;
    }
  
    const friend = currentUser.friends.find(f => f.username === friendUsername);
    if (friend) {
      currentUser.balance -= amount;
      friend.balance = (friend.balance || 0) + amount; // Add transferred balance to friend's account
      alert(`$${amount} transferred to ${friend.username}.`);
      showHomeScreen();
      updateBalance();
    }
  }

  let isViewingFromAddFriend = false;  // Flag to track where the Friend Details screen was opened from

  function showFriendDetails(friend) {
    hideAllScreens();
    document.getElementById("friend-details-screen").classList.remove("hidden");

    document.getElementById("friend-username").innerText = friend.username;
    document.getElementById("friend-email").innerText = friend.email;
    document.getElementById("friend-phone").innerText = friend.phone;

    // Set the selected friend's username in the data attribute
    document.getElementById("friend-details-screen").dataset.selectedFriend = friend.username;

    // Show or hide the Add Friend button based on whether the user is already friends with the person
    const addButton = document.getElementById("add-friend-button");
    if (currentUser.friends.some(f => f.username === friend.username)) {
        addButton.classList.add("hidden"); // Hide if already friends
        document.querySelector(".transfer-button").classList.remove("hidden"); // Show Transfer Money button if friends
    } else {
        addButton.classList.remove("hidden"); // Show if not yet friends
        document.querySelector(".transfer-button").classList.add("hidden"); // Hide Transfer Money button if not friends
    }
}

// Add Friend and Show Confirmation
function addFriendAndShowMessage() {
    const friendUsername = document.getElementById("friend-username").innerText;
    console.log("Adding Friend: ", friendUsername);  // Debugging line to check if username is correctly retrieved

    const friend = users.find(u => u.username === friendUsername);
    if (!friend) {
        console.log("Friend not found in users array");  // Debugging line
    }
  
    if (friend && !currentUser.friends.includes(friend)) {
        currentUser.friends.push(friend);
        alert(`${friend.username} was successfully added!`);
        console.log("Updated Friends List: ", currentUser.friends);  // Debugging line
    } else {
        alert("This user is already your friend.");
    }
  
    // After adding, return to the Search Friends screen
    showSearchFriendsScreen();
}

// Show the Search Friends Screen
function showSearchFriendsScreen() {
    document.getElementById("friend-details-screen").classList.add("hidden");
    document.getElementById("search-friends-screen").classList.remove("hidden");
}

// Hide all screens (used for transitions)
function hideAllScreens() {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.add("hidden"));
}
