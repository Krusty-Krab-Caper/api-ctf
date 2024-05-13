import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getChatReply = async (messages: ChatCompletionMessageParam[]): Promise<ChatCompletionMessageParam> => {

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        temperature: 0.8,
    });

    const replyMesssage: ChatCompletionMessageParam = {
        role: 'assistant',
        content: completion.choices[0].message.content??''
    }

    return replyMesssage

}