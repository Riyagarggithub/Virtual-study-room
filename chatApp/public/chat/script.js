document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let username = '';
    
    // DOM elements
    const loginModal = document.getElementById('login-modal');
    const usernameForm = document.getElementById('username-form');
    const usernameInput = document.getElementById('username-input');
    const currentUsernameDisplay = document.getElementById('current-username');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingNotification = document.getElementById('typing-notification');
    const usersList = document.getElementById('users');
    
    // Join chat
    usernameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      username = usernameInput.value.trim();
      
      if (username) {
        socket.emit('new-user', username);
        loginModal.style.display = 'none';
        currentUsernameDisplay.textContent = username;
      }
    });
    
    // Send message
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      
      if (message) {
        appendMessage(message, 'outgoing');
        socket.emit('send-chat-message', message);
        messageInput.value = '';
        socket.emit('typing-stop');
      }
    });
    
    // Typing indicator
    let typingTimeout;
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim()) {
        socket.emit('typing');
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          socket.emit('typing-stop');
        }, 2000);
      } else {
        socket.emit('typing-stop');
      }
    });
    
    // Socket.io event listeners
    socket.on('chat-message', (data) => {
      appendMessage(data.message, 'incoming', data.username);
    });
    
    socket.on('user-connected', (username) => {
      appendNotification(`${username} joined the chat`);
    });
    
    socket.on('user-disconnected', (username) => {
      appendNotification(`${username} left the chat`);
    });
    
    socket.on('user-typing', (username) => {
      typingNotification.textContent = `${username} is typing...`;
    });
    
    socket.on('typing-stop', () => {
      typingNotification.textContent = '';
    });
    
    socket.on('update-users', (users) => {
      usersList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        usersList.appendChild(li);
      });
    });
    
    // Helper functions
    function appendMessage(message, type, sender = null) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', `message-${type}`);
      
      const usernameElement = document.createElement('div');
      usernameElement.classList.add('message-username');
      usernameElement.textContent = type === 'outgoing' ? 'You' : sender;
      
      const textElement = document.createElement('div');
      textElement.textContent = message;
      
      const timeElement = document.createElement('div');
      timeElement.classList.add('message-time');
      timeElement.textContent = formatTime(new Date());
      
      messageElement.appendChild(usernameElement);
      messageElement.appendChild(textElement);
      messageElement.appendChild(timeElement);
      
      chatMessages.appendChild(messageElement);
      scrollToBottom();
    }
    
    function appendNotification(message) {
      const notificationElement = document.createElement('div');
      notificationElement.classList.add('notification');
      notificationElement.textContent = message;
      chatMessages.appendChild(notificationElement);
      scrollToBottom();
    }
    
    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  });