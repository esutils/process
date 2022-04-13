import { exec } from '@esutils/process';

async function demo() {
  const result = await exec('node', ['--version']);
  const versionString = result.stdout.toString('utf-8');
  console.log(versionString);
}

demo();
