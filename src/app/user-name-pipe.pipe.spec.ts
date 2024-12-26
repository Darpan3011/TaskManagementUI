import { UserNamePipePipe } from './user-name-pipe.pipe';

describe('UserNamePipePipe', () => {
  it('create an instance', () => {
    const pipe = new UserNamePipePipe();
    expect(pipe).toBeTruthy();
  });
});
