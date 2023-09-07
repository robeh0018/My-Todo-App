import {Route, Routes} from "@angular/router";
import {TodoComponent} from "./todo.component";

const TodoRoutes: Routes = [
    {
        path: '', component: TodoComponent,
        children: [
            {
                path: ':id',
                loadComponent: () => import('./todo-details/todo-details.component').then(c => c.TodoDetailsComponent),
            }
        ]
    },

]

export default TodoRoutes as Route[];
