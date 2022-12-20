import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  // 초기배열항목
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    // concat : 배열.concat([배열]) - 기존 배열을 변경하지 않으면서 새로운 항목이 추가된 새로운 배열을 반환
    case "TOGGLE":
      return state.map(
        (todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)
        // todo : initialState안의 항목들
        // todo.id 중 액션이 일어난 id인가? 맞으면 done의 상태 바꾸기 : 아니면 그래로 리턴
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    // action이 일어난 id를 제외한 배열 반환
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 컴포넌트에서 useContext 를 직접 사용하는 대신에, useContext 를 사용하는 커스텀 Hook 을 만들어서 내보냄
export function useTodoState() {
  const context = useContext(TodoStateContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider')
    // ()안의 메시지와 함께 오류 개체를 생성
  }
  return context
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context
}

// useTodoState, useTodoDispatch, useTodoNextId Hook 을 사용하려면, 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 한다
// 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키도록 한다(실수를 하게 됐을 때 문제점을 빨리 발견하기 위함. 필수는 아님)