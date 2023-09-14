import { OpenAI } from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const handler = async (event) => {
    try {
      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Generate a short enthusiastically message to respond to a user idea"
        user idea: "${event.body}"
        message response:
        `,
        max_tokens: 30 // defaults to 16
        })
        return {
            statusCode: 200,
            body: JSON.stringify({reply: response})
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }

