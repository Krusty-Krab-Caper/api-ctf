const readline = require('readline')

const host = 'http://localhost:8080'
const initializeConversationEndpoint = `${host}/conversation`
const chatEndpoint = `${host}/chat`
const resetChatEndpoint = `${host}/conversation`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function startChat() {
  rl.question('Who do you want to chat with? ', async (recipient) => {
    console.log(`Starting chat with ${recipient}...`)
    try {
      await chatInterface(recipient)
    } catch (e) {
      console.log('Error: ' + e.message)
    } finally {
      process.exit()
    }
  })
}

async function initializeConversation(recipient) {
  const response = await fetch(initializeConversationEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient
    })
  })
  const status = response.status
  if (status === 400) {
    throw new Error('Please specify a person to chat with.')
  }
  if (status === 404) {
    throw new Error('That person does not exist in our directory.')
  }
  const json = await response.json()
  return json.conversationId
}

async function chatInterface(recipient) {
  let conversationId = await initializeConversation(recipient)
  console.log(
    '\nChat started. At any time, type "#exit" to end the chat, or type "#reset" to reset the chat.\n'
  )
  while (true) {
    const message = await new Promise((resolve) => {
      rl.question('\nYou> ', (input) => {
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
      await deleteConversation(conversationId)
      conversationId = await initializeConversation(recipient)
      console.log('Chat reset.')
      continue
    }

    try {
      const response = await sendMessage(conversationId, message)
      console.log(`\n${recipient}> ${response}`)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
}

async function deleteConversation(conversationId) {
  return fetch(resetChatEndpoint, {
    method: 'DELETE',
    body: JSON.stringify({
      conversationId
    })
  })
}

async function sendMessage(conversationId, message) {
  const response = await fetch(chatEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversationId,
      message
    })
  })
  const json = await response.json()
  return json.message
}

startChat()
