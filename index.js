const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');
const synopsisText = document.getElementById('output-text');
const synopsisTitle = document.getElementById('output-title');
const synopsisStars = document.getElementById('output-stars');

document.getElementById('send-btn').addEventListener('click', async () => {
    const setupTextarea = document.getElementById('setup-textarea');
    if (setupTextarea.value) {
        const userInput = setupTextarea.value;
        setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
        movieBossText.innerText = 'Ok, I am just handling your request...';
        await fetchBotReply(userInput);
    }
});

async function fetchBotReply(outline) {
    const url = 'https://moviegeneratorlast2.netlify.app/.netlify/functions/fetchAI';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: outline,
        });
        const data = await response.json();
        movieBossText.innerText = data.reply.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching bot reply:', error);
        // Handle the error appropriately, e.g., display an error message to the user.
    }
}
