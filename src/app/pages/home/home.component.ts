import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home.component',
  imports: [TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userTickets: Object[] = []

  constructor(
    private service: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser()
    this.service.fetchUserTickets(user?.user_id!).subscribe({
      next: (tickets) => {
        this.userTickets = [...tickets]
        console.log(this.userTickets)
      }
    })

  }

}
