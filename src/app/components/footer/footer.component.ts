import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  closeFooter;
  constructor(private dataService: UserService) { }

  ngOnInit(): void {
    this.closeFooter = localStorage.getItem('user');
    this.dataService.login.subscribe((res) => {
      this.closeFooter = localStorage.getItem('user');
    })
  }

}
