import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {
  logs: any[];
  turn: number;
  stum: boolean;

  player: number;
  monster: number;

  playerLife: String;
  monsterLife: String;

  constructor(private router: Router) {
    this.logs = [];
    this.turn = 1;
    this.stum = false;

    this.player = 100;
    this.monster = 100;

    this.playerLife = this.player + '%';
    this.monsterLife = this.monster + '%';
  }

  attack() {
    const damage = this.getRandomInt(5, 10);
    if (this.monster > 0 && this.monster >= damage) {
      this.monster = this.monster - damage;
      this.logs.push('Player: Ataque Básico');
    } else if (this.monster <= damage) {
      this.monster = 0;
      this.logs.push('Você Venceu!');
    }

    this.monsterLife = this.monster + '%';
    this.monsterAttack();
  }

  expecialAttack() {
    const damage = this.getRandomInt(10, 20);

    if (this.monster > 0 && this.monster >= damage) {
      this.monster = this.monster - damage;
      this.logs.push('Player: Ataque Especial');

      if (this.getRandomInt(1, 2) == 1) {
        this.stum = true;
        this.logs.push('Player: Stunou o monstro');
      }
    } else if (this.monster <= damage) {
      this.monster = 0; //TODO chamar função esterna para finalizar o jogo
      this.logs.push('Você Venceu!');
    }

    this.monsterLife = this.monster + '%';

    this.monsterAttack();
    this.stum = false;
  }

  healing() {
    const heal = this.getRandomInt(5, 15);

    if (this.player > 0 && this.player + heal < 100) {
      this.player = this.player + heal;
    } else if ((this.player = 100 || this.player + heal > 100)) {
      this.player = 100;
    }
    this.playerLife = this.player + '%';
    this.logs.push('Player: Cura');
    this.monsterAttack();
  }

  giveUp() {
    if (confirm('Tem certeza que deseja desistir?')) {
      this.router.navigateByUrl('home');
    }
  }

  monsterAttack() {
    if (!this.stum && this.monster > 0) {
      if (this.turn % 4 == 0 && this.turn != 0) {
        const damage1 = this.getRandomInt(6, 12);
        if (this.player > 0 && this.player >= damage1) {
          this.player = this.player - damage1;
          this.logs.push('Monstro: Ataque Especial');
        } else if (this.player <= damage1) {
          this.player = 0;
          this.logs.push('O Monstro Venceu!');
        }
      } else {
        const damage2 = this.getRandomInt(8, 16);
        if (this.player > 0 && this.player >= damage2) {
          this.player = this.player - damage2;
          this.logs.push('Monstro: Ataque Básico');
        } else if (this.player <= damage2) {
          this.player = 0;
          this.logs.push('O Monstro Venceu!');
        }
      }
    }
    this.playerLife = this.player + '%';
    this.turn++;
  }

  //Function to randomize
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnInit(): void {}
}
