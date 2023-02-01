import { User } from 'firebase/auth'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { useAuthStore } from '../hooks/useAuthStore'

interface ChatContextProps {
  data: {
    chatId: string | 'null'
    user: {}
  }
  dispatch: Dispatch<{ type: any; payload: { uid: string | number } }>
}

export const ChatContext = createContext<ChatContextProps | null>(null)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuthStore()
  const currentUserID = currentUser ? currentUser.uid : 'null'

  const INITIAL_STATE = {
    chatId: 'null',
    user: {}
  }

  const chatReducer = (
    state: any,
    action: { type: any; payload: { uid: string | number } }
  ) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUserID > action.payload.uid
              ? currentUserID + action.payload.uid
              : action.payload.uid + currentUserID
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
