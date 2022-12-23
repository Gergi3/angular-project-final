import { Injectable } from "@angular/core";
import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Injectable({
  providedIn: 'root'
})
export class CommentTextStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!control && control.invalid && control.touched && !!form;
  }
}