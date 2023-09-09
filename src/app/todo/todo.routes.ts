import {Route} from "@angular/router";
import {TodoComponent} from "./todo.component";

const TodoRoutes: Route[] = [
  {
    path: '', component: TodoComponent,
    children: [
      {
        path: 'no-selected',
        loadComponent: () => import('./no-selected/no-selected.component').then(c => c.NoSelectedComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./todo-details/todo-details.component').then(c => c.TodoDetailsComponent),
      },
    ]
  },

]

export default TodoRoutes as Route[];
