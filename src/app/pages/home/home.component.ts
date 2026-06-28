import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

interface Ticket {
  id: number;
  title: string;
  team: string;
  status: string;
  client: string;
  priority: string;
  due_date: string;
  created_at: string;
  owner: string;
  responsable: string;
}

@Component({
  selector: 'app-home',
  imports: [TableModule, CardModule, TagModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userTickets: Ticket[] = [];

  cols = [
    { field: 'id',          header: 'ID' },
    { field: 'title',       header: 'Título' },
    { field: 'team',        header: 'Time' },
    { field: 'status',      header: 'Status' },
    { field: 'client',      header: 'Cliente' },
    { field: 'priority',    header: 'Prioridade' },
    { field: 'due_date',    header: 'Prazo' },
    { field: 'created_at',  header: 'Criado em' },
    { field: 'owner',       header: 'Criador' },
    { field: 'responsable', header: 'Responsável' },
  ];

  constructor(
    private service: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.service.fetchUserTickets(user?.user_id!).subscribe({
      next: (tickets) => {
        this.userTickets = [...tickets] as Ticket[];
      },
    });
  }

  getPrioritySeverity(priority: string): 'danger' | 'warn' | 'info' | 'success' {
    const map: Record<string, 'danger' | 'warn' | 'info' | 'success'> = {
      ALTA:  'danger',
      MÉDIA: 'warn',
      BAIXA: 'info',
    };
    return map[priority] ?? 'info';
  }

  getStatusSeverity(status: string): 'warn' | 'success' | 'danger' | 'info' {
    const map: Record<string, 'warn' | 'success' | 'danger' | 'info'> = {
      'Aguardando':  'warn',
      'Em andamento': 'info',
      'Concluído':   'success',
      'Cancelado':   'danger',
    };
    return map[status] ?? 'info';
  }
}