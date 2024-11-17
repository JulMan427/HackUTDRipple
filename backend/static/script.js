// User and bank account data structures
let users = [];
let bankAccounts = [];
let isLoading;
let chatHistory = []

// Modified user structure
function createUser(username, password, email, phone) {
    return {
      username,
      password,
      email,
      phone,
      balance: 0,
      friends: [],
      bankAccounts: [] // Initialize the bankAccounts array
    };
}

// Bank account structure
function createBankAccount(userId, accountNumber, pin) {
  return {
    id: Date.now().toString(), // Unique identifier
    userId,
    accountNumber,
    pin,
    balance: 5000, // Starting balance
    createdAt: new Date()
  };
}

    function hideAllScreens() {
      const screens = document.querySelectorAll('.page');
      screens.forEach(screen => {
        screen.classList.add('hidden');
      });
    }

    function login() {
      const identifier = document.getElementById("login-identifier").value;
      const password = document.getElementById("login-password").value;
      const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);

      if (user) {
        currentUser = user;
        showHomeScreen();
      } else {
        alert("Invalid credentials.");
      }
    }

    function showLoginScreen() {
      hideAllScreens();
      document.getElementById("login-screen").classList.remove("hidden");
    }

    function showCreateAccountScreen() {
      hideAllScreens();
      document.getElementById("create-account-screen").classList.remove("hidden");
    }

// Modified create account function
function createAccount() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const email = document.getElementById("new-email").value;
    const phone = document.getElementById("new-phone").value;
  
    const newUser = createUser(username, password, email, phone); // Use the createUser function
    users.push(newUser);
    alert("Account created successfully!");
    showLoginScreen();
  }

    function showHomeScreen() {
      hideAllScreens();
      document.getElementById("home-screen").classList.remove("hidden");
      updateBalance();
      updateBankAccountsList();
    }

    function updateBalance() {
      if (currentUser) {
        document.getElementById("balance-display").innerText = `Balance: $${currentUser.balance}`;
      }
    }

    function updateBankAccountsList() {
        if (!currentUser) return;
        
        const bankAccountList = document.getElementById("bank-accounts");
        bankAccountList.innerHTML = '<h3>Linked Bank Account(s)</h3>';
        
        const userAccounts = getUserBankAccounts(currentUser);
        
        if (userAccounts.length === 0) {
          bankAccountList.innerHTML += '<p>No bank accounts linked</p>';
          return;
        }
        
        const ul = document.createElement('ul');
        userAccounts.forEach(account => {
          const li = document.createElement('li');
          li.innerHTML = `
            Account: ${maskAccountNumber(account.accountNumber)}
            <br>
            Balance: $${account.balance.toLocaleString()}
          `;
          ul.appendChild(li);
        });
        
        bankAccountList.appendChild(ul);
      }

// Helper function to mask account number
function maskAccountNumber(accountNumber) {
    if (!accountNumber) return '';
    const last4 = accountNumber.slice(-4);
    return '****' + last4;
  }

    function showViewFriendsScreen() {
      hideAllScreens();
      document.getElementById("view-friends-screen").classList.remove("hidden");
      viewFriends();
    }

    function viewFriends() {
  const friendsList = document.getElementById("friends-list");
  friendsList.innerHTML = '';
  currentUser.friends.forEach(friend => {
    const li = document.createElement("li");
    li.innerText = friend.username;
    li.onclick = () => showFriendDetails(friend);
    friendsList.appendChild(li);
  });
}

// Modified showFriendDetails function with transfer button functionality
function showFriendDetails(friend) {
  hideAllScreens();
  document.getElementById("friend-details-screen").classList.remove("hidden");
  document.getElementById("friend-username").innerText = friend.username;
  document.getElementById("friend-email").innerText = friend.email;
  document.getElementById("friend-phone").innerText = friend.phone;

  // Set up transfer button and screen
  const transferButton = document.getElementById("transfer-button");
  if (!transferButton) {
    // Create transfer button if it doesn't exist
    const button = document.createElement("button");
    button.id = "transfer-button";
    button.innerText = "Transfer Money";
    button.onclick = () => showTransferFriendScreen(friend);
    document.getElementById("friend-details-screen").appendChild(button);
  } else {
    transferButton.onclick = () => showTransferFriendScreen(friend);
  }
}

// New function to show transfer screen
// Add this to your showTransferFriendScreen function
function showTransferFriendScreen(friend) {
    hideAllScreens();
    const transferScreen = document.getElementById("transfer-friend-screen");
    transferScreen.classList.remove("hidden");
    
    // Set recipient information
    document.getElementById("transfer-friend-username").innerText = friend.username;
    
    // Display current balance
    document.getElementById("user-balance").innerText = 
      `$${currentUser.balance.toLocaleString()}`;
    
    // Clear previous amount if any
    const amountInput = document.getElementById("transfer-amount");
    if (amountInput) {
      amountInput.value = "";
      amountInput.focus();
    }
  }
  
  // Add input validation
  document.addEventListener('DOMContentLoaded', function() {
    const transferAmount = document.getElementById("transfer-amount");
    if (transferAmount) {
      transferAmount.addEventListener('input', function() {
        const amount = parseFloat(this.value);
        if (amount > currentUser.balance) {
          this.setCustomValidity("Amount exceeds available balance");
        } else if (amount <= 0) {
          this.setCustomValidity("Amount must be greater than 0");
        } else {
          this.setCustomValidity("");
        }
      });
    }
  });f

  

// Update account balance display based on selection
function updateSelectedAccountBalance(selectId, displayId) {
    const select = document.getElementById(selectId);
    const display = document.getElementById(displayId);
    
    if (!select.value) {
      display.textContent = '';
      return;
    }
  
    const account = bankAccounts.find(acc => acc.id === select.value);
    if (account) {
      display.textContent = `Selected Account Balance: $${account.balance.toLocaleString()}`;
    }
  }

    function addFriend() {
      friends.push(currentUser);
      alert("Friend added!");
      showHomeScreen();
    }

    function updateFriendsList() {
      const friendsList = document.getElementById("friends-list");
      friendsList.innerHTML = '';
      currentUser.friends.forEach(friend => {
        const li = document.createElement("li");
        li.innerText = friend.username;
        friendsList.appendChild(li);
      });
    }

    function logout() {
      currentUser = null;
      showLoginScreen();
    }

    function showAddFriendScreen() {
      hideAllScreens();
      document.getElementById("search-friends-screen").classList.remove("hidden");
    }

    function showFriendDetailsScreen() {
      hideAllScreens();
      document.getElementById("friend-details-screen").classList.remove("hidden");
    }

    
function showFriendDetails(friend) {
  hideAllScreens();
  document.getElementById("friend-details-screen").classList.remove("hidden");
  document.getElementById("friend-username").innerText = friend.username;
  document.getElementById("friend-email").innerText = friend.email;
  document.getElementById("friend-phone").innerText = friend.phone;

  // Save the selected friend for transfer purposes
  document.getElementById("transfer-friend-username").innerText = friend.username;
  document.getElementById("friend-details-screen").dataset.selectedFriend = friend.username;
}

f// Modified confirmTransfer function with better validation
function confirmTransfer() {
    const amount = parseFloat(document.getElementById("transfer-amount").value);
    const friendUsername = document.getElementById("transfer-friend-username").innerText;
  
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
  
    if (amount > currentUser.balance) {
      alert("Insufficient balance for this transfer.");
      return;
    }
  
    const friend = users.find(u => u.username === friendUsername);
    if (!friend) {
      alert("Friend not found.");
      return;
    }
  
    // Process transfer
    currentUser.balance -= amount;
    friend.balance = (friend.balance || 0) + amount;
    
    alert(`Successfully transferred $${amount.toLocaleString()} to ${friend.username}`);
    updateBalance();
    showHomeScreen();
}

    function showLinkBankAccountScreen() {
      hideAllScreens();
      document.getElementById("link-bank-account-screen").classList.remove("hidden");
    }

// Modified getUserBankAccounts function with null checking
function getUserBankAccounts(user) {
    if (!user || !user.bankAccounts) {
      return [];
    }
    return bankAccounts.filter(account => 
      user.bankAccounts.includes(account.id)
    );
  }
// Modified linkBankAccount function with null checking
function linkBankAccount() {
    const accountNumber = document.getElementById("account-number").value;
    const pin = document.getElementById("pin").value;
    
    if (!currentUser) {
      alert("Please log in first");
      return;
    }
    
    // Initialize bankAccounts array if it doesn't exist
    if (!currentUser.bankAccounts) {
      currentUser.bankAccounts = [];
    }
    
    // Create new bank account
    const newAccount = createBankAccount(currentUser.username, accountNumber, pin);
    bankAccounts.push(newAccount);
    
    // Add reference to user's bank accounts array
    currentUser.bankAccounts.push(newAccount.id);
    
    alert("Bank account linked successfully!");
    showHomeScreen();
    updateBankAccountsList();
  }

    function showDepositFromBankScreen() {
      hideAllScreens();
      document.getElementById("deposit-from-bank-screen").classList.remove("hidden");
      populateBankAccountSelect();
    }

    function showTransferToBankScreen() {
      hideAllScreens();
      document.getElementById("transfer-to-bank-screen").classList.remove("hidden");
      populateBankAccountSelect();
    }

    function populateBankAccountSelect() {
        if (!currentUser || !currentUser.bankAccounts) return;
      
        // Get select elements
        const depositSelect = document.getElementById("bank-account-selection");
        const transferSelect = document.getElementById("select-bank-account");
      
        // Clear existing options
        depositSelect.innerHTML = '<option value="">Choose an account</option>';
        transferSelect.innerHTML = '<option value="">Choose an account</option>';
      
        // Get user's bank accounts
        const userAccounts = getUserBankAccounts(currentUser);
      
        // Populate both select elements
        userAccounts.forEach(account => {
          // Create option for deposit select
          const depositOption = document.createElement("option");
          depositOption.value = account.id; // Use account ID as value
          depositOption.text = `Account ${maskAccountNumber(account.accountNumber)} - Balance: $${account.balance.toLocaleString()}`;
          depositSelect.appendChild(depositOption);
      
          // Create option for transfer select
          const transferOption = document.createElement("option");
          transferOption.value = account.id; // Use account ID as value
          transferOption.text = `Account ${maskAccountNumber(account.accountNumber)} - Balance: $${account.balance.toLocaleString()}`;
          transferSelect.appendChild(transferOption);
        });
      }

    // Modified deposit function with proper account validation
function depositFromBank() {
    const accountSelect = document.getElementById("bank-account-selection");
    const accountId = accountSelect.value;
    const amount = parseFloat(document.getElementById("deposit-amount").value);
  
    // Validate selection and amount
    if (!accountId) {
      alert("Please select a bank account");
      return;
    }
  
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    // Find the selected account
    const account = bankAccounts.find(acc => acc.id === accountId);
    
    if (!account) {
      alert("Invalid account selected");
      return;
    }
  
    if (amount > account.balance) {
      alert("Insufficient funds in the selected bank account");
      return;
    }
  
    // Process the transfer
    account.balance -= amount;
    currentUser.balance += amount;
  
    updateBalance();
    updateBankAccountsList();
    alert(`$${amount.toLocaleString()} deposited successfully`);
    showHomeScreen();
  }     

      function transferToBank() {
        const accountId = document.getElementById("select-bank-account").value;
        const amount = parseFloat(document.getElementById("transfer-to-bank-amount").value);
        
        const account = bankAccounts.find(acc => acc.id === accountId);
        
        if (!account) {
          alert("Please select a valid bank account");
          return;
        }
        
        if (amount <= 0 || amount > currentUser.balance) {
          alert("Invalid amount or insufficient funds in your Money Hub balance.");
          return;
        }
        
        // Update balances
        currentUser.balance -= amount;
        account.balance += amount;
        
        updateBalance();
        updateBankAccountsList();
        alert(`$${amount.toLocaleString()} transferred to bank successfully.`);
        showHomeScreen();
      }
      
    function cancelDeposit() {
      showHomeScreen();
    }

    function cancelTransferToBank() {
      showHomeScreen();
    }

    function addFriend() {
        const friendUsername = document.getElementById("friend-username").innerText;
        const friend = users.find(u => u.username === friendUsername);
        
        if (!friend) {
          alert("User not found.");
          return;
        }
      
        if (friend.username === currentUser.username) {
          alert("You cannot add yourself as a friend.");
          return;
        }
      
        if (currentUser.friends.some(f => f.username === friend.username)) {
          alert("This user is already your friend.");
          return;
        }
      
        currentUser.friends.push(friend);
        alert("Friend added successfully!");
        showFriendDetails(friend); // Show friend details again to display transfer option
      }
      

    function showSearchFriendsScreen() {
      hideAllScreens();
      document.getElementById("search-friends-screen").classList.remove("hidden");
    }

    function searchFriends() {
      const query = document.getElementById("friend-search").value.toLowerCase();
      const friendList = document.getElementById("friend-list");
      friendList.innerHTML = '';
      users.filter(user => user.username.toLowerCase().includes(query))
        .forEach(user => {
          const li = document.createElement("li");
          li.innerText = user.username;
          li.onclick = () => showFriendDetails(user);
          friendList.appendChild(li);
        });
    }

    function searchFriendsInView() {
      const searchTerm = document.getElementById("friends-search").value.toLowerCase();
      const friendsList = document.getElementById("friends-list");
      friendsList.innerHTML = '';

      currentUser.friends.forEach(friend => {
        if (friend.username.toLowerCase().includes(searchTerm)) {
          const li = document.createElement("li");
          li.innerText = friend.username;
          friendsList.appendChild(li);
        }
      });
    }

    // Chatbot Functions
    function showChatbot() {
        hideAllScreens();
        const screens = document.querySelectorAll(".container > div");
        screens.forEach((screen) => screen.classList.add("hidden"));
        document.getElementById("chatbot-screen").classList.remove("hidden");
        
        // Focus on input when chat is shown
        document.getElementById("chat-input").focus();
    }

    function addMessage(content, isUser = true) {
        const messagesDiv = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
        
        const messageContent = document.createElement("div");
        messageContent.className = "message-content";
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        messagesDiv.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showThinking() {
        const messagesDiv = document.getElementById("chat-messages");
        const thinkingDiv = document.createElement("div");
        thinkingDiv.className = "thinking";
        thinkingDiv.id = "thinking-indicator";
        thinkingDiv.textContent = "Thinking...";
        messagesDiv.appendChild(thinkingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function removeThinking() {
        const thinkingDiv = document.getElementById("thinking-indicator");
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }

    async function sendMessage() {
        const inputElement = document.getElementById("chat-input");
        const sendButton = document.getElementById("send-button");
        const message = inputElement.value.trim();
        
        if (!message || isLoading) return;
        
        isLoading = true;
        inputElement.disabled = true;
        sendButton.disabled = true;
        
        addMessage(message, true);
        inputElement.value = "";
        showThinking();
        
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    chat_history: chatHistory,
                    model: "Meta-Llama-3.1-70B-Instruct",
                    system_prompt: "You are a helpful assistant in a financial app. Keep responses clear and concise. Think for up to {budget} seconds before responding.",
                    thinking_budget: 10
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server Error:', errorText);
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            removeThinking();
            addMessage(data.response, false);
            chatHistory.push({
                user: message,
                assistant: data.response
            });
            
        } catch (error) {
            console.error('Error:', error);
            removeThinking();
            addMessage("Sorry, I encountered an error. Please try again.", false);
        } finally {
            isLoading = false;
            inputElement.disabled = false;
            sendButton.disabled = false;
            inputElement.focus();
        }
    }
    
    // Add error handling for general fetch errors
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        if (event.reason.name === 'TypeError' && event.reason.message.includes('fetch')) {
        addMessage("Network error occurred. Please check your connection.", false);
        }
    });

    // Add event listener for Enter key
    document.addEventListener('DOMContentLoaded', function() {
        const inputElement = document.getElementById("chat-input");
        inputElement.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    });