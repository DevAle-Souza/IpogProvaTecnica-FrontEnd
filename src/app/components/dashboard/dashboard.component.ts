import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskFilter, Priority, Situation } from '../../models/task.model';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CustomDropdownComponent, DropdownOption } from '../custom-dropdown/custom-dropdown';
import { CustomPaginationComponent, PaginationEvent } from '../custom-pagination/custom-pagination';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../confirmation-dialog/confirmation-dialog';
import { CustomToastComponent } from '../custom-toast/custom-toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
    TaskFormComponent,
    CustomDropdownComponent,
    CustomPaginationComponent,
    ConfirmationDialogComponent,
    CustomToastComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading = false;
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;

  completedTasks = 0;
  pendingTasks = 0;
  openTasks = 0;

  filter: TaskFilter = {
    name: '',
    priority: undefined,
    situation: undefined
  };

  sortField = 'name';
  sortOrder = 1;

  priorities: DropdownOption[] = [
    { label: 'Todas', value: null },
    { label: 'Baixa', value: Priority.BAIXA },
    { label: 'Média', value: Priority.MEDIA },
    { label: 'Alta', value: Priority.ALTA }
  ];

  situations: DropdownOption[] = [
    { label: 'Todas', value: null },
    { label: 'Aberta', value: Situation.ABERTA },
    { label: 'Pendente', value: Situation.PENDENTE },
    { label: 'Concluída', value: Situation.CONCLUIDA }
  ];

  showTaskForm = false;
  selectedTask: Task | undefined;

  showConfirmationDialog = false;
  confirmationData: ConfirmationDialogData = {
    title: 'Confirmar Exclusão',
    message: '',
    confirmText: 'Sim, Excluir',
    cancelText: 'Cancelar',
    type: 'danger'
  };
  taskToDelete: Task | undefined;
  toastMessages: ToastMessage[] = [];
  private toastSubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.messages$.subscribe(
      messages => this.toastMessages = messages
    );
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  loadTasks(): void {
    this.loading = true;
    const sortDirection = this.sortOrder === 1 ? 'ASC' : 'DESC';

    this.taskService.getTasks(
      this.currentPage,
      this.pageSize,
      this.sortField,
      sortDirection,
      this.filter
    ).subscribe({
      next: (response) => {
        this.tasks = response.content;
        this.totalElements = response.totalElements;
        this.updateStatistics();
        this.loading = false;
      },
      error: (error) => {
        this.toastService.error('Erro', 'Erro ao carregar tarefas: ' + (error.error?.message || error.message));
        this.loading = false;
      }
    });
  }

  updateStatistics(): void {
    this.completedTasks = this.tasks.filter(t => (t.situation || t.situacao) === Situation.CONCLUIDA).length;
    this.pendingTasks = this.tasks.filter(t => (t.situation || t.situacao) === Situation.PENDENTE).length;
    this.openTasks = this.tasks.filter(t => (t.situation || t.situacao) === Situation.ABERTA).length;
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadTasks();
  }

  onLazyLoad(event: any): void {
    this.currentPage = event.first / event.rows;
    this.pageSize = event.rows;

    if (event.sortField) {
      this.sortField = event.sortField;
      this.sortOrder = event.sortOrder === 1 ? 1 : -1;
    }

    this.loadTasks();
  }

  onPageChange(event: PaginationEvent): void {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.loadTasks();
  }

  getPrioritySeverity(priority: Priority): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined {
    switch (priority) {
      case Priority.ALTA: return 'danger';
      case Priority.MEDIA: return 'warn';
      case Priority.BAIXA: return 'success';
      default: return 'info';
    }
  }

  getSituationSeverity(situation: Situation): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined {
    switch (situation) {
      case Situation.CONCLUIDA: return 'success';
      case Situation.PENDENTE: return 'warn';
      case Situation.ABERTA: return 'info';
      default: return 'secondary';
    }
  }

  markAsComplete(task: Task): void {
    if (task.id) {
      this.taskService.markAsComplete(task.id).subscribe({
        next: (response) => {
          this.toastService.success('Sucesso', 'Tarefa marcada como concluída!');
          this.reloadTasks();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro: ' + (error.error?.message || error.message));
        }
      });
    }
  }

  markAsPending(task: Task): void {
    if (task.id) {
      this.taskService.markAsPending(task.id).subscribe({
        next: (response) => {
          this.toastService.success('Sucesso', 'Tarefa marcada como pendente!');
          this.reloadTasks();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro: ' + (error.error?.message || error.message));
        }
      });
    }
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.taskToDelete = task;
      this.confirmationData = {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a tarefa "${task.name || task.nome}"? Esta ação não pode ser desfeita.`,
        confirmText: 'Sim, Excluir',
        cancelText: 'Cancelar',
        type: 'danger'
      };
      this.showConfirmationDialog = true;
    }
  }

  onConfirmDelete(): void {
    if (this.taskToDelete?.id) {
      this.taskService.deleteTask(this.taskToDelete.id).subscribe({
        next: () => {
          this.toastService.success('Sucesso', 'Tarefa excluída com sucesso!');
          this.reloadTasks();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao excluir tarefa: ' + (error.error?.message || error.message));
        }
      });
    }
  }

  onCancelDelete(): void {
    this.taskToDelete = undefined;
  }

  showTaskFormModal(task?: Task): void {
    this.selectedTask = task;
    this.showTaskForm = true;
  }

  onTaskSaved(): void {
    this.showTaskForm = false;
    this.selectedTask = undefined;
    this.reloadTasks();
  }

  private reloadTasks(): void {
    this.currentPage = 0;
    this.loadTasks();
  }

  forceReload(): void {
    this.tasks = [];
    this.totalElements = 0;
    this.currentPage = 0;
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onToastClose(messageId: string): void {
    this.toastService.close(messageId);
  }
}
