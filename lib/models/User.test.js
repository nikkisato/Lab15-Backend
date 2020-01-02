const User = require('./User');

describe('User model', () => {

  it('should have a username', () => {
    const user = new User();
    const { errors } = user.validateSync();
    expect(errors.username.message).toEqual('Path `username` is required.');
  });

  it('should have a passwordHash', () => {
    const user = new User();
    const { errors } = user.validateSync();
    expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
  });

});
