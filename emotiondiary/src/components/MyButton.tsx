import React from "react";

// PropsType은 MyButton 컴포넌트가 받을 수 있는 props의 타입을 정의
interface PropsType {
  text: JSX.Element | string; // textx는 이 두 타입 중 하나를 받아온다.

  // 버튼의 스타일을 결정하는 값으로, 4가지가 있다.
  type: "positive" | "negative" | "cancel" | "default";

  // 버튼 클릭 시 호출되는 함수
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
  // 위에 코드는 더 포괄적이고, 다양한 이벤트 핸들러를 타입으로 지정할 때 유리
  // 다만, 불필요한 타입 정보를 가져올 수 있음
  // 아래 코드는 간결 및 명확, 코드 가독성과 유지보수성 향상
  // 다만, 특수한 경우 다양한 이벤트 핸들러가 필요할 경우 추가로 타입 명시 필요
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// MyButton은 함수형 컴포넌트
const MyButton = ({ text, type, onClick }: PropsType) => {
  // 버튼 타입이 3가지 중 하나인지 확인, 3가지가 전부 아니면 default로 설정
  // 버튼의 스타일 클래스를 설정할 때 사용한다.
  const btnType = ["positive", "negative", "cancel"].includes(type)
    ? type
    : "default";

  return (
    <button
      // 버튼의 클랙스를 설정 -> Mybutton과 위에서 결정된 추가 클랙스를 설정
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// 기본 props를 설정
// type prop의 기본값을 default로 설정
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
