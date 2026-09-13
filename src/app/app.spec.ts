import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('renders the layout shell with header, main landmark and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('pf-header')).toBeTruthy();
    expect(element.querySelector('main#main-content')).toBeTruthy();
    expect(element.querySelector('pf-footer')).toBeTruthy();
  });

  it('exposes a skip link pointing to the main landmark', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const skipLink = (fixture.nativeElement as HTMLElement).querySelector(
      'a[href="#main-content"]',
    );

    expect(skipLink).toBeTruthy();
  });

  it('injects Person structured data into the document head', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const script = document.getElementById('pf-structured-data');

    expect(script).toBeTruthy();
    expect(JSON.parse(script!.textContent!)['@type']).toBe('Person');
  });
});
