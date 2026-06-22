import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../utils/apiUrl';
import { tap } from 'rxjs';

@Service()
export class AuthService {
    http = inject(HttpClient)
    private tokenKey = 'auth_token'

    login(email: string, password: string) {
        return this.http.post<{ token: string, expires_in: number }>(
            apiUrl + "/login", {email, password}
        ).pipe(tap(response => {
            localStorage.setItem(this.tokenKey, response.token)
        }))
    }

    logout() {
        localStorage.removeItem(this.tokenKey)
    }

    getToken(): string|null {
        return localStorage.getItem(this.tokenKey)
    }

    isLoggedIn(): boolean {
        const token = this.getToken()
        if (!token) return false

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            return payload.exp * 1000 > Date.now()
        } catch {
            return false
        }
    }

    getUser(): {user_id: number; email: string; role: string} | null {
        const token = this.getToken()
        if (!token) return null
        
        try {
            return JSON.parse(atob(token.split(',')[1]))
        } catch {
            return null
        }
    }
}
