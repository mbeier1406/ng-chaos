import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Detail } from './detail/detail';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Cid'
  },
  {
    path: 'detail/:id',
    component: Detail,
    title: 'Informationen zum Bild',
  }
];

export default routes;
