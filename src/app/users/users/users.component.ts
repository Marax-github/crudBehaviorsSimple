import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../users.model';


@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

  user: User[] = [];

  constructor(private userService: UserService){}

  private subscription!: Subscription;
  
  editingUser: Partial<User> | null = null;

  newUser: User = {name:'',email:'',phone:'',address:'',status:'Active'};

  addUser(){
      if(this.newUser.name && this.newUser.email){
        this.userService.addUser({...this.newUser});
      }
      this.newUser = {name:'',email:'',phone:'',address:'',status:'Active'};
  }

  removeUser(email: string){
      this.userService.removeUser(email);
  }

  startEditing(user: User) {
    this.editingUser = { ...user }; // Kopia obiektu, żeby nie zmieniać oryginału
}

updateUser() {
  if (this.editingUser) {
      this.userService.editUser(this.editingUser);
      this.editingUser = null; // Zamyka tryb edycji po zapisaniu
  }
}

  
  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe( user => {
      console.log('Użytkownicy pobrani:', user);
      this.user = user;
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  get users(): Observable<User[]>{
    return this.userService.getUsers()
  }

  
}