import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCampanaComponent } from './pages/crear-campana/crear-campana.component';
import { VerCampanasComponent } from './pages/ver-campanas/ver-campanas.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';
import { register } from 'module';
import { RegistrarHogarComponent } from './pages/hogares/registrar-hogar/registrar-hogar.component';
import { ListarHogaresComponent } from './pages/hogares/listar-hogares/listar-hogares.component';
import { VerHogarComponent } from './pages/hogares/ver-hogar/ver-hogar.component';
import { ReportarPerroComponent } from './pages/reportes/reportar-perro/reportar-perro.component';
import { VerReportesComponent } from './pages/reportes/ver-reportes/ver-reportes.component';
import { DetalleReporteComponent } from './pages/reportes/detalle-reporte/detalle-reporte.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './pages/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'campanas/crear', component: CrearCampanaComponent },
      { path: 'campanas/ver', component: VerCampanasComponent },
      { path: 'campanas/:id', component: VerDetalleComponent },
      { path: 'hogares/crear', component: RegistrarHogarComponent },
      { path: 'hogares/ver', component: ListarHogaresComponent },
      { path: 'hogares/:id', component: VerHogarComponent },
      { path: 'reportar-perro/crear', component: ReportarPerroComponent },
      { path: 'reportar-perro/ver', component: VerReportesComponent },
      { path: 'reportar-perro/ver/:id', component: DetalleReporteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
