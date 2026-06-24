import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../class/team';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../class/clients';
import { Users } from '../../class/users';
import { UsersService } from '../../services/users.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea'
import { TagModule } from 'primeng/tag'
import { DividerComponent } from '../../components/divider/divider.component';
import { DialogModule } from 'primeng/dialog'
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-newtickt.component',
  imports: [
    DialogModule,
    DividerComponent,
    CardModule,
    TextareaModule,
    TagModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    CommonModule,
    SelectModule,
  ],
  templateUrl: './newticket.component.html',
  styleUrl: './newtickt.component.css',
})
export class NewTicketComponent implements OnInit {
  teams: Team[] = [];
  clients: Clients[] = [];
  users: Users[] = [];
  tags: string[] = [];
  visible: boolean = false;
  tagText: string = "";

  priority = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Média', value: 'MEDIA' },
    { label: 'Baixa', value: 'BAIXA' },
  ];

  newTicket: {
    selectedTeam: Team | null;
    client: Clients | null;
    dueUser: Users | null;
    dueDate: Date | null;
    priority: {},
    titulo: string;
    description: string;
  } = {
    titulo: '',
    description: "",
    priority: {},
    selectedTeam: null,
    client: null,
    dueUser: null,
    dueDate: null,
  };

  constructor(
    private tService: TeamsService,
    private cService: ClientsService,
    private uService: UsersService,
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tService.fetchTeams().subscribe({
      next: (valor) => {
        this.teams = [...valor];
      },
      error: (erro) => console.log(erro),
    });

    this.cService.getAll().subscribe({
      next: (clients) => {
        this.clients = [...clients];
      },
    });
  }

  addTag() {
    if (this.tagText === "") 
      {
        return
      }

    this.tags.push(this.tagText)
    this.tagText = ""
    this.visible = false
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag)

    if (index !== -1) {
      this.tags.splice(index, 1)
    }
  }

  showTagDialog() {
    this.visible = true
  }

  createNewTicket() {
    const user = this.authService.getUser()
    const dueDate = this.newTicket.dueDate;
    const newTicket = {
      ...this.newTicket,
      dueDate: dueDate?.toISOString().slice(0, 10).replace(/-/g, '/'),
      owner_id: user?.user_id,
      tags: this.tags
    }
    this.ticketService.createTicket(newTicket).subscribe({
      next: (data: any) => {
        if (data.status === 201) {
          this.router.navigate(['/'])
        }
      }
    })
  }

  setUsersByClient() {
    this.uService.getAll().subscribe({
      next: (users) => {
        this.users = users.filter((u) => u.team_id === this.newTicket.selectedTeam!.id);
      },
    });
  }
}
