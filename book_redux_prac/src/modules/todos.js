import { type } from '@testing-library/user-event/dist/type';

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경하는 기능
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록하는 기능
const TOGGLE = 'todos/TOGGLE'; // todo를 체크 및 체크해제 하는 기능
const REMOVE = 'todos/REMOVE'; // todo를 제거하는 기능

export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 3; // insert가 호출될 때마다 1씩 더해진다.
export const insert = (text) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});
