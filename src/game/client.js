
const apiUrl = "https://localhost:7084/api";

const cached_match_value = JSON.parse(sessionStorage.getItem("cached_match"));

const gs_endpoint = cached_match_value.gs_endpoint;
const ticket = cached_match_value.ticket;

const matchID = getUrlParam('match');
const gameID = getUrlParam('game');

function getUrlParam(key) {
    return new URLSearchParams(window.location.search).get(key);
}

async function fetchGameUI(gameId) {

    fetch(`${apiUrl}/gameuis/${gameId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": "application/json"
        },
    }).then(async (response) => {
        if (response.ok === false)
            alert('Error: Cannot connect to the server.')

        var content = (await response.json()).data;
        await setView(content);
    });
}

async function addScript(src) {
    return new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = src;
        el.addEventListener('load', resolve);
        el.addEventListener('error', reject);
        document.body.append(el);
    });
}

async function setView(uiContent) {
    let gameContent = document.getElementById("gameContent")
    gameContent.innerHTML = `${atob(uiContent.htmlContent)}`;
    if (uiContent.scripts !== undefined | null) {
        uiContent.scripts.forEach(async s => {
            await addScript(s);
        });
    }
}

if (gameID === undefined | null)
    alert('Error: Cannot connect to the server. Invalid game identifier')

if (matchID === undefined | null)
    alert('Error: Cannot connect to the server. Invalid match identifier')

fetchGameUI(gameID);