/**
 * Copyright (C) 2022 Yonggang Luo <luoyonggang@gmail.com>
 *
 */

import * as cp from 'child_process';
import * as util from 'util';
import { Deferred } from '@esutils/deferred';

export interface ExecResult<T> {
  result: cp.ChildProcess;
  error?: cp.ExecException;
  stdout: T;
  stderr: T;
}

export async function exec(
  file: string,
  args: string[],
  options?: cp.ExecFileOptions,
): Promise<ExecResult<Buffer>>;
export async function exec(
  file: string,
  args: string[],
  encoding: string,
  options?: cp.ExecFileOptions,
): Promise<ExecResult<string>>;
/**
 * @param file The executable to be invoked, doesn't have to be an absolute path
 * @param args The command line args
 * @param encoding The encoding of the stdout/stderr result, if undefined, do not decoding
 *   and the type of stdout/stderr will be Buffer, otherwise decoded to `string` by encoding
 * @param options Extra executable options
 */
export async function exec(
  file: string,
  args: string[],
  encoding?: string | cp.ExecFileOptions,
  options?: cp.ExecFileOptions,
): Promise<ExecResult<string | Buffer>> {
  const deferred = new Deferred<ExecResult<Buffer | string>>();
  let decoder: util.TextDecoder;
  let usedOption: cp.ExecFileOptionsWithBufferEncoding = {
    encoding: 'buffer',
  };
  if (typeof encoding === 'string') {
    decoder = new util.TextDecoder(encoding);
    usedOption = {
      ...options,
      encoding: 'buffer',
    };
  } else if (typeof encoding === 'object') {
    usedOption = {
      ...encoding,
      encoding: 'buffer',
    };
  }
  const result = cp.execFile(
    file,
    args,
    usedOption,
    (error, stdout, stderr) => {
      deferred.resolve({
        result,
        error: error ?? undefined,
        stdout: decoder ? decoder.decode(stdout) : stdout,
        stderr: decoder ? decoder.decode(stderr) : stderr,
      });
    },
  );
  return deferred.promise;
}
