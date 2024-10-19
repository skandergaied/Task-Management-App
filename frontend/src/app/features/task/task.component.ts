import { NgForm } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task.model';
import { AuthService } from '../../shared/services/auth.service'; // Import the AuthService
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, FormsModule,  ReactiveFormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'] // Corrected from styleUrl to styleUrls
})
export class TaskComponent {
  tass: Task[] = [];

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    if (token) {
        const userId = this.authService.getDecodedAccessToken(token);
        if (userId) {
          console.log(userId.id);
            this.loadTasks(userId.id);
        } else {
            console.error('User ID not found in token');
        }
    } else {
        console.error('Token not found in localStorage');
    }
}


  router = inject(Router);

  click() {
    console.log('Button clicked!');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  loadTasks(userId: string): void {
    this.taskService.getTask(userId).subscribe(
      (data) => {
        this.tass = data;
        console.log("Tasks loaded successfully");
        console.log(this.tass);
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  addTask() {
    // Implement task creation logic here
  }
}