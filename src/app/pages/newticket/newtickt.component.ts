import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../class/team';
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { SelectModule } from 'primeng/select'
import { FormsModule } from "@angular/forms"
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel'
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../class/clients';
import { Users } from '../../class/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-newtickt.component',
  imports: [CardModule, ButtonModule, FloatLabelModule, FormsModule, CommonModule, SelectModule],
  templateUrl: './newticket.component.html',
  styleUrl: './newtickt.component.css',
})
export class NewTicketComponent implements OnInit {
  teams: Team[] = []
  clients: Clients[] = []
  users: Users[] = []

  newTicket: { selectedTeam: Team | null; dueUser: Users | null } = {
    selectedTeam: null,
    dueUser: null,
  }
  
  constructor(
    private tService: TeamsService,
    private cService: ClientsService,
    private uService: UsersService
  ) {}

  ngOnInit(): void {
    this.tService.fetchTeams().subscribe({
      next: (valor) => {
        this.teams = [...valor]
      },
      error: erro => console.log(erro)
    })

    this.cService.getAll().subscribe({
      next: (clients) => {
        this.clients = [...clients]
      }
    })
  }

  setUsersByClient() {
    this.uService.getAll().subscribe({
      next: (users) => {
        this.users = users.filter(u => u.team_id === this.newTicket.selectedTeam!.id)
      }
    })
  }
}
