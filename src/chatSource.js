const readline = require('readline')

const host = 'http://localhost:8080'
const chatEndpoint = `${host}/chat`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function startChat() {
  rl.question('Who do you want to chat with? ', async (recipient) => {
    console.log(`Starting chat with ${recipient}...`)
    await chatInterface(recipient)
  })
}

async function chatInterface(recipient) {
  while (true) {
    const message = await new Promise((resolve) => {
      rl.question('Enter your message (or type "exit" to end the chat): ', (input) => {
        resolve(input)
      })
    })

    if (message.toLowerCase() === 'exit') {
      console.log('Chat ended.')
      rl.close()
      return
    }

    try {
      const response = await sendMessage(recipient, message)
      console.log(`Received response: ${response.data}`)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
}

function sendMessage(recipient, message) {
  return fetch(chatEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient,
      message
    })
  })
}

startChat()
