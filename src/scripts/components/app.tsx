import React, { useState, useEffect } from 'react'
import { Word } from '../models/word'

type State = {
  charIndex: number
  wordIndex: number
  nextChar: string
  redScreen: boolean
}

export const App: React.FC = () => {
  const words: Word[] = [
    { displayText: 'transform.Translate', spell: 'transform.Translate' },
    { displayText: 'Vector3', spell: 'Vector3' },
  ]

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === state.nextChar) {
      if (state.charIndex + 1 === words[state.wordIndex].spell.length) {
        if (state.wordIndex + 1 === words.length) {
          return setState({
            ...state,
            charIndex: state.charIndex + 1,
          })
        }
        return setState({
          ...state,
          charIndex: 0,
          wordIndex: state.wordIndex + 1,
          nextChar: words[state.wordIndex + 1].spell[0],
        })
      } else {
        return setState({
          ...state,
          nextChar: words[state.wordIndex].spell[state.charIndex + 1],
          charIndex: state.charIndex + 1,
        })
      }
    } else if (e.key.match(/^.$/)) {
      setState({
        ...state,
        redScreen: true,
      })
      onMissType()
    }
  }

  const onMissType = () => {
    window.setTimeout(() => {
      setState({
        ...state,
        redScreen: false,
      })
    }, 100)
  }

  const [state, setState] = useState<State>({
    redScreen: false,
    charIndex: 0,
    nextChar: words[0].spell[0],
    wordIndex: 0,
  })

  useEffect(() => {
    console.log('effected!')
    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])

  return (
    <div style={{ backgroundColor: state.redScreen ? 'red' : undefined }}>
      <div>{words[state.wordIndex].displayText}</div>
      <div>
        <span className="red">
          {words[state.wordIndex].spell.slice(0, state.charIndex)}
        </span>
        <span className="black">
          {words[state.wordIndex].spell.slice(
            state.charIndex,
            words[state.wordIndex].spell.length
          )}
        </span>
      </div>
    </div>
  )
}
