import {UserService} from './user.service';
import {of} from 'rxjs';
import {User} from '../data/user';
import {StatusResponse} from '../data/status.response';
import {FileData} from '../type/file.data';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: { get: jasmine.Spy , put: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);
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

  describe('image', () => {
    it('should return the image of the user', async () => {
      const expectedImage = {
        code: 1,
        message: '',
        statusType: 'type',
        object: {
          data: '.....'
        }
      } as StatusResponse<FileData>;
      httpClientSpy.get.and.returnValue(of(expectedImage));
      service.image().subscribe(
        value => {
          expect(value).toEqual(expectedImage, 'expected image');
        },
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });

  describe('updateImage', () => {
    it('should return with a successful message.', async () => {
      const expectedMessage = {
        code: 1,
        message: '',
        statusType: 'type',
        object: {
          data: '.....'
        }
      } as StatusResponse<any>;
      httpClientSpy.get.and.returnValue(of({}));
      httpClientSpy.put.and.returnValue(of(expectedMessage));
      service.updateImage({ data: ''}).subscribe(
        value => {
          expect(value).toEqual(expectedMessage, 'expected message');
        },
      );
      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });
  });

  describe('create', () => {
    it('should return with a successful message.', async () => {
      const expectedMessage = {
        code: 1,
        message: '',
        statusType: 'type',
        object: {
          data: '.....'
        }
      } as StatusResponse<any>;
      httpClientSpy.get.and.returnValue(of({}));
      httpClientSpy.post.and.returnValue(of(expectedMessage));
      service.create({} as User).subscribe(
        value => {
          expect(value).toEqual(expectedMessage, 'expected message');
        },
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });
});
