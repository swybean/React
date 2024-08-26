// ReactNode는 React에서 사용될 수 있는 모든 유형의 자식 요소를 의미하는 타입
// string, number, ReactElement, null, undefined 까지 포함
import React, { ReactNode } from "react";

// Myheader 컴포넌트가 받을 수 있는 props의 타입을 정의
type PropsType = {
  headText: string; // header에 표소될 텍스트, 문자열 타입
  leftChild: ReactNode; // 헤더 왼쪽 자식 요소, ReactNode 타입
  rightChild: ReactNode; // 헤더 오른쪽 자식 요소, ReactNode 타입
};

// 함수형 컴포넌트
const MyHeader = ({ headText, leftChild, rightChild }: PropsType) => {
  return (
    // 각자 prop으로 전달된 자식 요소를 렌더링함.
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
