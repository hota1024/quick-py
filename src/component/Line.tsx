export type Line =
  | {
      type: 'stdout'
      content: any
    }
  | {
      type: 'stderr'
      content: any
    }

/**
 * Line props.
 */
export type LineProps = {
  line: Line
}

/**
 * Line component.
 */
export const Line: React.VFC<LineProps> = (props) => {
  return (
    <>
      <code className={['line', props.line.type].join(' ')}>
        {props.line.content}
      </code>

      <style global jsx>{`
        .line {
          display: block;
          color: white;
          padding: 0 16px;
          transition: all 200ms;
        }

        .line:hover {
          background: #202020;
        }

        .line.stderr {
          color: #ef9a9a;
        }
      `}</style>
    </>
  )
}
