import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if user login
        if (!this.authService.isAuthenticated) {
            this.router.navigate(['/login']);
        }
        // Check if request is for getting JWT token
        if (req.url.indexOf("token/generate-token") > 0 || req.url.indexOf("signup") > 0) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            req = req.clone({ headers });
        } else {
            const headers = new HttpHeaders({
                'Authorization': 'Bearer ' + this.authService.getToken(),
                'Content-Type': 'application/json'
            });
            req = req.clone({ headers });
        }
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log("Inside interceptor");
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log("You are not authorized");
                    this.router.navigate(['/login']);
                }
            }
        });
    }
}
