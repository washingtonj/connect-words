"use client"

import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from 'react'

export interface SettingsState {
  nickname: string
  theme: 'light' | 'dark'
  language: 'pt_BR'
  difficulty?: 'easy' | 'medium' | 'hard' | 'very_hard'
}

export type SettingsActions = {
  type: 'SET_THEME'
  payload: SettingsState['theme']
} | {
  type: 'SET_LANGUAGE'
  payload: SettingsState['language']
} | {
  type: 'SET_NICKNAME'
  payload: SettingsState['nickname']
}

const initialState: SettingsState = {
  nickname: 'Anonymous',
  theme: 'light',
  language: 'pt_BR'
}

export function SettingsReducer(state: SettingsState, action: SettingsActions) {
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
    default:
      return state
  }
}

export const SettingsContext = createContext<[state: SettingsState, dispatch: Dispatch<SettingsActions>]>([initialState, () => { }])


export function SettingsProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedName = localStorage.getItem('playerName')

    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme as SettingsState['theme'] })

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
  }, [])

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {props.children}
    </SettingsContext.Provider>
  )
}