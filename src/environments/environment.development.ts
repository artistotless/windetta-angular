export const environment = {
    production: false,
    // В режиме разработки используем относительные пути - SPA proxy перенаправит на backend
    apiUrl: "/api",
    mvcUrl: "",
    mainHubUrl: "https://localhost:55001/mainHub", // SignalR Hub остается прямым подключением
    enableHttpToasts : false
};