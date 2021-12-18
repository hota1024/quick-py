import { BrythonRunner, createBrythonRunner } from '@/utils/createBrythonRunner'
import { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { Line } from '@/component/Line'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [code, setCode] = useState('# loading...')
  const [runner, setRunner] = useState<BrythonRunner>()
  const [lines, setLines] = useState<Line[]>([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const code = localStorage.getItem('code')

    setCode(code ?? '# have fun coding! 🤟\n')
  }, [])

  useEffect(() => {
    localStorage.setItem('code', code)
  }, [code])

  const onRunnerScriptLoaded = () => {
    const runner = createBrythonRunner({
      stdout: {
        write(content: any) {
          console.log({ content })
          setLines((lines) => [...lines, { type: 'stdout', content }])
        },
        flush() {},
      },
      stderr: {
        write(content: any) {
          console.error({ content })
          setLines((lines) => [...lines, { type: 'stderr', content }])
        },
      },
      stdin: {
        async readline() {
          var userInput = prompt()
          console.log('Received StdIn: ' + userInput)
          return userInput
        },
      },
    })
    setRunner(runner)
  }

  const onExecuteClicked = async () => {
    if (!runner) {
      return
    }

    setRunning(true)
    await runner.runCode(code)
    setRunning(false)
  }

  return (
    <>
      <Head>
        <title>home - quick-py</title>
      </Head>

      <div className="container">
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          language="python"
          value={code}
          options={{
            fontSize: 25,
            tabSize: 4,
          }}
          onChange={(code) => setCode(code ?? '')}
        />
        <div className="result">
          <div className="menu">
            {runner && (
              <button
                className="button emoji-button"
                onClick={onExecuteClicked}
                disabled={running}
              >
                {running ? '🏃Running...' : '⚡Execute'}
              </button>
            )}

            <button
              className="button emoji-button"
              onClick={() => setLines([])}
            >
              🔥Clear
            </button>
          </div>
          <pre className="lines">
            {lines.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </pre>
        </div>
      </div>

      <style global jsx>{`
        .container {
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .result {
          background: #101010;
        }

        .button {
          padding: 0 16px;
          background: #202020;
          color: white;
          min-width: 100px;
          height: 38px;
          outline: none;
          border: none;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 200ms;
        }

        .button:hover {
          transform: translateY(-1px);
        }

        .button:active {
          box-shadow: none;
        }

        .button:disabled {
          background: black;
        }

        .menu {
          background: black;
          padding: 16px;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        }

        .menu > .button {
          margin-right: 16px;
        }

        .emoji-button {
          padding-right: 28px;
        }

        .lines {
          font-size: 1.3rem;
          padding-top: 16px;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      `}</style>

      <Script
        src="https://cdn.jsdelivr.net/gh/pythonpad/brython-runner/lib/brython-runner.bundle.js"
        onLoad={onRunnerScriptLoaded}
      />
    </>
  )
}

export default HomePage
