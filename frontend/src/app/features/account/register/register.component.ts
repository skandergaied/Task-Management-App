import { Component,inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule ,Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { IRegister } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/services/auth.service';
import { ILoginReponse } from '../../../shared/models/user.model';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,MatButtonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    fb=inject(NonNullableFormBuilder) ;
    private readonly userService =inject(UserService);
    private readonly authService =inject(AuthService)
    private readonly router = inject(Router);

    registerForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      
      username: this.fb.control('', [Validators.required]),
     
    });
    
    ///
    register() {
      if (this.registerForm.invalid) {
        return;
      }
  
      this.userService.register(this.registerForm.value as IRegister)
        .subscribe((token: ILoginReponse) => {
          this.authService.token = token.accessToken;
          this.router.navigateByUrl('/login');
        });
    }
    ///
    
}
