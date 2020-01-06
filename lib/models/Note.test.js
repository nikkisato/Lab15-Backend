const Note = require('./Note');

describe('Note model', () => {

  it('should be given an title', () => {
    const note = new Note();
    const { errors } = note.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('should be given body text', () => {
    const note = new Note();
    const { errors } = note.validateSync();
    expect(errors.text.message).toEqual('Path `text` is required.');
  });
  
});
