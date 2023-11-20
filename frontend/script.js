function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') {
        return;
    }

    displayUserMessage(userInput);
    document.getElementById('user-input').value = '';

    // Call the getFortune function when the user sends a message
    getFortune();
}

function displayUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
}

function displayBotMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.textContent = message;
    chatMessages.appendChild(botMessage);
}

async function getFortune() {
    try {
        const response = await fetch("http://localhost:3000/fortuneTell", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'John' })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the 'assistant' property exists in the response
        if (data.hasOwnProperty('assistant')) {
            const fortuneMessage = `운세: ${data.assistant}`;
            displayBotMessage(fortuneMessage);
        } else {
            console.error('Error: Unexpected response format');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}