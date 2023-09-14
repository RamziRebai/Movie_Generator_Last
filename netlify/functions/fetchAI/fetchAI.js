import { OpenAI } from 'openai';

const handler = async (event) => {
  try {
    // Retrieve the OPENAI_API_KEY from environmental variables
    const apiKey = process.env.OPENAI_API_KEY;

    // Check if the API key is defined
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined.');
    }

    const openai = OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.completions.create({
      model: 'text-ada-001',
      prompt: `Generate a short enthusiastic message to respond to a user idea"
        ###
        user idea:  Let's organize a community cleanup event this weekend!
        message response: What a fantastic idea! Count me in, and let's make our community shine together this weekend!
        ###
        user idea:  How about starting a book club for our friends?
        message response: I love it! A book club sounds amazing. Let's dive into some great reads and lively discussions together!
        ###
        user idea: "${event.body}"
        message response:
        `,
      max_tokens: 30, // defaults to 16
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response,
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
};

module.exports = { handler };
