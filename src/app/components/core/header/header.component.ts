import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormatDatetimePipe } from '../../../pipes/format-datetime.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormatDatetimePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  time: Date = new Date();
  timeInterval: number | null = null;

  ngOnInit(): void {
    this.timeInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
