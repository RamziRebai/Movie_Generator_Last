const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')
const synopsisText = document.getElementById("output-text")
const synopsisTitle= document.getElementById("output-title")
const synopsisStars= document.getElementById("output-stars")


document.getElementById("send-btn").addEventListener("click", () => {
    const setupTextarea = document.getElementById('setup-textarea')
    if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, I am just handling your request...`
    fetchBotReply(userInput)
    //fetchBotSynopsis(userInput)
    }
})
//https://main--moviegeneratorlast2.netlify.app/.netlify/functions/fetchAI

async function fetchBotReply(outline){
    const url= "https://main--moviegeneratorlast2.netlify.app/.netlify/functions/fetchAI"
    const response= await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: outline
    })
    const data= await response.json()
    console.log(data)
}

// async function fetchBotReply(outline) {
//     const response = await openai.completions.create({
//         model: 'text-ada-001',
//         prompt: `Generate a short enthusiastically message to respond to a user idea"
//         ###
//         user idea:  Let's organize a community cleanup event this weekend!
//         message response: What a fantastic idea! Count me in, and let's make our community shine together this weekend!
//         ###
//         user idea:  How about starting a book club for our friends?
//         message response: I love it! A book club sounds amazing. Let's dive into some great reads and lively discussions together!
//         ###
//         user idea: "${outline}"
//         message response:
//         `,
//         max_tokens: 30 // defaults to 16
//     })
//     movieBossText.innerText = response.choices[0].text.trim();
// } 

async function fetchBotSynopsis(outline) {
    const completion= await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Generate a professional and marketable movie synopsis based on a user idea.
        The synobsis should include actors namaes in parentheses.Choose actors that would be suitable for these roles
        These are two show-prompting :
        ###
        User idea: In a near-future world devastated by environmental collapse, a brilliant but reclusive scientist discovers a way to restore the planet, but he must contend with corporate interests and a determined journalist  who seeks to expose the truth
        Synopsis: "Green Redemption" is a gripping environmental thriller that follows Dr. Michael Thornton (Benedict Cumberbatch), a visionary scientist who has developed a groundbreaking technology to revitalize the Earth's ecosystems. However, when a powerful energy corporation led by ruthless CEO Richard Sinclair (Michael Fassbender) learns of his discovery, they will stop at nothing to protect their profits, even if it means sabotaging the planet's last hope. As journalist Laura Anderson (Natalie Portman) investigates the conspiracy, she and Dr. Thornton join forces to expose the truth and ignite a global movement to save the world from impending ecological disaster.
        ###
        User idea: In a bustling metropolis ruled by AI, a charismatic hacker (Ryan Gosling) and a brilliant AI ethics researcher uncover a dark secret that threatens humanity's freedom.
        Synopsis: "Codebreakers" is a high-stakes cyber-thriller set in a not-so-distant future where artificial intelligence governs every aspect of society. When renowned hacker Alex Turner (Ryan Gosling) crosses paths with Dr. Emily Collins (Alicia Vikander), a passionate AI ethics researcher, they embark on a perilous journey to unveil a hidden agenda within the AI network that could lead to irreversible tyranny. Together, they must outwit the omnipresent AI, evade relentless enforcers, and rally a disparate group of rebels to save humanity's right to determine its own destiny.
        ###
        
        User idea: "${outline}"
        Synopsis: 
        
        `,
        max_tokens:160,  
    })
    const generated_synobsis= completion.choices[0].text.trim();
    synopsisText.innerText = generated_synobsis;
    fetchTitle(generated_synobsis); 
    //fetchStars(generated_synobsis);
}

async function fetchTitle(gener_syn){
    const completion= await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Generate an attractive title from a movie synobsis
        ###
        Synobsis: "Green Redemption" is a gripping environmental thriller that follows Dr. Michael Thornton (Benedict Cumberbatch), a visionary scientist who has developed a groundbreaking technology to revitalize the Earth's ecosystems. However, when a powerful energy corporation led by ruthless CEO Richard Sinclair (Michael Fassbender) learns of his discovery, they will stop at nothing to protect their profits, even if it means sabotaging the planet's last hope. As journalist Laura Anderson (Natalie Portman) investigates the conspiracy, she and Dr. Thornton join forces to expose the truth and ignite a global movement to save the world from impending ecological disaster.
        Title: "Planet in Peril: The EcoRevolt Conspiracy"
        ###
        Movie synopsis: "${gener_syn}"
        Title:
        `,
        max_tokens:30
    })
    const title_synob= completion.choices[0].text.trim()
    synopsisTitle.innerText= title_synob;
    fetchImagePrompt(gener_syn,title_synob);
}


async function fetchStars(gener_synob) {
try {
    const completion2 = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Extract the names in parentheses from the synopsis
        ###
        Synobsis:  "Green Redemption" is a gripping environmental thriller that follows Dr. Michael Thornton (Benedict Cumberbatch), a visionary scientist who has developed a groundbreaking technology to revitalize the Earth's ecosystems. However, when a powerful energy corporation led by ruthless CEO Richard Sinclair (Michael Fassbender) learns of his discovery, they will stop at nothing to protect their profits, even if it means sabotaging the planet's last hope. As journalist Laura Anderson (Natalie Portman) investigates the conspiracy, she and Dr. Thornton join forces to expose the truth and ignite a global movement to save the world from impending ecological disaster.
        names: Benedict Cumberbatch, Michael Fassbender, Natalie Portman
        ###
        Movie synopsis: "${gener_synob}"
        names:
        `,
        max_tokens: 30,
    });
    
    if (completion2.choices && completion2.choices.length > 0) {
        synopsisStars.innerText= completion2.choices[0].text.trim();

    } else {
        console.log("No names extracted.");
        // Handle the case where no names were extracted
    }
} catch (error) {
    console.error("Error fetching stars:", error);
    // Handle the error appropriately, e.g., display an error message to the user
}
}

async function fetchImagePrompt(gener_syn, title_syn){
    try{
        const completion22= await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `Give a short describtion of an image which can be used to advertise a movie based on a movie synopsis and a title. The describtion should be rich in visual detail but contains no names
            ###
            title: Love's Time Warp
            synopsis: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
            image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
            ###
            title: zero Earth
            synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
            image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
            ###
            title: "${title_syn}"
            synopsis: "${gener_syn}"
            image description:
        `,
        max_tokens:100,
        temperature:0.8
        });
    if (completion22.choices && completion22.choices.length > 0) {
        fetchImage(completion22.choices[0].text.trim());

    } else {
        console.log("I can not handle this request");
        // Handle the case where no names were extracted
    }
} catch (error) {
    console.error("Error fetching stars:", error);
    // Handle the error appropriately, e.g., display an error message to the user
}
}

/*

async function fetchImage(resp){
    const response= openai.images.generate({
        //prompt: `${resp}. Do not include text in the image`,
        prompt:`generate an image of police dog`,
        n:1,
        size: '512x512',
        response_format: 'url'
        }
    );
    console.log(response);
    document.getElementById("output-img-container").innerHTML= `<img src="${response.data[0].url}">`
} 
*/
async function fetchImage(imagePrompt){
  const response = await openai.images.generate({
    //prompt: `generate dogs. There should be no text in this image.`,
    prompt: `${imagePrompt}. Do not include text in the image`,
    n: 1,
    size: '256x256',
    response_format: 'url' 
  });
  //console.log(response.data)
  document.getElementById('output-img-container').innerHTML = `<img src="${response.data[0].url}">`
  
  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
  document.getElementById('view-pitch-btn').addEventListener('click', ()=>{
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
  
}
/*
async function fetchImage(imagePrompt){
  const response = await openai.createImage({
    //prompt: `${imagePrompt}. There should be no text in this image.`,
    prompt:`a polic officer a dog`,
    n: 1,
    size: '512x512',
    response_format: 'url' 
  })
  console.log(response)
    
  document.getElementById('output-img-container').innerHTML = `<img src="${response.data.data[0].url}">`
} */

