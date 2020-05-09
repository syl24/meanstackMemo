import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postsSubscription: Subscription;

  constructor(public postsService: PostService){

  }

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {this.posts = posts;});
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }
}
