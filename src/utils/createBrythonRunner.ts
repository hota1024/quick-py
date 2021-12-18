/**
 * BrythonRunnerOptions type.
 */
export type BrythonRunnerOptions = {
  stdout: {
    write(content: unknown): void
    flush(): void
  }
  stderr: {
    write(error: unknown): void
  }
  stdin: {
    readline(): Promise<string | null>
  }
}

/**
 * BrythonRunner interface.
 */
export interface BrythonRunner {
  new (options?: Partial<BrythonRunnerOptions>): BrythonRunner

  runCode(code: string): Promise<void>
}

/**
 * create brython runner.
 *
 * @param options options.
 */
export const createBrythonRunner = (
  options?: Partial<BrythonRunnerOptions>
): BrythonRunner => {
  const { BrythonRunner } = window as unknown as {
    BrythonRunner: BrythonRunner
  }

  return new BrythonRunner(options)
}
