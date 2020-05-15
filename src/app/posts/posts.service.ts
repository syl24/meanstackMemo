import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe((noUnderscore)=> {
        this.posts = noUnderscore;
        this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const newPost: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', newPost)
    .subscribe((responseData) => {
      const id = responseData.postId;
      newPost.id = id;
      this.posts.push(newPost);
      this.postsUpdated.next([...this.posts]);
    });
  }


deletePost(postId: string){
  this.http.delete('http://localhost:3000/api/posts/' + postId )
  .subscribe(() => {
    const postsUpdated = this.posts.filter((post) => post.id !== postId);
    this.posts = postsUpdated;
    this.postsUpdated.next([...this.posts]);
  });
}
}