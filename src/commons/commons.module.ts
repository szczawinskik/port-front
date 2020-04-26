import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrHttpInterceptor } from './interceptors/toastr-http-interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ToastrHttpInterceptor, multi: true }
  ],
  exports: [CommonModule, FormsModule]
})
export class CommonsModule { }
