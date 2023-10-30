"use client"

import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from 'react'
import { Settings } from '@/entities'

const initialState: Settings = {
  nickname: undefined,
  theme: 'light',
  difficulty: 'very_hard',
  language: 'pt_BR',
}

export type SettingsActions =  {
  type: '_init_state', 
  payload: Settings 
} | {
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
    case '_init_state':
      return { ...state, ...action.payload}

    case 'SET_THEME':
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
      return { ...state, nickname: action.payload }

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload }

    default:
      return state
  }
}

export const SettingsContext = createContext<[state: Settings, dispatch: Dispatch<SettingsActions>]>([{} as Settings, () => { }])


export function SettingsProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  useEffect(() => {
    const storagedSettings = localStorage.getItem('settings')

    if (storagedSettings) {
      const settings = JSON.parse(storagedSettings) as Settings

      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }

      dispatch({ type: '_init_state', payload: settings })
    }
  }, [])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('settings', JSON.stringify(state))
    }
  }, [state])

  

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {props.children}
    </SettingsContext.Provider>
  )
}