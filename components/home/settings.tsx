"use client"

import { useContext, useMemo, useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { SettingsContext } from '@/contexts'
import { Settings } from '@/entities'

type SettingsProps = {
  isOpen: boolean
  onClose: () => void
}

export function Settings(props: SettingsProps) {
  const [settings, setSettings] = useContext(SettingsContext)

  const [difficulty, setDifficulty] = useState<Settings['difficulty']>(settings.difficulty)
  const [theme, setTheme] = useState<Settings['theme']>(settings.theme)
  const [nickname, setNickname] = useState<Settings['nickname']>(settings.nickname)


  const hasSettingsChanged = useMemo(() => {
    return (
      difficulty !== settings.difficulty ||
      theme !== settings.theme ||
      nickname !== settings.nickname
      )
    }, [difficulty, nickname, settings.difficulty, settings.nickname, settings.theme, theme])
  

  function handleSave() {
    if (!hasSettingsChanged) return

    if (nickname) setSettings({ type: 'SET_NICKNAME', payload: nickname })
    if (theme !== settings.theme) setSettings({ type: 'SET_THEME', payload: theme })
    if (difficulty !== settings.difficulty) setSettings({ type: 'SET_DIFFICULTY', payload: difficulty })

    props.onClose()
  }

  return (
    <Modal
      title='Configurações'
      isOpen={props.isOpen}
      onClose={props.onClose}
      actions={
        <Button
          onClick={handleSave}
          disabled={!hasSettingsChanged}
          inline
        >
          Salvar
        </Button>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-end gap-12">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Tema</label>
            <p className="text-xs text-zinc-500">Escolha o tema que te agrada.</p>
            <div className="flex gap-2">
              <Button
                onClick={() => setTheme('light')}
                variant={theme === 'light' ? 'primary' : 'neutral'}
                size="icon">
                ☀️
              </Button>
              <Button
                onClick={() => setTheme('dark')}
                variant={theme === 'dark' ? 'primary' : 'neutral'}
                size="icon">
                🌙
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className='flex items-center gap-2'>
              <label className="text-sm font-bold">Dificuldade</label>
            </span>
            <p className="text-xs text-zinc-500">Do fácil ao mais díficil, randomico por padrão.</p>
            <div className="flex gap-2">
              <Button
                variant={difficulty === "easy" ? "primary" : "neutral"}
                size="icon"
                onClick={() => setDifficulty('easy')}
              >🥱</Button>
              <Button
                variant={difficulty === "medium" ? "primary" : "neutral"}
                size="icon"
                onClick={() => setDifficulty('medium')}
              >😐</Button>
              <Button
                variant={difficulty === "hard" ? "primary" : "neutral"}
                size="icon"
                onClick={() => setDifficulty('hard')}
              >😰</Button>
              <Button
                variant={difficulty === "very_hard" ? "primary" : "neutral"}
                size="icon"
                onClick={() => setDifficulty('very_hard')}
              >🤯</Button>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <span>
            <label className="text-sm font-bold">Meu apelido</label>
            <p className="text-xs text-zinc-500">Sera usado para o ranking geral do jogo.</p>
          </span>
          <input
            defaultValue={settings.nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="placeholder:text-sm text-sm border rounded-lg outline-black p-3 w-full bg-transparent"
            placeholder="Vamos lá, nos diga o melhor apelido que você tem."
            type="text"
          />
        </div>
      </div>
    </Modal>
  )
}