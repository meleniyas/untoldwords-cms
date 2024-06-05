import { Component, HostListener } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  name: string | null = null;

  constructor(
    private authService: AuthService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }

  logOut(): void {
    this.authService.logOut();
  }

  isScrolled = false;
  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

}
