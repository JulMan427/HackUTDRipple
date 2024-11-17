let currentUser = null;
    let users = [];
    let balance = 0;
    let bankBalance = 5000;
    let bankAccounts = [];
    let friends = [];
    let bankAccount = null;
    let chatHistory = [];
    let isLoading = false;

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

    function createAccount() {
      const username = document.getElementById("new-username").value;
      const password = document.getElementById("new-password").value;
      const email = document.getElementById("new-email").value;
      const phone = document.getElementById("new-phone").value;

      const newUser = { username, password, email, phone, balance: 0, friends: [] };
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
      const bankAccountList = document.getElementById("bank-account-list");
      bankAccountList.innerHTML = '';
      bankAccounts.forEach(account => {
        const li = document.createElement("li");
        li.innerText = `Account Number: ${account.accountNumber}, Balance: $${account.balance}`;
        bankAccountList.appendChild(li);
      });
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
    friend.balance = (friend.balance || 0) + amount; // Add transferred balance to the friend's account
    alert(`$${amount} transferred to ${friend.username}.`);
    showHomeScreen();
    updateBalance();
  }
}

    function showLinkBankAccountScreen() {
      hideAllScreens();
      document.getElementById("link-bank-account-screen").classList.remove("hidden");
    }

    function linkBankAccount() {
      const accountNumber = document.getElementById("account-number").value;
      const pin = document.getElementById("pin").value;
      bankAccount = { accountNumber, pin, balance: bankBalance };
      bankAccounts.push(bankAccount);
      alert("Bank account linked successfully!");
      showHomeScreen();
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
      const select = document.getElementById("bank-account-selection");
      select.innerHTML = '';
      bankAccounts.forEach(account => {
        const option = document.createElement("option");
        option.text = account.accountNumber;
        select.add(option);
      });

      const selectTransfer = document.getElementById("select-bank-account");
      selectTransfer.innerHTML = '';
      bankAccounts.forEach(account => {
        const option = document.createElement("option");
        option.text = account.accountNumber;
        selectTransfer.add(option);
      });
    }

    function depositFromBank() {
      const amount = parseFloat(document.getElementById("deposit-amount").value);
      if (amount <= 0 || amount > bankBalance) {
        alert("Invalid amount or insufficient funds in the bank.");
        return;
      }
      bankBalance -= amount;
      currentUser.balance += amount;
      updateBalance();
      alert(`$${amount} deposited.`);
      showHomeScreen();
    }

    function transferToBank() {
      const amount = parseFloat(document.getElementById("transfer-to-bank-amount").value);
      if (amount <= 0 || amount > currentUser.balance || amount > bankBalance) {
        alert("Invalid amount or insufficient funds.");
        return;
      }
      currentUser.balance -= amount;
      bankBalance += amount;
      alert(`$${amount} transferred to bank.`);
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
      if (friend && !currentUser.friends.includes(friend)) {
        currentUser.friends.push(friend);
        alert("Friend added successfully!");
      }
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