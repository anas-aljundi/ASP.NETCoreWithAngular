/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertfiyService } from './alertfiy.service';

describe('Service: Alertfiy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertfiyService]
    });
  });

  it('should ...', inject([AlertfiyService], (service: AlertfiyService) => {
    expect(service).toBeTruthy();
  }));
});
