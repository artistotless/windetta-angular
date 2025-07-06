export const environment = {
    production: false,
    // В режиме разработки используем относительные пути - SPA proxy перенаправит на backend
    mainApiUrl: "/proxy/main/api",
    identityApiUrl: "/proxy/identity/api",
    mainHubUrl: "https://localhost:55001/mainHub", // SignalR Hub остается прямым подключением
    enableHttpToasts: false
};