import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AstronomyService } from '../astronomy.service';

@Component({
  selector: 'app-time-calculator',
  templateUrl: './time-calculator.component.html',
  styleUrls: ['./time-calculator.component.css'],
})
export class TimeCalculatorComponent {
  alerte: string = '';
  longitude: string = '';
  Tcf: string = '';
  heureChrono: string = '';
  Tc0A: string = '';
  erreurChrono: string = '';
  tc0Exact: string = '';
  hauteur_a_e: string = '';
  hauteur_a_cor1: string = '';
  cor1: number = 0;
  cor1_str: string = '';
  hauteur_observe: string = '';
  E_var: string = '';
  A: string = '';
  B: string = '';
  C: string = '';
  a1: string = '';
  a2: string = '';
  x: string = '';
  c1: string = '';
  c2: string = '';
  disabled: boolean = true;
  DVar: string = '';
  PVar: string = '';
  zVar: string = '';
  latitude: string = '';
  AHs0Var: string = '';
  longitudeVar: string = '';
  AHagVar: string = '';
  AVaVar: string = '';
  AHsgVar: string = '';
  zeVar: string = '';
  wVar: string = '';

  form = new FormGroup({
    longitude: new FormControl('91:15:00', [Validators.required]),
    Tcf: new FormControl('4:55:0', [Validators.required]),
    heureChrono: new FormControl('11:29:35', [Validators.required]),
    erreurChrono: new FormControl('00:0:4.2', [Validators.required]),
    Tc0A: new FormControl('11:24:9', [Validators.required]),
  });
  form2 = new FormGroup({
    hauteur_observe: new FormControl('11:59.3:0', [Validators.required]),
    E: new FormControl('0:-1:0', [Validators.required]),
  });

  form3 = new FormGroup({
    A: new FormControl('11:30:0', [Validators.required]),
    B: new FormControl(this.hauteur_a_e, [Validators.required]),
    C: new FormControl('12:0:0', [Validators.required]),
    a1: new FormControl('0:8.3:0', [Validators.required]),
    a2: new FormControl('0:7.9:0', []),
    x: new FormControl('vide', []),
    c1: new FormControl('0:8.5:0', [Validators.required]),
    c2: new FormControl('0:8.1:0'),
  });

  form4 = new FormGroup({
    // latitude:  new FormControl('-38:13:0', [Validators.required]),
    // hauteur_a_cor1:  new FormControl('11:47.14:0', [Validators.required]),
    // // hauteur_a_cor1:  new FormControl(this.hauteur_a_cor1, [Validators.required]),
    // z:  new FormControl('306:0:0', [Validators.required]),

    latitude:  new FormControl('43:12:0', [Validators.required]),
    hauteur_a_cor1:  new FormControl('49:47.9:0', [Validators.required]),
    // hauteur_a_cor1:  new FormControl(this.hauteur_a_cor1, [Validators.required]),
    z:  new FormControl('338.7:0:0', [Validators.required]),

    // latitude: new FormControl('37:12:0', [Validators.required]),
    // hauteur_a_cor1: new FormControl('77:48.06:0', [Validators.required]),
    // // hauteur_a_cor1:  new FormControl(this.hauteur_a_cor1, [Validators.required]),
    // z: new FormControl('315.5:0:0', [Validators.required]),
  });
  form5 = new FormGroup({
    AHs0: new FormControl('352:54:55.76', [Validators.required]),
    longitude: new FormControl('-72:18', [Validators.required]),
    AHag: new FormControl('58:15:2.56', [Validators.required]),
  });
  form6 = new FormGroup({
    AHsg: new FormControl('280:36:55.76', [Validators.required]),
    latitude: new FormControl('43:12:0', [Validators.required]),
    DVar: new FormControl('74:10.35', [Validators.required]),
    AVa: new FormControl('137:18.75', [Validators.required]),
  });



  constructor(private astronomyService: AstronomyService) {
    this.form3.controls['x'].disable();
  }

  onSubmit() {
    this.longitude = this.form.controls['longitude'].value ?? '0:0:0';
    this.Tcf = this.form.controls['Tcf'].value ?? '0:0:0';
    this.heureChrono = this.form.controls['heureChrono'].value ?? '0:0:0';
    this.erreurChrono = this.form.controls['erreurChrono'].value ?? '0:0:0';
    this.Tc0A = this.form.controls['Tc0A'].value ?? '0:0:0';
    let x = this.astronomyService.calculateTc0Exact(
      this.heureChrono,
      this.Tc0A,
      this.erreurChrono,
      this.longitude,
      this.Tcf
    );
    this.tc0Exact = this.astronomyService.decimalToDegrees(x);
    this.alerte = this.astronomyService.alerte;
    this.form5.controls['longitude'].setValue(this.longitude);

    // console.log(this.astronomyService.alerte)
  }

  onSubmit2() {
    this.hauteur_observe =
      this.form2.controls['hauteur_observe'].value ?? '0:0:0';
    this.E_var = this.form2.controls['E'].value ?? '0:0:0';

    this.hauteur_a_e = this.astronomyService.calculateHauteurApresE(
      this.hauteur_observe,
      this.E_var
    );

    this.form3.controls['B'].setValue(this.hauteur_a_e);
  }
  onSubmit3() {
    this.A = this.form3.controls['A'].value ?? '0:0:0';

    // this.B= this.hauteur_a_e ?? '0:0:0';
    this.B = this.form3.controls['B'].value ?? '0:0:0';
    this.C = this.form3.controls['C'].value ?? '0:0:0';
    this.a1 = this.form3.controls['a1'].value ?? '0:0:0';
    this.a2 = this.form3.controls['a2'].value ?? '0:0:0';

    this.c1 = this.form3.controls['c1'].value ?? '0:0:0';
    this.c2 = this.form3.controls['c2'].value ?? '0:0:0';
    if (!this.c2) {
      this.c2 = '0:0:0';
    }
    if (!this.a2) {
      this.a2 = '0:0:0';
    }
    if (!this.c1) {
      this.c2 = '0:0:0';
    }
    if (!this.a1) {
      this.a2 = '0:0:0';
    }
    this.cor1 = this.astronomyService.calculateInterpolation(
      this.A,
      this.B,
      this.C,
      this.a1,
      this.a2,
      this.c1,
      this.c2
    );
    if (this.cor1 < 0) {
      this.cor1_str = this.astronomyService.decimalToDegrees(-this.cor1);
    } else {
      this.cor1_str = this.astronomyService.decimalToDegrees(this.cor1);
    }
    this.hauteur_a_cor1 = this.astronomyService.decimalToDegrees(
      this.astronomyService.degreesToDecimal(this.B) + this.cor1
    );
    this.form4.controls['hauteur_a_cor1'].setValue(this.hauteur_a_cor1);
  }
  onSubmit4() {
    this.zVar = this.form4.controls['z'].value ?? '0:0:0';
    this.latitude = this.form4.controls['latitude'].value ?? '0:0:0';
    this.hauteur_a_cor1 =
      this.form4.controls['hauteur_a_cor1'].value ?? '0:0:0';

    this.DVar = this.astronomyService.calculateD(
      this.zVar,
      this.latitude,
      this.hauteur_a_cor1
    );
    this.PVar = this.astronomyService.calculateP(
      this.zVar,
      this.latitude,
      this.hauteur_a_cor1
    );
    let parts = this.PVar.split(' ');
    let AHag = 0;
    if(parts[1] === 'W'){
      this.form5.controls['AHag'].setValue(parts[0])
    }else{
      AHag = this.astronomyService.degreesToDecimal(parts[0])
      AHag = 360 - AHag
      this.AHagVar = this.astronomyService.decimalToDegrees(AHag)
      this.form5.controls['AHag'].setValue(this.AHagVar)
    }
    this.form6.controls['latitude'].setValue(this.latitude)
  }
  onSubmit5() {
    this.AHs0Var = this.form5.controls['AHs0'].value ?? '0:0:0';
    this.longitudeVar = this.form5.controls['longitude'].value ?? '0:0:0';
    this.AHagVar = this.form5.controls['AHag'].value ?? '0:0:0';
    this.AVaVar = this.astronomyService.calculateAVa(
      this.longitudeVar,
      this.AHs0Var,
      this.AHagVar
    );
    this.AHsgVar = this.astronomyService.decimalToDegrees(this.astronomyService.AHsg)
    this.form6.controls['AHsg'].setValue(this.AHsgVar)
    this.form6.controls['AVa'].setValue(this.AVaVar)
    this.form6.controls['latitude'].setValue(this.latitude)
  }
  onSubmit6() {
    this.AHsgVar = this.form6.controls['AHsg'].value ?? '0:0:0';
    this.AVaVar = this.form6.controls['AVa'].value ?? '0:0:0';
    this.latitude = this.form6.controls['latitude'].value ?? '0:0:0';
    this.DVar = this.form6.controls['DVar'].value ?? '0:0:0';
    
    this.zeVar = this.astronomyService.calculateZe(
      this.DVar,
      this.latitude,
      this.AVaVar,
      this.AHsgVar
    );
  }
}
