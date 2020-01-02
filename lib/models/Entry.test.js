const Entry = require('./Entry');

describe('Entry model', () => {

  it('should be given an title', () => {
    const entry = new Entry();
    const { errors } = entry.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('should be given body text', () => {
    const entry = new Entry();
    const { errors } = entry.validateSync();
    expect(errors.text.message).toEqual('Path `text` is required.');
  });
});
