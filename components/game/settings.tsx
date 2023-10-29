import { useContext, useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { SettingsContext } from '@/contexts'
import { Settings } from '@/entities'

type SettingsProps = {
  isOpen: boolean
  onClose: () => void
}

export function Settings(props: SettingsProps) {
  const [state, dispatch] = useContext(SettingsContext)
  const [inputValue, setInputValue] = useState(state.nickname)

  function handleThemeChange(theme: 'light' | 'dark') {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  function handleDifficultyChange(difficulty: Settings['difficulty']) {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty })
  }

  function handleSave() {
    dispatch({ type: 'SET_NICKNAME', payload: inputValue })
    props.onClose()
  }

  const inputChanged = inputValue !== state.nickname

  return (
    <Modal
      title='Configurações'
      isOpen={props.isOpen}
      onClose={props.onClose}
      actions={
        <Button
          onClick={handleSave}
          disabled={!inputChanged}
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
                onClick={() => handleThemeChange('light')}
                variant={state.theme === 'light' ? 'primary' : 'neutral'}
                size="icon">
                ☀️
              </Button>
              <Button
                onClick={() => handleThemeChange('dark')}
                variant={state.theme === 'dark' ? 'primary' : 'neutral'}
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
                variant={state.difficulty === "easy" ? "primary" : "neutral"}
                size="icon"
                onClick={() => handleDifficultyChange('easy')}
              >🥱</Button>
              <Button
                variant={state.difficulty === "medium" ? "primary" : "neutral"}
                size="icon"
                onClick={() => handleDifficultyChange('medium')}
              >😐</Button>
              <Button
                variant={state.difficulty === "hard" ? "primary" : "neutral"}
                size="icon"
                onClick={() => handleDifficultyChange('hard')}
              >😰</Button>
              <Button
                variant={state.difficulty === "very_hard" ? "primary" : "neutral"}
                size="icon"
                onClick={() => handleDifficultyChange('very_hard')}
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
            defaultValue={state.nickname}
            onChange={(e) => setInputValue(e.target.value)}
            className="placeholder:text-sm text-sm border rounded-lg outline-black p-3 w-full bg-transparent"
            placeholder="Vamos lá, nos diga o melhor apelido que você tem."
            type="text"
          />
        </div>
      </div>
    </Modal>
  )
}