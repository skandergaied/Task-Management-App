import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin, ILoginReponse, IRegister } from '../models/user.model';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);
  API_SERVER = "http://localhost:3000";


public createTask(task: Task){
  return this.http.post<Task>(`${this.API_SERVER}/users/${task.id}/tasks`, task);
}

public updateTask(task: Task){
  return this.http.put<Task>(`${this.API_SERVER}/users/${task.id}`, task);
}

public deleteTask(id: number){
  return this.http.delete(`${this.API_SERVER}/users/${id}/delete`);
}

public getTask(id: string): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.API_SERVER}/user/${id}/tasks`);
}

}
