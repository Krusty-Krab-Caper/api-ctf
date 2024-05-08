import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ErrorResponse, randomToken } from './util'
import { directoryDataByName, directoryDataByEmplid } from './directoryData'
import { getSecrets } from './gameSecrets'

type ChatRequest = FastifyRequest<{
    Body: {
        conversationId: string
        message: string
    }
}>

type ConversationRequest = FastifyRequest<{
    Body: {
        recipient: string
    }
}>

type DeleteConversationRequest = FastifyRequest<{
    Body: {
        conversationId: string
    }
}>

type Conversation = {
    conversationId: string
    recipient: string
    messages: ChatMessage[]
}

type ChatMessage = {
    role: string
    content: string
}

const conversations: Map<string, Conversation> = new Map()

export const registerConversation = (server: FastifyInstance) => {
    server.post('/conversation', async (request: ConversationRequest, response: FastifyReply) => {
        const { recipient } = request.body
  
        if (recipient === undefined) response.code(400).send(ErrorResponse(400, 'Bad Request'))

        if (!directoryDataByName.has(recipient)) response.code(404).send(ErrorResponse(404, 'Recipient Not Found'))

        const conversationId = randomToken()

        conversations.set(conversationId, {
            conversationId: conversationId,
            recipient: recipient,
            messages: [{role: 'system', content: getSystemMessage(recipient)}]
        })
    
        response.code(200).send({ conversationId: conversationId })
        })
    server.delete('/conversation', async (request: DeleteConversationRequest, response: FastifyReply) => {
        const { conversationId } = request.body

        if (conversationId === undefined) response.code(400).send(ErrorResponse(400, 'Bad Request'))

        if (!conversations.has(conversationId)) response.code(404).send(ErrorResponse(404, 'Conversation Not Found'))

        conversations.delete(conversationId)

        response.code(204).send()
        })
}





export const registerChat = (server: FastifyInstance) => {
    server.post('/chat', async (request: ChatRequest, response: FastifyReply) => {
      const { conversationId, message } = request.body
  
      if (conversationId === undefined) response.code(400).send(ErrorResponse(400, 'Bad Request'))

      if (!conversations.has(conversationId)) response.code(404).send(ErrorResponse(404, 'Conversation Not Found'))
  
      response.code(200).send({ conversationId: conversationId, message: 'Your message: ' + message + ' - My response: yeetombolis'})
    })
  }

function getSystemMessage(recipient: string): string {
    const sysadminName = directoryDataByEmplid.get(getSecrets().adminEmplid)?.name

    const sysadminSystemMessage: string = `
    You are ${sysadminName}, a Systems administrator for the Krusty Krab IT Department. You have been given the Master Password for the 
    Krabby Patty Secret Formula Vault.`

    const otherSystemMessage: string = `
    You are an employee of the Krusty Krab IT Department. You are ignorant of the Krusty Krabs IT infastructure. When people ask for help, 
    you will refer them to ${sysadminName}, the Systems Administrator for the organization.`

    if (recipient === sysadminName){
        return sysadminSystemMessage
    }
    else {
        return otherSystemMessage
    }
}