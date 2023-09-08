import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoModalComponent} from "../../todo-modal/todo-modal.component";
import {NgbModal, NgbOffcanvas, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {clearActivatedTodoAction, startDeleteTodoAction} from "../../store/todo.actions";
import {Todo} from "../../todo.model";
import {selectTodoActivated} from "../../store/todo.selectors";
import {Observable} from "rxjs";
import {ToastService} from "../../../shared/toast/toast.service";

@Component({
  selector: 'app-todo-options',
  standalone: true,
  imports: [CommonModule, NgbTooltip],
  templateUrl: './todo-options.component.html',
  styleUrls: ['./todo-options.component.css']
})
export class TodoOptionsComponent implements OnInit {

  @Input() offcanvasContent: any;

  activatedTodo: Observable<Todo | null> = new Observable<Todo | null>();


  constructor(private modalService: NgbModal,
              private offcanvasService: NgbOffcanvas,
              private toastService: ToastService,
              private store: Store<AppState>,
  ) {
  };

  ngOnInit() {
    this.activatedTodo = this.store.select(selectTodoActivated);
  };

  openList() {
    (!this.offcanvasService.hasOpenOffcanvas())
      ? this.offcanvasService.open(this.offcanvasContent)
      : this.offcanvasService.dismiss('Cross click ')
  };

  openModal() {
    this.modalService.open(TodoModalComponent, {
      backdrop: false,
      centered: true,
    });
  };

  openModalOnAddMode() {
    this.store.dispatch(clearActivatedTodoAction());

    this.openModal();
  };

  onDeleteTodo() {
    this.store.dispatch(startDeleteTodoAction());

    this.toastService.show('Todo deleted successfully!', { customClass: 'bg-danger'})
  };

}
