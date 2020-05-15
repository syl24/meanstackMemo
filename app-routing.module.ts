import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/app/posts/list/list.component';
import { CreateComponent } from 'src/app/posts/create/create.component';

const router: Routes =[
    { path: '', component: ListComponent},
    { path: 'create', component: CreateComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
})

export class AppRoutingModule{}