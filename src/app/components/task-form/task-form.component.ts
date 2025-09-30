import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task, Priority, Situation } from '../../models/task.model';
import { ToastService } from '../../services/toast.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CustomDropdownComponent, DropdownOption } from '../custom-dropdown/custom-dropdown';
import { CustomDatepickerComponent } from '../custom-datepicker/custom-datepicker';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CustomDropdownComponent,
    CustomDatepickerComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task?: Task;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskSaved = new EventEmitter<void>();

  taskForm: FormGroup;
  loading = false;
  isEditMode = false;
  minDate = new Date();

  priorities: DropdownOption[] = [
    { label: 'Baixa', value: Priority.BAIXA },
    { label: 'Média', value: Priority.MEDIA },
    { label: 'Alta', value: Priority.ALTA }
  ];

  situations: DropdownOption[] = [
    { label: 'Aberta', value: Situation.ABERTA },
    { label: 'Pendente', value: Situation.PENDENTE },
    { label: 'Concluída', value: Situation.CONCLUIDA }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      priority: [Priority.BAIXA, Validators.required],
      situation: [Situation.ABERTA, Validators.required],
      expectedCompletionDate: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] || changes['visible']) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.task) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description,
        priority: this.task.priority,
        situation: this.task.situation,
        expectedCompletionDate: this.task.expectedCompletionDate ? new Date(this.task.expectedCompletionDate) : null
      });
    } else {
      this.isEditMode = false;
      this.taskForm.reset({
        name: '',
        description: '',
        priority: Priority.BAIXA,
        situation: Situation.ABERTA,
        expectedCompletionDate: null
      });
    }
  }

  futureDateValidator(control: any) {
    if (control.value) {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return { pastDate: true };
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.loading = true;
      const taskData = {
        ...this.taskForm.value,
        expectedCompletionDate: this.taskForm.value.expectedCompletionDate.toISOString().split('T')[0]
      };

      if (this.isEditMode && this.task?.id) {
        this.taskService.updateTask(this.task.id, taskData).subscribe({
          next: () => {
            this.loading = false;
            this.toastService.success('Sucesso', 'Tarefa atualizada com sucesso!');
            this.taskSaved.emit();
            this.closeDialog();
          },
          error: (error) => {
            this.loading = false;
            this.toastService.error('Erro', 'Erro ao atualizar tarefa: ' + (error.error?.message || error.message));
          }
        });
      } else {
        this.taskService.createTask(taskData).subscribe({
          next: (response) => {
            this.loading = false;
            this.toastService.success('Sucesso', 'Tarefa criada com sucesso!');
            this.taskForm.reset();
            this.taskSaved.emit();
            this.closeDialog();
          },
          error: (error) => {
            this.loading = false;
            this.toastService.error('Erro', 'Erro ao criar tarefa: ' + (error.error?.message || error.message));
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
    this.taskForm.reset();
    this.isEditMode = false;
    this.loading = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return `${this.getFieldLabel(fieldName)} é obrigatório`;
      }
      if (field.errors?.['maxlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter no máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors?.['pastDate']) {
        return 'Data não pode ser anterior à data atual';
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nome',
      description: 'Descrição',
      priority: 'Prioridade',
      situation: 'Situação',
      expectedCompletionDate: 'Data prevista de conclusão'
    };
    return labels[fieldName] || fieldName;
  }
}
