// Chat history and loading state
let chatHistory = [];
let isLoading = false;

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

// Chatbot Functions
function showChatbot() {
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