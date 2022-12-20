import React from 'react'
import styled from 'styled-components'
import { useTodoState } from '../TodoContext'


const TodoTemplateBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`


function TodoHead() {
  // context API사용
  const todos = useTodoState();
  console.log(todos);
  const undoneTasks = todos.filter(todo => !todo.done)  // done상태가 아닌 것

  const today = new Date()
  const dateString = today.toLocaleDateString('ko-KR', {  // 'en-US':영어, 'ko-KR' :한글
    year: 'numeric',  // 2022년 => 2022
    month: 'long',    // 5월 => March
    day: 'numeric'    // 1일 => 1
  })
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' })
                     // toLocaleDateString()메서드 : 사용자 에이전트 시간대에서 지정된 날짜의 날짜 부분을 언어별로 표현한 문자열을 반환
  return (
    <TodoTemplateBlock>
      <h1>{dateString}</h1>
      <div className='day'>{dayName}</div>
      <div className='tasks-left'>할 일 {undoneTasks.length}개 남음</div>
    </TodoTemplateBlock>
  )
}

export default TodoHead