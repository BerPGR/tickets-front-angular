import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class TicketService {
    http = inject(HttpClient)

    createTicket(): Observable<Ticket>
}
