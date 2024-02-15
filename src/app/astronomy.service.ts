import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AstronomyService {
  alerte: string = '';
  AHsg: number = 0;
  constructor() { }
  decimalToDegrees(decimalDegrees: number): string {
    const degrees = Math.floor(decimalDegrees);
    const minutes = Math.floor((decimalDegrees - degrees) * 60);
    const seconds = (decimalDegrees - degrees - minutes / 60) * 3600;

    return `${degrees}:${minutes}:${seconds.toFixed(2)}`;
  }

  degreesToDecimal(inputStr: string): number {
    let parts = inputStr.split(':');
    parts = parts.map(part => part === '' ? '0' : part);
 
    let degrees = parseFloat(parts[0]);
    let minutes = parseFloat(parts[1]);
    let seconds = parseFloat(parts[2]);

    if(parts.length == 3 ){
      if(degrees < 0){
        return degrees - minutes / 60 - seconds / 3600;
      }
      else{
        return degrees + minutes / 60 + seconds / 3600;
      }
    }else if(parts.length == 2){
      if(degrees < 0){
        return degrees - minutes / 60 ;
      }
      else{
        return degrees + minutes / 60 ;
      }
    }else{
      return degrees
    }
    
    
  }

  calculateTcfToTc0(longitude: number, Tcf: number): number {
    const x = (7.5 - longitude) / 15;
    const integer = Math.floor(x);
    let tc0 = Tcf + integer;
    if (tc0 < 0) {
      tc0 = tc0 + 24;
      this.alerte = "le jour precedent"
      console.log("le jour precedent");
    }
    if (tc0 > 24) {
      tc0 = tc0 - 24;
      this.alerte = "le jour suivant"
      console.log("le jour suivant");
    }

    return tc0;
  }
  calculateHauteurApresE(hauteur: string, e: string): string {
    const hauteurDecimal = this.degreesToDecimal(hauteur);
    const eDecimal = this.degreesToDecimal(e);
    const x = hauteurDecimal+eDecimal;
    return this.decimalToDegrees(x);
  }
  calculateD(zVar: string, latitude: string, hauteur_a_cor1: string): string {
    let hauteurDecimal = this.degreesToDecimal(hauteur_a_cor1);
    let latitudeDecimal  = this.degreesToDecimal(latitude) ;
    let zVarDecimal = this.degreesToDecimal(zVar);
   
    
    let x1  = Math.sin(latitudeDecimal * Math.PI / 180) * Math.sin(hauteurDecimal * Math.PI / 180) + Math.cos(latitudeDecimal * Math.PI / 180) * Math.cos(hauteurDecimal * Math.PI / 180) * Math.cos(zVarDecimal * Math.PI / 180)
    let x  = Math.asin( x1 );
    x = x * 180/Math.PI
 
    if(latitudeDecimal<0){
      latitudeDecimal = latitudeDecimal * (-1)
    }
    if (x1<0){
      if(latitudeDecimal<0){
        
        return this.decimalToDegrees(x) + " S";
      }else{
        return this.decimalToDegrees(x) + " N";
      }
    }
    else{
      if(latitudeDecimal>0){
        return this.decimalToDegrees(x) + " N";
      }else{
        return this.decimalToDegrees(x) + " S";
      }
    }
    
  }

  calculateP(zVar: string, latitude: string, hauteur_a_cor1: string): string {
    let hauteurDecimal = this.degreesToDecimal(hauteur_a_cor1);
    let latitudeDecimal = this.degreesToDecimal(latitude);
    let zVarDecimal = this.degreesToDecimal(zVar);
    let pSigne
    if(latitudeDecimal<0){
      if (zVarDecimal > 180){
        zVarDecimal = zVarDecimal - 180
        pSigne = " W"
      }else{
        zVarDecimal = - zVarDecimal  + 180
        pSigne = " E"
      }
      latitudeDecimal = latitudeDecimal * (-1)
    }
    if(latitudeDecimal>0){
      if (zVarDecimal > 180){
        zVarDecimal = 360 - zVarDecimal
        pSigne = " W"
      }else{
        zVarDecimal = zVarDecimal
        pSigne = " E"
      }
      
    }
    let x1  = (Math.cos(latitudeDecimal * Math.PI / 180) * Math.tan(hauteurDecimal * Math.PI / 180))/Math.sin(zVarDecimal * Math.PI / 180) - (Math.sin(latitudeDecimal * Math.PI / 180) / Math.tan(zVarDecimal * Math.PI / 180))
    let x = Math.atan(1/x1)
    x = x * 180/Math.PI
    
    if(x1<0){
      console.log("under 0")
      x = x + 180
      if(pSigne === " E"){
        pSigne = " W"
      }
      else{
        pSigne = " E"
      }
    }
    return this.decimalToDegrees(x) + pSigne;
  
  }
  
  calculateAVa(longitude: string, AHs0: string, AHag: string): string {
    let longitudeDecimal = this.degreesToDecimal(longitude);
    let AHs0Decimal = this.degreesToDecimal(AHs0);
    let AHagDecimal = this.degreesToDecimal(AHag);
    this.AHsg = AHs0Decimal + longitudeDecimal;
    if(this.AHsg > 360){
      this.AHsg = this.AHsg - 360
    }
    if(this.AHsg < 360){
      this.AHsg = this.AHsg + 360
    }
    let x = 360-(this.AHsg - AHagDecimal)
    return this.decimalToDegrees(x);
  
  }
  calculateZe(DVar: string, latitude: string, AVa: string, AHsg: string): string {
    let AVaDecimal = this.degreesToDecimal(AVa);
    let latitudeDecimal = this.degreesToDecimal(latitude);
    let DVarDecimal = this.degreesToDecimal(DVar);
    let AHsgDecimal = this.degreesToDecimal(AHsg);
    let PVar = 0;
    let AHag = (AVaDecimal + AHsgDecimal) - 360
    if(AHag > 180){
      PVar = 360 - AHag
    }else{
      PVar = AHag
    }
    if((DVarDecimal < 0 && latitudeDecimal > 0) ||(DVarDecimal > 0 && latitudeDecimal < 0)){
      DVarDecimal = DVarDecimal * -1
    }
    let pSigne
    
    let x1  = (Math.cos(latitudeDecimal * Math.PI / 180) * Math.tan(DVarDecimal * Math.PI / 180))/Math.sin(PVar * Math.PI / 180) - (Math.sin(latitudeDecimal * Math.PI / 180) / Math.tan(PVar * Math.PI / 180))
    let x = Math.atan(1/x1)
    x = x * 180/Math.PI
    
    // if(x1<0){
    //   console.log("under 0")
    //   x = x + 180
    //   if(pSigne === " E"){
    //     pSigne = " W"
    //   }
    //   else{
    //     pSigne = " E"
    //   }
    // }
    return this.decimalToDegrees(x);
  
  }

  calculateInterpolation(A:  string = "",
  B: string = "",
  C:  string = "",
  a1:  string = "",
  a2:  string = "",
  c1:  string = "",
  c2:  string = ""): number {
    const ADecimal = this.degreesToDecimal(A);
    const BDecimal = this.degreesToDecimal(B);
    const CDecimal = this.degreesToDecimal(C);
    let a1Decimal = -this.degreesToDecimal(a1);
    const a2Decimal = -this.degreesToDecimal(a2);
    let c1Decimal = -this.degreesToDecimal(c1);
    const c2Decimal = -this.degreesToDecimal(c2);
    console.log("c2Decimal avant "+c2Decimal)
    if (c2Decimal != 0){
      c1Decimal = (c1Decimal + c2Decimal)/2
    }
    if (a2Decimal != 0 ){
      a1Decimal = (a1Decimal + a2Decimal)/2
    }
    
    let cor = (((BDecimal-ADecimal)/(CDecimal-ADecimal))*(c1Decimal-a1Decimal) )+ a1Decimal
    cor = cor *60
    let roundedNumber = cor.toFixed(1);
    let roundedNumberAsNumber = parseFloat(roundedNumber);
    roundedNumberAsNumber = roundedNumberAsNumber/60
    return roundedNumberAsNumber;
  }

  calculateTc0Exact(
    heureChrono: string,
    Tc0A: string,
    erreurChrono: string,
    longitude: string,
    Tcf: string
  ): number {
    const heureChronoDecimal = this.degreesToDecimal(heureChrono);
    const Tc0ADecimal = this.degreesToDecimal(Tc0A);
    const erreurChronoDecimal = this.degreesToDecimal(erreurChrono);
    const longitudeDecimal = this.degreesToDecimal(longitude);
    const TcfDecimal = this.degreesToDecimal(Tcf);
  
    let tc0NotExact = heureChronoDecimal + Tc0ADecimal;
  
    const x = this.calculateTcfToTc0(longitudeDecimal, TcfDecimal);
    
    if (tc0NotExact - x < -1 || tc0NotExact - x > 1) {
      tc0NotExact = tc0NotExact - 12;
      if (tc0NotExact < 0) {
        tc0NotExact = tc0NotExact + 24;
        this.alerte = "le jour suivant"
        console.log("le jour suivant");
      }
      if (tc0NotExact > 24) {
        tc0NotExact = tc0NotExact - 24;
        this.alerte = "le jour precedent"
        console.log("le jour precedent");
      }
    }
  
    const tc0Exact = tc0NotExact + (tc0NotExact * (erreurChronoDecimal / 24));
  
    return tc0Exact;
  }
}
