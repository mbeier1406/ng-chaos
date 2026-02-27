import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Detail } from './features/detail/detail';
import { CanvasDemo } from './features/canvas-demo/canvas-demo';

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
  },
  {
    path: 'canvas-demo',
    component: CanvasDemo,
    title: 'Canvas Demo',
  }
];

export default routes;
