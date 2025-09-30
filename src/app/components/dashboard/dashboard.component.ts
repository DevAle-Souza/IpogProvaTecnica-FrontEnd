import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskFilter, Priority, Situation } from '../../models/task.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CustomDropdownComponent, DropdownOption } from '../custom-dropdown/custom-dropdown';
import { CustomPaginationComponent, PaginationEvent } from '../custom-pagination/custom-pagination';

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
    SelectModule,
    TagModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    PaginatorModule,
    TaskFormComponent,
    CustomDropdownComponent,
    CustomPaginationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;

  totalTasks = 0;
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

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
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
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar tarefas: ' + (error.error?.message || error.message)
        });
        this.loading = false;
      }
    });
  }

  updateStatistics(): void {
    this.totalTasks = this.tasks.length;
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
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tarefa marcada como concluída!'
          });
          this.reloadTasks();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro: ' + (error.error?.message || error.message)
          });
        }
      });
    }
  }

  markAsPending(task: Task): void {
    if (task.id) {
      console.log('Marking task as pending:', task.id);
      this.taskService.markAsPending(task.id).subscribe({
        next: (response) => {
          console.log('Task marked as pending successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tarefa marcada como pendente!'
          });
          this.reloadTasks(); // Recarrega a lista automaticamente
        },
        error: (error) => {
          console.error('Error marking task as pending:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro: ' + (error.error?.message || error.message)
          });
        }
      });
    }
  }

  deleteTask(task: Task): void {
    console.log('deleteTask called for task:', task);
    if (task.id) {
      console.log('Opening confirmation dialog...');
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir a tarefa "${task.name || task.nome}"? Esta ação não pode ser desfeita.`,
        header: 'Confirmar Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, Excluir',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-outlined',
        accept: () => {
          console.log('Deleting task:', task.id);
          this.taskService.deleteTask(task.id!).subscribe({
            next: () => {
              console.log('Task deleted successfully');
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Tarefa excluída com sucesso!'
              });
              this.reloadTasks(); // Recarrega a lista automaticamente
            },
            error: (error) => {
              console.error('Error deleting task:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir tarefa: ' + (error.error?.message || error.message)
              });
            }
          });
        },
        reject: () => {
          console.log('Task deletion cancelled');
        }
      });
    }
  }

  showTaskFormModal(task?: Task): void {
    this.selectedTask = task;
    this.showTaskForm = true;
  }

  onTaskSaved(): void {
    console.log('Task saved, reloading tasks...');
    this.showTaskForm = false;
    this.selectedTask = undefined;
    this.reloadTasks();
  }

  /**
   * Método utilitário para recarregar a lista de tarefas
   * Garante que a lista seja sempre atualizada após qualquer ação
   */
  private reloadTasks(): void {
    console.log('Reloading tasks after action...');
    // Força o recarregamento resetando o estado
    this.currentPage = 0;
    this.loadTasks();
  }

  /**
   * Força o recarregamento completo da lista
   * Útil quando há problemas de sincronização
   */
  forceReload(): void {
    console.log('Force reloading tasks...');
    this.tasks = [];
    this.totalElements = 0;
    this.currentPage = 0;
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
