'use strict';

var url = `${gs_endpoint}api/matches/${matchID}`;
var hub = `${gs_endpoint}matches/${matchID}`;

var moves = 0;
var spectatorMode = false;

var connection = new signalR.HubConnectionBuilder()
    .withUrl(hub, {
        skipNegotiation: true,
        transport: 1,
        accessTokenFactory: () => ticket,
    })
    .withAutomaticReconnect(new signalR.DefaultReconnectPolicy([0, 2000, 3000, 5000, 10000, 30000]))
    .build();

// GameEvents
connection.on('onOccuredError', function (message) {
    console.log(`Error: ${message}`);
});

connection.on('onGameUpdated', function (e) {
    console.log(`Game updated:`);
    console.log(e);

    e.eventType
});

connection.on('onGameFinished', function (e) {
    console.log(`Game finished:`);
    console.log(e);
    alert(`Match finished! Winner: ${e.winnerId}`)
});

connection.on('onGameCanceled', function (e) {
    console.log(`Game canceled:`);
    console.log(e);
    alert(`Match canceled: ${e.reason}`)
});

connection.on('onStateUpdated', function (e) {
    console.log(`New state`);
    console.log(e);
});

connection.on('onGetMoves', function (e) {
    moves = e;
    console.log(`moves: ${e}`);
});


// GameMethods
async function dropBomb(cell) {
    console.log(`execution dropBomb(): ${cell}`);
    connection.send("ProcessAction", 1, cell)
}

async function getMoves() {
    console.log('execution getMoves()...');
    connection.send("ProcessAction", 0, "")
}

document.getElementById('get_moves').addEventListener('click', async (event) => {
    await getMoves();
    event.preventDefault();
});

document.getElementById('drop_bomb').addEventListener('click', async (event) => {
    let positin = document.getElementById('position_input').value;
    await dropBomb(positin);
    event.preventDefault();
});

async function start() {
    try {
        await connection.start();
        console.log("Connected to test_games server");

    } catch (err) {
        console.log(err);
    }
};

// Start the connection.
start();