import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux 모듈에서 다이어리 항목의 타입을 정의한 것을 임포트
import { DiaryItemType } from "../redux/modules/items";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 일기 목록의 정렬 순서를 지정하는 옵션 리스트
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

// 일기 목록을 필터링하는 옵션 리스트
const filterOptionList = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// 위에서 value와 name에 대한 설명
// value : 각 옵션의 고유한 값, 로직에서 옵션에 따른 동작을 결정
// name : 사용자에게 표시되는 옵션의 이름, UI에 표시

// ControlMenu 컴포넌트가 받을 수 있는 props 타입을 정의
type PropsTypeControlMenu = {
  // 현재 선택된 값
  value: string;
  // (v: string) : onChange가 받는 하나의 매개변수 v가 string 타입이란 뜻
  // 여기서 v는 선택된 드롭다운 옵션의 값이 된다.
  // => void : 이 함수는 void를 반환한다는 뜻 (호출될 때 어떤 값을 반환하지 않느다는 의미)
  // 반환값이 없는 함수는 일반적으로 어떤 동작을 수행하기 위해 호출되고, 결과를 반환하지 않음
  // 여기서는 필터에서 최신순, 오래된순 상태를 결정하고, 화면에 해당 필터에 맞는 목록이 보이게 해주기만 하고,
  // 그 외에 다른 기능은 하지 않기 때문에 void 함수를 사용한다.
  onChange: (v: string) => void;
  // 드롭다운 메뉴에 표시될 옵션 리스트
  optionList: {
    value: string;
    name: string;
  }[];
};

// 드롭다운 메뉴를 렌더링
// 선택옵션에 따라 콜백함수를 호출
const ControlMenu = React.memo(
  ({ value, onChange, optionList }: PropsTypeControlMenu) => {
    return (
      <select
        className="ControlMenu"
        value={value} // 현재 선택된 옵션의 값을 나타냄, select 요소에 바인딩 됨
        // 사용자가 드롭다운 메뉴에서 다른 옵션을 선택하면 발생하는 onChange 이벤트
        onChange={(e) => onChange(e.target.value)}
      >
        {optionList.map((it, idx) => (
          // optionList를 순회하며 각 옵션을 <option> 요소로 렌더링
          // key : 각 <option> 요소에 고유한 키를 부여
          // value={it.value} : 각 옵션의 값, 사용자가 이 옵션을 선택할 때 이 값이 select 요소의 value로 설정됨
          // {it.name} : 옵션에 표시될 텍스트
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    );
  }
);

// DiaryItemType 컴포넌트가 받을 수 있는 props 타입을 정의
type PropsType = {
  // DiaryItemType의 배열
  diaryList: DiaryItemType[];
};

const DiaryList = ({ diaryList }: PropsType) => {
  const navigate = useNavigate();
  // sortType과 filter의 상태를 관리
  // 각각 정렬순서, 필터링 조건을 나타냄
  const [sortType, setSortType] = useState<string>("latest");
  const [filter, setFilter] = useState<string>("all");

  const getProcessDiaryList = () => {
    // filter 상태에 따라 일기 항목을 필터링 하는 콜백 함수
    const filterCallBack = (item: { emotion: string }): boolean => {
      // good인 경우 감정이 3 미만인 항목만, all인 경우 모든 항목을 반환
      if (filter === "good") {
        return parseInt(item.emotion) < 3;
      } else {
        return parseInt(item.emotion) >= 3;
      }
    };

    // sortType 상태에 따라 일기 항목을 정렬하는 비교 함수
    const compare = (a: { date: string }, b: { date: string }) => {
      // latest인 경우 최신순, oldest인 경우 오래된 순으로 정렬
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 원본 리스트를 복사해 정렬 및 필터링 작업을 수행
    // 원본 배열을 유지하기 위함
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 필터링된 리스트
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it: { emotion: string }) => filterCallBack(it));

    // 필터링된 리스트를 정렬한 최종 리스트
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <h4>정렬</h4>
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      <div className="diaryitem_wrapper">
        {getProcessDiaryList().map(
          (it: JSX.IntrinsicAttributes & DiaryItemType) => (
            <DiaryItem key={it.id} {...it} />
          )
        )}
      </div>
    </div>
  );
};

// diaryList prop의 기본값을 빈 배열로 설정
DiaryList.defaultProps = {
  DiaryList: [],
};

export default DiaryList;
