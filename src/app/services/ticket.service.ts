import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import apiUrl from '../utils/apiUrl';
import { Router } from '@angular/router';

@Service()
export class TicketService {
    http = inject(HttpClient)

    createTicket(ticket: any) {
        return this.http.post(apiUrl + "/tickets", ticket)
    }
}
