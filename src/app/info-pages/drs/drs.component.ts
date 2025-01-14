import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrsGmeChartComponent } from './drs-gme-chart/drs-gme-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OwnershipData } from '../../main-pages/ownership/ownership-data.class';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drs',
  standalone: true,
  imports: [RouterModule, DrsGmeChartComponent, CommonModule],
  templateUrl: './drs.component.html',
  styleUrl: './drs.component.scss'
})
export class DrsComponent {

  private _ownershipData: OwnershipData = new OwnershipData();
  private _drsPercent = (this._ownershipData.drsData.value / this._ownershipData.tso) * 100;

  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private titleService: Title, 
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    this.titleService.setTitle('DRS - Direct Registration System')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'DRS - Direct Registration System' },
      { name: 'keywords', content: 'GameStop, GME, DRS, DRS GME, DRSGME, Direct Registration System, DSPP, Computershare, transfer agent, DRSyourGME' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'DRS - Direct Registration System' },
      { property: 'og:description', content: 'DRS - Direct Registration System' },
      { property: 'og:url', content: 'https://gmewiki.org/drs' },
      { property: 'og:type', content: 'website' },
    ]);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  public get drsPercent(): string { return this._drsPercent.toFixed(0); }

}
