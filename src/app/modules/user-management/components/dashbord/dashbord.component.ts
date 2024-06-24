import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  users: User[] = [];
  userId: string;
  private apiUrl = 'http://127.0.0.1:9090/user/';
  
  constructor(
    private userService: UsersService,
    private router : Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); // Get userId from localStorage
    this.getAll();
  }

  // Get all users
  getAll() {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    this.http.get<User[]>(this.apiUrl, httpOptions).subscribe(
      (data: User[]) => {
        // Filter out the current user
        this.users = data.filter(user => user._id !== this.userId);
        this.users.length; // Update the length after filtering
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(id: any) {
    localStorage.setItem('fromListUser', "true");
    const url = "users/edit/" + id;
    this.router.navigateByUrl(url);
  }

  deleteUser(item: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(item).subscribe((res) => {
          Swal.fire({
            title: 'Supprimé !',
            text: 'Le utilisateur a été supprimé.',
            icon: 'success',
          }).then(() => {
            this.getAll(); // Refresh the list after deletion
          });
        });
      }
    });
  }
}
