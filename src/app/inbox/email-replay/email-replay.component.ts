import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Email, EmailService } from '../email.service';

@Component({
  selector: 'app-email-replay',
  templateUrl: './email-replay.component.html',
  styleUrls: ['./email-replay.component.css']
})
export class EmailReplayComponent {
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n--------${this.email.from} wrote:\n>${this.email.text.replace(/\n/gi,'\n> ')}`
    }
  }
  

  onSubmit(email: Email){
    this.emailService.sendMail(email).subscribe(()=>{
        this.showModal  = false;
    });

  }

}
