import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {}
