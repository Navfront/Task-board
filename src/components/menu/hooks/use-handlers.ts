import { useAppDispatch } from '../../../redux'

export const useHandlers = (): { onCreateClickHandler: typeof onCreateClickHandler } => {
  const dispatch = useAppDispatch()

  const onCreateClickHandler = (): void => {
    dispatch({ type: 'OPEN_MODAL', childType: 'EDITOR_CREATE_PROJECT', data: null })
  }
  return { onCreateClickHandler }
}
