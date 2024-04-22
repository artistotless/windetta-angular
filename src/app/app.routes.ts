import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { HomePage } from './pages/home/home.page';
import { OngoingMatchesListPage } from './pages/ongoing-matches-list/ongoing-matches-list.page';
import { AuthorizeGuard } from './services/route-guard.service';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "matches", component: OngoingMatchesListPage, canActivate: [AuthorizeGuard] },
    { path: "**", component: NotFoundPage },
];