import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/Postagem';
import { tema } from '../model/Tema';
import { user } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: postagem = new postagem ()
  listaPostagens: postagem []
  
  user: user = new user ()
  idUser = environment.id

  listaTemas: tema[]
  idTema: number
  tema: tema = new tema ()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdTema()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: tema) =>{
      this.tema =  resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: user) => {
      this.user = resp
    })
  }


  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new postagem()
    })

    

  }


}
