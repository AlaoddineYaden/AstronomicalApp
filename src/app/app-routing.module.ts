import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrthoComponent } from './ortho/ortho.component';
import { TimeCalculatorComponent } from './time-calculator/time-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'ortho', pathMatch: 'full' },
  { path: 'ortho', component: OrthoComponent },
  { path: 'timeCalculator', component: TimeCalculatorComponent },
  { path: '**', component: OrthoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
