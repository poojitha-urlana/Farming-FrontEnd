import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementService } from '../Services/user-management.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, username: '', password: '', email: '', fullName: '', confirmPassword: '' };

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userManagementService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  createUser(): void {
    this.userManagementService.createUser(this.newUser).subscribe(
      (newUser) => {
        this.users.push(newUser);
        this.resetNewUser(); // Clear the form after successful creation
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  updateUser(user: User): void {
    if (user.id) {
      this.userManagementService.updateUser(user.id, user).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          // Optionally reset selectedUser or show a success message
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  deleteUser(userId: number): void {
    this.userManagementService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // Helper method to reset the new user form
  private resetNewUser(): void {
    this.newUser = { id: 0, username: '', password: '', email: '', fullName: '', confirmPassword: '' };
  }
}
