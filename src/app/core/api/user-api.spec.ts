import { TestBed } from '@angular/core/testing';

import { loadUser } from './user-api';

describe('UserApi', () => {
  it('should load user 1', async () => {
    const user = await loadUser(1);
    expect(user).toEqual({id: 1, name: 'Max Mustermann'});
  });

  it('should load user 2', async () => {
    const user = await loadUser(2);
    expect(user).toEqual({id: 2, name: 'Erika Mustermann'});
  });
});
