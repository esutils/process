
# A process library that implemented in `typescript`

This `process` library can be used by `es` module, `commonjs` module and `typescript` module.

## Examples

### Usage in `typescript` module, file with `.ts` extension

```ts
import { exec } from '@esutils/process';

async function demo() {
  const result = await exec('node', ['--version']);
  const versionString = result.stdout.toString('utf-8');
  console.log(versionString);
}

demo();
```
