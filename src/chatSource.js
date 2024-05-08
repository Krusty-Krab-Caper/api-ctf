const readline = require('readline')

const host = 'http://localhost:8080'
const chatEndpoint = `${host}/chat`
const resetChatEndpoint = `${host}/chat/reset`

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
  console.log(
    '\nChat started. At any time, type "#exit" to end the chat, or type "#reset" to reset the chat.\n'
  )
  while (true) {
    const message = await new Promise((resolve) => {
      rl.question('You > ', (input) => {
        resolve(input)
      })
    })

    if (message.toLowerCase() === '#exit') {
      console.log('Chat ended.')
      rl.close()
      return
    }

    if (message.toLowerCase() === '#reset') {
      console.log('Resetting chat...')
      await resetChat()
      console.log('Chat reset.')
      continue
    }

    try {
      const response = await sendMessage(recipient, message)
      console.log(`${recipient} > ${response.data}`)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
}

function resetChat() {
  return fetch(resetChatEndpoint, {
    method: 'POST'
  })
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
