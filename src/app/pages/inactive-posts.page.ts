import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { getPosts } from '../posts.service';

//let arrayAggiornato: object[] = [];

@Component({
    template: `
      <div class="container mt-5">
      <div *ngFor="let post of posts">
        <div [ngClass]="{
      'bg-warning': post.type == 'news',
      'bg-info': post.type == 'education',
      'bg-dark': post.type == 'politic',
      'text-white': post.type == 'politic'
    }"
     *ngIf="!post.active" class="card mb-4">
          <h5 class="card-header">Post</h5>
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.body }}
            </p>
            <button type="button" class="btn btn-primary" (click)="attiva(post.id)">Attiva</button>
            <button type="button" class="btn btn-primary" (click)="cancella(post.id)">Cancella</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [
    ]
})

export class InactivePostsPage implements OnInit {
    posts!: Post[];

    constructor() {
        getPosts().then((posts) => {
            this.posts = posts.lista;
            console.log(this.posts);
        });
    }

    ngOnInit(): void {

    }

    attiva = (element: number) => {
        //this.posts[element - 1].active = true;
        console.log(this.posts)
        //aggiornaJson
        fetch('http://localhost:3000/lista' + '/' + element, {
            method: 'PATCH',
            body: JSON.stringify({
                active: true,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    cancella = (element: number) => {
        fetch('http://localhost:3000/lista' + '/' + element, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
}
