import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './comic-layout.component.html',
  styleUrls: ['./comic-layout.component.scss'],
})
export class ComicLayoutComponent {}
