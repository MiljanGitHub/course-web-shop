import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: CoursesComponent},
  {path: 'test', component: TestComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/:courseIdPlaceholder/:courseNamePlaceholder', component: CourseComponent}
//  { path: '**', component:  CoursesComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
