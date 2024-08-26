import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동 기능 훅
// 다이어라 항목의 데이터 구조를 정의
// DiaryItemType이 정의된 곳에서 해당 항목이 어떤 속성을 가지는지 알 수 있음
import { DiaryItemType } from "../redux/modules/items";

// 함수형 컴포넌트
// DiaryItemType 타입의 props를 받음
// id는 string, date는 string | number, content는 string, emotion은 number, images는 string
const DiaryItem = ({ id, emotion, content, date }: DiaryItemType) => {
  // 페이지 이동을 할 수 있도록 navigate 함수를 가져온다.
  const navigate = useNavigate();

  // 사용자가 다이어리 항목을 클릭 시 id 기준으로 해당 항목의 상세 페이지로 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  return (
    // 최상위 div
    <div className="DiaryItem">
      <div
        // 감정상태에 따라 클랙스가 동적으로 설정되는 div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emtion${emotion}.png`}
          alt={content}
        ></img>
      </div>
    </div>
  );
};

// React.memo를 사용한 컴포넌트 최적화
export default React.memo(DiaryItem);
