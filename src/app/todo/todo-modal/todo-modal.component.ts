import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectTodoActivated} from "../store/todo.selectors";
import {Subscription} from "rxjs";
import {Todo} from "../todo.model";
import {startSetTodoAction, startUpdateTodoAction} from "../store/todo.actions";

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit, OnDestroy {

  isEditMode: boolean = false;
  todoActivated: Todo | null = null;

  storeSubscription: Subscription;

  modalForm: FormGroup = new FormGroup<any>({});

  constructor(public activeModal: NgbActiveModal,
              private store: Store<AppState>,
              private fb: FormBuilder) {

    this.storeSubscription = new Subscription();
  }

  ngOnInit() {
    this.storeSubscription = this.store.select(selectTodoActivated)
      .subscribe(todoActivated => {
        this.isEditMode = !!todoActivated;
        this.todoActivated = todoActivated;
      });

    this.#initForm();
  };

  #initForm() {

    let formTitle = null;
    let formDescription = null;
    let formDone = false;

    if (this.isEditMode) {
      const {done, title, description} = this.todoActivated!;

      formDone = done;
      formDescription = description;
      formTitle = title;
    }

    this.modalForm = this.fb.group({
      'title': new FormControl(formTitle, [Validators.required, Validators.maxLength(40)]),
      'description': new FormControl(formDescription, Validators.required),
      'done': new FormControl(formDone, Validators.required),
    })
  };

  onSubmit() {
    if (!this.modalForm.value) return;

    this.isEditMode
      ? this.store.dispatch(startUpdateTodoAction({payload: this.modalForm.value}))
      : this.store.dispatch(startSetTodoAction({payload: this.modalForm.value}))

    this.activeModal.close('Close click');
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  };

}
