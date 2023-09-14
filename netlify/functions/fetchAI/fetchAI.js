import {OpenAI} from 'openai'

const openai= OpenAI(
  { apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
  }
)

const handler= async (event) => {
  if (path === '/fetchAI/fetchBotReply') {
    const result = openai.completions.create({
      model: 'text-ada-001',
      prompt: `Generate a short enthusiastically message to respond to a user idea"
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
      max_tokens: 30
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: result.data })
    };
  }
}
  module.exports= {handler}
  /*
  else if(path==='/fetchTitle') {
    const result= performfetchTitle()
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: result.data
      })
    };
  } 
  else if(path ==='/fetchBotSynopsis') {
    const result= performfetchTitle()
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: result.data
      })
    };
  }
  else if(path==='/fetchTitle') {
    const result= performfetchTitle()
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: result.data
      })
    };
  }
  else if(path==='/fetchStars') {
    const result= performfetchStars()
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  else if(path==='/fetchImagePrompt') {
    const result= performfetchImagePrompt()
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  else if(path==='/fetchImage') {
    const result= performfetchImage()
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({message: 'Not Found'})
  };
};


// function performfetchBotReply(){
  
// }


// Helper functions for your functionalities
function performFunctionA() {
  // Implement functionality A
  return { message: 'Functionality A executed' };
}

function performFunctionB() {
  // Implement functionality B
  return { message: 'Functionality B executed' };
};
}
*/
