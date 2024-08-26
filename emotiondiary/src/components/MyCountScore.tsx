import React from "react";

// MyCountScore 컴포넌트가 받을 수 있는 props 타입을 정의
type PropsType = {
  allCount: number; // 모든 감정의 개수
  goodCount: number; // 긍정적인 감정의 개수
  badCount: number; // 부정적인 감정의 개수
};

const MyCountScore = ({ allCount, goodCount, badCount }: PropsType) => {
  return (
    // 전체를 감싸는 div
    <div className="MyCountScore">
      <h4>요약</h4>

      {/* 감정 점수를 그룹화하는 div */}
      <div className="count_score_wrapper">
        <div className="count">
          <h4>{allCount}</h4>
          <p>모든 감정</p>
        </div>
        <div className="count">
          <h4>{goodCount}</h4>
          <p>좋은 감정</p>
        </div>
        <div className="count">
          <h4>{badCount}</h4>
          <p>안좋은 감정</p>
        </div>
      </div>
    </div>
  );
};

// React.memo로 컴포넌트 최적화
// props가 변경되지 않는 한 리렌더링 하지 않음
// 동일 props를 받은 경우, 불필요한 리렌더링을 방지 -> 성능 최적화
export default React.memo(MyCountScore);
