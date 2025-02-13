import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({providedIn:"root"})
export class UserService {

    private users = new BehaviorSubject([
        {name:'John Doe', email:'John@doe.com',phone:'123-456-789',address:'John Doe Street',status:'Active'},
        {name: 'Jane Smith',email: 'jane@example.com',phone: '987-654-321',address: '456 Elm St',status: 'Inactive'},
    ]);
      
    public user = this.users.asObservable();

    addUser(user: any){
        const currentUser = this.users.getValue();
        console.log(this.users);
        this.users.next([...currentUser, user])

    }

    removeUser(email: string){
        const currentUser = this.users.getValue();
        this.users.next(currentUser.filter((u) => u.email !== email));
    }

    editUser(updateUser: any){
        const users = this.users.getValue().map(user =>
            user.email === updateUser.email ? {...user, ...updateUser} : user
        );
        this.users.next(users);
    }
    
    getUsers(): Observable<any[]>{
        return this.users.asObservable();
    }
}














