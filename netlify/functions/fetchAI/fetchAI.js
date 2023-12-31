import { OpenAI } from 'openai'



const handler = async (event) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser:true,
    })
    try {
      const response = await openai.completions.create({
        model: 'text-ada-001',
        prompt: `Generate a short enthusiastically message to respond to a user idea "${event.body}"
        `,
        max_tokens: 16 // defaults to 16
        });
        return {
            statusCode: 200,
            body: JSON.stringify({reply: response.data})
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }

