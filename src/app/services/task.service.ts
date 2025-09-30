import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { TaskMapperService } from './task-mapper.service';
import { Task, TaskFilter, TaskPageResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private basePath = '/tasks/';

  constructor(
    private apiService: ApiService,
    private taskMapper: TaskMapperService
  ) { }

  getTasks(
    page: number,
    size: number,
    sort: string,
    direction: string,
    filters: TaskFilter
  ): Observable<TaskPageResponse> {
    const params: any = {
      page: page.toString(),
      size: size.toString(),
      sort: `${sort},${direction}`
    };

    if (filters.name) {
      params.name = filters.name;
    }
    if (filters.priority) {
      params.priority = filters.priority;
    }
    if (filters.situation) {
      params.situation = filters.situation;
    }

    return this.apiService.get<any>(this.basePath, params).pipe(
      map(response => {
        return {
          ...response,
          content: this.taskMapper.mapArrayFromBackend(response.content)
        };
      })
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.apiService.get<any>(`${this.basePath}${id}`).pipe(
      map(response => this.taskMapper.mapFromBackend(response))
    );
  }

  createTask(task: Task): Observable<Task> {
    const backendTask = this.taskMapper.mapToBackend(task);
    return this.apiService.post<any>(this.basePath, backendTask).pipe(
      map(response => this.taskMapper.mapFromBackend(response))
    );
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const backendTask = this.taskMapper.mapToBackend(task);
    return this.apiService.put<any>(`${this.basePath}${id}`, backendTask).pipe(
      map(response => this.taskMapper.mapFromBackend(response))
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}${id}`);
  }

  markAsComplete(id: string): Observable<Task> {
    return this.apiService.patch<any>(`${this.basePath}${id}/complete`, {}).pipe(
      map(response => this.taskMapper.mapFromBackend(response))
    );
  }

  markAsPending(id: string): Observable<Task> {
    return this.apiService.patch<any>(`${this.basePath}${id}/pending`, {}).pipe(
      map(response => this.taskMapper.mapFromBackend(response))
    );
  }
}
