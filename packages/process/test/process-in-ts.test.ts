import { exec } from '@esutils/process';

describe('exec in typescript', () => {
  it('function type', () => {
    expect(typeof exec).toBe('function');
  });

  it('function call', async () => {
    {
      const result = await exec('node', ['--version']);
      const versionString = result.stdout.toString('utf-8');
      expect(versionString.trim()).toEqual(process.version);
    }
    if (process.platform === 'win32') {
      const whereResult = await exec('where', [], 'gbk');
      expect(whereResult.stdout.trim().length).toBeGreaterThan(0);
    }
  });
});
