import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskMapperService {

  /**
   * Converte dados do backend (português) para formato do frontend (inglês)
   */
  mapFromBackend(backendTask: any): Task {
    return {
      id: backendTask.id,
      name: backendTask.nome || backendTask.name,
      description: backendTask.descricao || backendTask.description,
      priority: backendTask.prioridade || backendTask.priority,
      situation: backendTask.situacao || backendTask.situation,
      expectedCompletionDate: backendTask.dataPrevistaConclusao || backendTask.expectedCompletionDate,
      creationDate: backendTask.dataCriacao || backendTask.creationDate,
      userId: backendTask.idUser || backendTask.userId,
      // Manter campos originais para compatibilidade
      nome: backendTask.nome,
      descricao: backendTask.descricao,
      prioridade: backendTask.prioridade,
      situacao: backendTask.situacao,
      dataPrevistaConclusao: backendTask.dataPrevistaConclusao,
      dataCriacao: backendTask.dataCriacao,
      idUser: backendTask.idUser
    };
  }

  /**
   * Converte dados do frontend (inglês) para formato do backend (português)
   */
  mapToBackend(frontendTask: Task): any {
    return {
      id: frontendTask.id,
      nome: frontendTask.name || frontendTask.nome,
      descricao: frontendTask.description || frontendTask.descricao,
      prioridade: frontendTask.priority || frontendTask.prioridade,
      situacao: frontendTask.situation || frontendTask.situacao,
      dataPrevistaConclusao: frontendTask.expectedCompletionDate || frontendTask.dataPrevistaConclusao,
      dataCriacao: frontendTask.creationDate || frontendTask.dataCriacao,
      idUser: frontendTask.userId || frontendTask.idUser
    };
  }

  /**
   * Mapeia array de tarefas do backend
   */
  mapArrayFromBackend(backendTasks: any[]): Task[] {
    return backendTasks.map(task => this.mapFromBackend(task));
  }
}
