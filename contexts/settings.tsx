"use client"

import { Dispatch, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import { Settings } from '@/entities'

const initialState: Settings = {
  nickname: localStorage.getItem('playerName') as Settings['nickname'] || undefined,
  theme: localStorage.getItem('theme') as Settings['theme'] || 'light',
  difficulty: localStorage.getItem('difficulty') as Settings['difficulty'] || 'very_hard',
  language: 'pt_BR',
}

export type SettingsActions = {
  type: 'SET_THEME'
  payload: Settings['theme']
} | {
  type: 'SET_LANGUAGE'
  payload: Settings['language']
} | {
  type: 'SET_NICKNAME'
  payload: string
} | {
  type: 'SET_DIFFICULTY'
  payload: Settings['difficulty']
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
  useEffect(() => {
    if (initialState) {
      if (initialState.theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {props.children}
    </SettingsContext.Provider>
  )
}