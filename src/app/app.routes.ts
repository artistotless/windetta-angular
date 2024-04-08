import { Routes } from '@angular/router';
import { AppComponent } from './root/app.component';
import { OngoingMatchesListPage } from './matches/pages/ongoing-matches-list/ongoing-matches-list.page';
import { NotFoundPage } from './shared/pages/not-found/not-found.page';
import { HomePage } from './home/pages/home/home.page';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "matches", component: OngoingMatchesListPage },
    { path: "**", component: NotFoundPage },
];