import {UserService} from './user.service';
import {of} from 'rxjs';
import {User} from '../data/user';
import {HttpClient} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UserService(httpClientSpy as any);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('info', () => {
    it('should return info of user', async () => {
      const expectedUser = {
        userId: 2
      } as User;
      httpClientSpy.get.and.returnValue(of(expectedUser));
      service.info().subscribe(
        value => {
          expect(value).toEqual(expectedUser, 'expected info');
        },
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });
});
