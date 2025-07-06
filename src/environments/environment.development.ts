export const environment = {
    production: false,
    // В режиме разработки используем относительные пути - SPA proxy перенаправит на backend
    mainApiUrl: "/proxy/main/api",
    identityApiUrl: "/proxy/identity/api",
    mainHubUrl: "http://localhost:56001/mainHub", // SignalR Hub остается прямым подключением
    enableHttpToasts: false
};