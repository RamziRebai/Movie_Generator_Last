import { OpenAI } from 'openai';

const openai = OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const handler = async (event) => {
  if (event.path === '/fetchAI/fetchBotReply') {
    try {
      const result = await openai.completions.create({
        model: 'text-ada-001',
        prompt: `Generate a short enthusiastic message to respond to a user idea"
        ###
        user idea: Let's organize a community cleanup event this weekend!
        message response: What a fantastic idea! Count me in, and let's make our community shine together this weekend!
        ###
        user idea: How about starting a book club for our friends?
        message response: I love it! A book club sounds amazing. Let's dive into some great reads and lively discussions together!
        ###
        user idea: "${event.body}"
        message response:
        `,
        max_tokens: 30,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ reply: result.data.choices[0].text.trim() }),
      };
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  }

  // Return a 400 status for other paths
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Not Found' }),
  };
};

module.exports = { handler };

