
// const apiUrl = "https://main.feed78.com/api";
const apiUrl = "https://localhost:55001/api";

let cached_match_value = JSON.parse(sessionStorage.getItem("cached_match"));

sessionStorage.clear();
let matchID = getUrlParam('match');

if (cached_match_value === null || cached_match_value === undefined)
    window.location.replace(`/matches/${matchID}`);

let gameID = getUrlParam('game');
let gs_endpoint = cached_match_value.gs_endpoint;
let ticket = cached_match_value.ticket;

console.log("cached_match_value", cached_match_value);
console.log("matchID", matchID);
console.log("gameID", gameID);
console.log("gs_endpoint", gs_endpoint);
console.log("ticket", ticket);

// Глобальный объект с данными для игры
window.gameData = {
    matchID: matchID,
    gameID: gameID,
    gs_endpoint: gs_endpoint,
    ticket: ticket,
};

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
        el.type = 'module'; // Поддержка ES6 модулей
        el.addEventListener('load', resolve);
        el.addEventListener('error', reject);
        document.body.append(el);
    });
}

async function setView(uiContent) {
    let gameContent = document.getElementById("gameContent")
    gameContent.innerHTML = `${atob(uiContent.htmlContent)}`;
    
    // Добавляем ссылки на CSS файлы в head
    if (uiContent.styles !== undefined && uiContent.styles !== null) {
        uiContent.styles.forEach(styleUrl => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = styleUrl;
            document.head.appendChild(linkElement);
        });
    }
    
    if (uiContent.scripts !== undefined && uiContent.scripts !== null) {
        // Загружаем все скрипты последовательно
        for (const script of uiContent.scripts) {
            await addScript(script);
        }
    }
}

if (gameID === undefined || gameID === null)
    alert('Error: Cannot connect to the server. Invalid game identifier')

if (matchID === undefined || matchID === null)
    alert('Error: Cannot connect to the server. Invalid match identifier')

fetchGameUI(gameID);