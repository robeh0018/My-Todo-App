import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectTodosState} from "../store/todo.selectors";
import {Subscription} from "rxjs";
import {Todo} from "../todo.model";
import {startSetTodoAction, startUpdateTodoAction} from "../store/todo.actions";
import {ToastService} from "../../shared/toast/toast.service";

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
  errorMessage: string | null = null;

  storeSubscription: Subscription;

  modalForm: FormGroup = new FormGroup<any>({});

  constructor(private store: Store<AppState>,
              public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private toastService: ToastService,
  ) {

    this.storeSubscription = new Subscription();
  }

  ngOnInit() {
    this.storeSubscription = this.store.select(selectTodosState)
      .subscribe(todoState => {
        this.isEditMode = !!todoState.todoActivated;
        this.todoActivated = todoState.todoActivated;
        this.errorMessage = todoState.errorMessage;
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
      'title': new FormControl(formTitle, [Validators.required, Validators.maxLength(30)]),
      'description': new FormControl(formDescription, Validators.required),
      'done': new FormControl(formDone, Validators.required),
    })
  };

  onSubmit() {
    if (!this.modalForm.value) return;

    let toastMessage: string;

    if (this.isEditMode) {
      this.store.dispatch(startUpdateTodoAction({payload: this.modalForm.value}));

      toastMessage = 'Todo updated Successfully!'

    } else {
      this.store.dispatch(startSetTodoAction({payload: this.modalForm.value}));

      toastMessage = 'Todo added successfully!'
    }

    if (this.errorMessage) toastMessage = this.errorMessage;

    this.toastService.show(toastMessage, {customClass: 'bg-teal'});

    this.activeModal.close('Close click');
  };

  ngOnDestroy() {

    this.storeSubscription.unsubscribe();
  };

}
