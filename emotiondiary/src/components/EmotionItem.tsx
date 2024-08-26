import React from "react";

// EmotionItem 컴포넌트가 받을 수 있는 props의 타입을 정의
type PropsType = {
  emotion_id: number;
  emotion_img: string;
  emotion_descript: string;
  // 사용자가 감정 항목을 클릭했을 때 호출되는 함수
  // number 타입의 인자(감정ID)를 받아들이고, 반환값이 없는 void 함수
  onClick: (i: number) => void;
  isSelected: boolean;
};

// 함수형 컴포넌트, PropsType 타입의 props를 받아옴
// 비구조화 할당 : 함수 매개변수로 props를 받아올 때, 객체의 각 속성을 개별 변수로 바로 할당
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}: PropsType) => {
  return (
    <div
      onClick={() => onClick(emotion_id)} // 사용자가 이 <div>를 클릭했을 때 실행되는 함수
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
