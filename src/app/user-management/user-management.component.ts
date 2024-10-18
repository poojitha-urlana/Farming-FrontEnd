import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { AdminService } from '../Services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent  implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  // Fetch all users
  fetchAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch users';
      }
    );
  }

  // Delete user
  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe(
      (response) => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      (error) => {
        this.errorMessage = 'Failed to delete user';
      }
    );
  }
}