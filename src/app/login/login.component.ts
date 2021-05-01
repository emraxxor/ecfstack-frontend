import { PlaceholderDirective } from '../component/ui/placeholder.directive';
import { DialogComponent } from '../component/ui/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(PlaceholderDirective, { static: false }) dialog!: PlaceholderDirective;

  private closeSubscription!: Subscription;

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  invalidCreds = false;

  constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private componentFactoryResolver: ComponentFactoryResolver
        ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/profile']).then(r => {
        if (!r) {
          console.warn(`Problem is occurred during navigation.`);
        }
      });
    }
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }


  async login(): Promise<void> {
    if (this.form.valid) {
        try {
        const res = await this.authService.login(this.form.value);
        await this.router.navigate(['/profile']);
      } catch (e: any) {
        this.invalidCreds = true;
        this.showErrorAlert('Invalid username or password', 'Invalid username or password.');
      }
    }
  }

  private showErrorAlert(title: string, message: string): void {
    const dialogFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);

    const containerRef = this.dialog.viewContainerRef;
    containerRef.clear();

    const componentRef = containerRef.createComponent(dialogFactory);

    componentRef.instance.title = title;
    componentRef.instance.body = message;

    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      containerRef.clear();
    });
  }

}
