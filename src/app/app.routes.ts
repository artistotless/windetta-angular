import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { HomePage } from './pages/home/home.page';
import { OngoingMatchesListPage } from './pages/ongoing-matches-list/ongoing-matches-list.page';
import { AuthorizeGuard } from './services/route-guard.service';
import { LobbiesPage } from './pages/lobbies/lobbies.page';
import { LoginPage } from './pages/login/login.page';
import { LogoutPage } from './pages/logout/logout.page';
import { ProfilePage } from './pages/profile/profile.page';

export const routes: Routes = [
    { path: "", component: HomePage, title: "Windetta | PVP Ton Battles" },
    { path: "profile", component: ProfilePage, title: "Windetta | MyProfile" },
    { path: "matches", component: OngoingMatchesListPage, canActivate: [AuthorizeGuard], title: "Windetta | Matches" },
    { path: "lobbies", component: LobbiesPage, canActivate: [AuthorizeGuard], title: "Windetta | Lobbies" },
    { path: "login", component: LoginPage, title: "Windetta | Login" },
    { path: "logout", component: LogoutPage, title: "Windetta | Logout" },
    { path: "**", component: NotFoundPage, title: "404 - NotFound" }
];