import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './login/login.component';
import {SearchLessonsComponent} from './search-lessons/search-lessons.component';
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
  {
    path:"search-lessons",
    component: SearchLessonsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '',
    component: ProductsComponent

  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
