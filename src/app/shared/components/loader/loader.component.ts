import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderHandlerService } from '@shared/services/loader-handler.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  public loaderHandler = inject(LoaderHandlerService)
  public showLoader = false

  ngOnInit(): void {
    this.loaderHandler.loadingObservable.subscribe({
      next: (loading) => { this.showLoader = loading }
    })
  }
}
