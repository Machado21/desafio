import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  constructor(private router: Router) { }

  giveUp(){
    if(confirm("Tem certeza que deseja desistir?")){
      // TODO: implementar desistir
      this.router.navigateByUrl('home');
    }
  }

  ngOnInit(): void {
  }

}
