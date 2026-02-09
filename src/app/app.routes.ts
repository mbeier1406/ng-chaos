import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Detail } from './features/detail/detail';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Cid der Schnuffdi'
  },
  {
    path: 'detail/:id',
    component: Detail,
    title: 'Informationen zum Bild',
  }
];

export default routes;
