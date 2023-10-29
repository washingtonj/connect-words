"use client"

import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from 'react'
import { Settings } from '@/entities'


export type SettingsActions = {
  type: 'SET_THEME'
  payload: Settings['theme']
} | {
  type: 'SET_LANGUAGE'
  payload: Settings['language']
} | {
  type: 'SET_NICKNAME'
  payload: Settings['nickname']
} | {
  type: 'SET_DIFFICULTY'
  payload: Settings['difficulty']
}

const initialState: Settings = {
  nickname: 'Anonymous',
  theme: 'light',
  language: 'pt_BR',
  difficulty: "very_hard"
}

export function SettingsReducer(state: Settings, action: SettingsActions) {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload)
     
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark')
      }
     
      else {
        document.documentElement.classList.remove('dark')
      }
     
      return { ...state, theme: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    
      case 'SET_NICKNAME':
      localStorage.setItem('playerName', action.payload)
      return { ...state, nickname: action.payload }
    
      case 'SET_DIFFICULTY':
      localStorage.setItem('difficulty', action.payload)
      return { ...state, difficulty: action.payload }
    
      default:
      return state
  }
}

export const SettingsContext = createContext<[state: Settings, dispatch: Dispatch<SettingsActions>]>([initialState, () => { }])


export function SettingsProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedName = localStorage.getItem('playerName')
    const storedDifficulty = localStorage.getItem('difficulty')

    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme as Settings['theme'] })

      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    }

    if (storedName) {
      dispatch({ type: 'SET_NICKNAME', payload: storedName })
    }

    if (storedDifficulty) {
      dispatch({ type: 'SET_DIFFICULTY', payload: storedDifficulty as Settings['difficulty'] })
    }
  }, [])

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {props.children}
    </SettingsContext.Provider>
  )
}