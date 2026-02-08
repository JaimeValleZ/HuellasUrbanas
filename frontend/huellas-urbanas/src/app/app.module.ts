import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import Swal from 'sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearCampanaComponent } from './pages/crear-campana/crear-campana.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerCampanasComponent } from './pages/ver-campanas/ver-campanas.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';
import { RegistrarHogarComponent } from './pages/hogares/registrar-hogar/registrar-hogar.component';
import { ListarHogaresComponent } from './pages/hogares/listar-hogares/listar-hogares.component';
import { VerHogarComponent } from './pages/hogares/ver-hogar/ver-hogar.component';
import { ReportarPerroComponent } from './pages/reportes/reportar-perro/reportar-perro.component';
import { VerReportesComponent } from './pages/reportes/ver-reportes/ver-reportes.component';
import { DetalleReporteComponent } from './pages/reportes/detalle-reporte/detalle-reporte.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './pages/layout/main-layout/main-layout.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearCampanaComponent,
    VerCampanasComponent,
    VerDetalleComponent,
    RegistrarHogarComponent,
    ListarHogaresComponent,
    VerHogarComponent,
    ReportarPerroComponent,
    VerReportesComponent,
    DetalleReporteComponent,
    DashboardComponent,
    MainLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
