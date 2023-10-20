import { useContext, useRef, useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { SettingsContext } from '@/contexts'

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
        <Button onClick={handleSave} disabled={!inputChanged} inline>Salvar</Button>
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
              <span className='text-xs px-2 py-0.5 rounded-lg bg-zinc-700 text-white'>Em breve</span>
            </span>
            <p className="text-xs text-zinc-500">Do fácil ao mais díficil, randomico por padrão.</p>
            <div className="flex gap-2">
              <Button disabled variant="neutral" size="icon">🥱</Button>
              <Button disabled variant="neutral" size="icon">😐</Button>
              <Button disabled variant="neutral" size="icon">😰</Button>
              <Button disabled variant="neutral" size="icon">🤯</Button>
              <Button disabled variant="primary" size="icon">🤝</Button>
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