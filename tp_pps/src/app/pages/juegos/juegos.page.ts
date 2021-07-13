import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {


  nombreChat = "Chat Tateti";

  public token: any;
  resultado = "Formar un Vertical, Horizontal o Diagonal con la X";

  puntosUser = 0;
  puntoPC = 0;

  ///game
  board: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  table: HTMLElement[];

  symbol: number = -1;
  gameRunning: boolean = true;
  obtieneDescuento:boolean=false;
  obtieneDescuentoLabel:boolean=false;
  usuarioLog: any;
  //score
  constructor(private router:Router, private fbService:CloudFirestoreService) {
    this.getUser();
  }
  back() {
    this.router.navigateByUrl('home-clientes')
  }
  
  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    //asda
    let cell11: HTMLElement = <HTMLElement>document.getElementById("cell11");
    let cell12: HTMLElement = <HTMLElement>document.getElementById("cell12");
    let cell13: HTMLElement = <HTMLElement>document.getElementById("cell13");
    let cell21: HTMLElement = <HTMLElement>document.getElementById("cell21");
    let cell22: HTMLElement = <HTMLElement>document.getElementById("cell22");
    let cell23: HTMLElement = <HTMLElement>document.getElementById("cell23");
    let cell31: HTMLElement = <HTMLElement>document.getElementById("cell31");
    let cell32: HTMLElement = <HTMLElement>document.getElementById("cell32");
    let cell33: HTMLElement = <HTMLElement>document.getElementById("cell33");
    let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset");

    this.game([cell11, cell12, cell13, cell21, cell22, cell23, cell31, cell32, cell33]);

    cell11.onclick = (e) => { this.ClickCell(1, 1); }
    cell12.onclick = (e) => { this.ClickCell(1, 2); }
    cell13.onclick = (e) => { this.ClickCell(1, 3); }
    cell21.onclick = (e) => { this.ClickCell(2, 1); }
    cell22.onclick = (e) => { this.ClickCell(2, 2); }
    cell23.onclick = (e) => { this.ClickCell(2, 3); }
    cell31.onclick = (e) => { this.ClickCell(3, 1); }
    cell32.onclick = (e) => { this.ClickCell(3, 2); }
    cell33.onclick = (e) => { this.ClickCell(3, 3); }

    /* reset.onclick = (e) => { this.Reset(); } */

  }

  game(t: HTMLElement[]) {
    this.table = t;
  }

  Reset() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.gameRunning = true;
    for (let i = 0; i < 9; i++) {
      this.table[i].innerHTML = "";
    }
    this.resultado = "Formar un Vertical, Horizontal o Diagonal con la X";
  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    this.Reset();    
    Toast.fire({
      icon: icon,
      title: text
    })
  }



  ClickCell(x: number, y: number) {
    this.obtieneDescuentoLabel=false;
    this.resultado = "Empezo el juego";
    let p: number = 3 * (x - 1) + (y - 1);
    if (!this.gameRunning) {
      this.resultado = "Juego Perdido";
    } else {
      if (this.board[p] == this.symbol) {
        this.resultado = "No se pude seleccionar esa casilla!";
      }
      else {
        if (this.board[p] == -this.symbol) {
          this.resultado = "No se pude seleccionar esa casilla!";
        }
        else {
          this.table[p].style.color = "#ff0000";
          this.table[p].innerHTML = "X";
          this.board[p] = 1;
          if (this.win(this.board) == 1) {
            this.gameRunning = false;
            this.resultado = "Ha ganado!";
            this.alert('success','Ganaste! +1');

            this.puntosUser += 1;
            if(this.puntosUser==3){
              this.restarPoints();
              if(!this.obtieneDescuento){
                this.obtieneDescuento = true;
                this.obtieneDescuentoLabel=true;
                this.usuarioLog.participoDelDescuento=true;
                this.usuarioLog.juego1=true;
                this.fbService.Update(this.usuarioLog.id,"usuarios",this.usuarioLog);
                this.resultado="Felicitaciones por obtener 3 puntos seguidos, tenes un 10% de descuento en nuestra Carta!";
              }
            }

          } else {
            if (this.IsFull()) {
              this.gameRunning = false;
              this.resultado = "Empate";
              this.alert('info','Empate! +0');
            } else {
              let v = this.minimax(-1, true);
              this.board[v] = -1;
              this.table[v].style.color = "#0eff019e";
              this.table[v].innerHTML = "O";
              if (this.win(this.board) == -1) {
                this.gameRunning = false;
                this.resultado = "Perdiste ROBOT!";
                this.alert('error','Perdiste! -1');
                
                this.puntoPC += 1;
                if(this.puntoPC==3){
                  this.restarPoints();
                }
              } else {
                if (this.IsFull()) {
                  this.gameRunning = false;
                  this.resultado = "Empate";
                }
              }
            }
          }
        }
      }
    }
  }
  restarPoints(){
    this.puntosUser=0;
    this.puntoPC=0;
  }
  IsFull(): boolean {
    for (let i = 0; i < 9; i++) {
      if (this.board[i] == 0)
        return false;
    }
    return true;
  }

  win(board: number[]): number {
    var b = board[1];
    if (board[0] == b && b == board[2] && b != 0) return b;
    b = board[4];
    if (board[3] == b && b == board[5] && b != 0) return b;
    b = board[7];
    if (board[6] == b && b == board[8] && b != 0) return b;
    b = board[3];
    if (board[0] == b && b == board[6] && b != 0) return b;
    b = board[4];
    if (board[1] == b && b == board[7] && b != 0) return b;
    b = board[5];
    if (board[2] == b && b == board[8] && b != 0) return b;
    b = board[4];
    if (board[0] == b && b == board[8] && b != 0) return b;
    if (board[2] == b && b == board[6] && b != 0) return b;
    return 0;
  }

  minimax(currentPlayer: number, root: boolean): number {
    let winner = this.win(this.board);
    if (winner != 0)
      if (currentPlayer == -1)
        return winner;
      else
        return -winner;

    let possibleMoves: number[] = [];
    for (let i = 0; i < 9; i++) {
      if (this.board[i] == 0)
        possibleMoves.push(i);
    }
    let n: number = possibleMoves.length;

    if (n == 0)
      return 0;

    let which: number = -1;
    let v: number = 100;

    for (let j = 0; j < n; j++) {
      let move = possibleMoves[j];
      //play
      this.board[move] = currentPlayer;
      var m = Math.floor(Math.random() * (8 - 0)) + 0;;

      this.board[move] = 0;
      if (m < v) {
        v = m;
        which = move;
      }
    }
    if (root) {
      return (which)
    }
    else
      return (v)
  }
  async getUser() {
    const tokenUser = localStorage.getItem('token');
    this.fbService.GetByParameter("usuarios", "id", tokenUser).valueChanges()
    .subscribe(async (usersList)=>{
      if(usersList.length > 0){
        this.usuarioLog = usersList[0];
        if(this.usuarioLog.participoDelDescuento){
          this.obtieneDescuento=true;
        }
      }
    });
  }
}
