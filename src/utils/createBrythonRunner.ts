/**
 * BrythonRunnerOptions type.
 */
export type BrythonRunnerOptions = {
  stdout: {
    write(content: unknown): void
  }
  stderr: {
    write(error: unknown): void
  }
  stdin: {
    readline(): Promise<string>
  }
}

/**
 * BrythonRunner interface.
 */
export interface BrythonRunner {
  new (options?: Partial<BrythonRunnerOptions>): BrythonRunner
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
