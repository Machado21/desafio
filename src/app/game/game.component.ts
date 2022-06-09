import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logs } from '../model/logs.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {
  logs: Logs[];
  turn: number;
  stum: boolean;
  endGame: boolean;

  player: number;
  attackSpecial: number;
  specialState: string;
  monster: number;

  playerLife: String;
  monsterLife: String;

  barColorPlayer: String;
  barColorMonster: String;

  constructor(private router: Router) {
    this.logs = [];
    this.turn = 1;
    this.stum = false;
    this.endGame = false;

    this.player = 100;
    this.attackSpecial = 2;
    this.specialState = 'item__disabled';
    this.monster = 100;

    this.playerLife = this.player + '%';
    this.monsterLife = this.monster + '%';

    this.barColorPlayer = '#08d42a';
    this.barColorMonster = '#08d42a';
  }

  attack() {
    if (!this.endGame) {
      const damage = this.getRandomInt(5, 10);
      if (this.monster > 0 && this.monster >= damage) {
        this.monster = this.monster - damage;
        this.addLog(
          this.turn,
          'player',
          `Jogador - Ataque Básico (-${damage})`
        );
      } else if (this.monster <= damage) {
        this.monster = 0;
        this.addLog(
          this.turn,
          'player',
          `Jogador - Ataque Básico (-${damage})`
        );
        this.win();
      }

      this.monsterLife = this.monster + '%';
      this.monsterAttack();
    }
  }

  specialAttack() {
    if (!this.endGame && this.attackSpecial == 0) {
      const damage = this.getRandomInt(10, 20);
      if (this.monster > 0 && this.monster >= damage) {
        this.monster = this.monster - damage;
        this.addLog(
          this.turn,
          'player',
          `Jogador - Ataque Especial (-${damage})`
        );

        if (this.getRandomInt(1, 2) == 1) {
          this.stum = true;
          this.addLog(this.turn, 'monster', `Monstro - Ficou Estunado! `);
        }
      } else if (this.monster <= damage) {
        this.monster = 0;
        this.addLog(
          this.turn,
          'player',
          `Jogador - Ataque Especial (-${damage})`
        );
        this.win();
      }
      this.monsterLife = this.monster + '%';
      this.monsterAttack();
      this.attackSpecial += 2;
      this.specialState = 'item__disabled';
      this.stum = false;
    }
  }

  healing() {
    if (!this.endGame) {
      const heal = this.getRandomInt(5, 15);

      if (this.player > 0 && this.player + heal < 100) {
        this.player = this.player + heal;
      } else if ((this.player = 100 || this.player + heal > 100)) {
        this.player = 100;
      }
      this.playerLife = this.player + '%';
      this.addLog(this.turn, 'player', `Jogador - Usou Cura (+${heal})`);

      this.monsterAttack();
    }
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
          this.addLog(
            this.turn,
            'monster',
            `Monstro - Ataque Básico (-${damage1})`
          );
        } else if (this.player <= damage1) {
          this.player = 0;
          this.addLog(
            this.turn,
            'monster',
            `Monstro - Ataque Básico (-${damage1})`
          );
          this.lose();
        }
      } else {
        const damage2 = this.getRandomInt(8, 16);
        if (this.player > 0 && this.player >= damage2) {
          this.player = this.player - damage2;
          this.addLog(
            this.turn,
            'monster',
            `Monstro - Ataque Especial (-${damage2})`
          );
        } else if (this.player <= damage2) {
          this.player = 0;
          this.addLog(
            this.turn,
            'monster',
            `Monstro - Ataque Especial (-${damage2})`
          );
          this.lose();
        }
      }
    }
    this.playerLife = this.player + '%';
    this.attackSpecial == 0 ? this.attackSpecial : this.attackSpecial--;
    this.attackSpecial == 0
      ? (this.specialState = 'item')
      : (this.specialState = 'item__disabled');
    this.lifeBar();
    this.turn++;
  }

  lifeBar() {
    this.player < 50 ? (this.barColorPlayer = '#d4c308') : this.barColorPlayer;
    this.player < 20 ? (this.barColorPlayer = '#d40808') : this.barColorPlayer;
    this.monster < 50
      ? (this.barColorMonster = '#d4c308')
      : this.barColorMonster;
    this.monster < 20
      ? (this.barColorMonster = '#d40808')
      : this.barColorMonster;
  }

  win() {
    this.endGame = true;
    this.addLog(this.turn, 'player', 'Jogador - Venceu!');
  }

  lose() {
    this.endGame = true;
    this.addLog(this.turn, 'monster', 'Monstro - Venceu!');
  }

  addLog(turn: number, person: string, mensage: string) {
    this.logs.push({
      turn: turn,
      person: person,
      mensage: mensage,
      style: person == 'monster' ? 'end' : 'start',
    });
  }

  //Function to randomize
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnInit(): void {}
}
