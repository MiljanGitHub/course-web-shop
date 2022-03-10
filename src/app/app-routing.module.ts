import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:userIdPlaceholder', component: UserComponent},
  {path: 'courses/:courseIdPlaceholder', component: CourseComponent}
//  { path: '**', component:  CoursesComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
