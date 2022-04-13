const { exec } = require('@esutils/process');

describe('exec in javascript', () => {
  it('function type', () => {
    expect(typeof exec).toBe('function');
  });
});
