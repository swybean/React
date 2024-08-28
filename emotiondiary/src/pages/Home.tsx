import React, { useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
import MyCountScore from "../components/MyCountScore";

import { useSelector } from "react-redux";
import { DiaryItemType } from "../redux/modules/items";
import { RootState } from "../redux/modules/reducer";

const Home = () => {
  const diaryList = useSelector((state: RootState) => state.items);

  const [data, setData] = useState<DiaryItemType[]>([]);
  const [curDate, setCurDate] = useState<Date>(new Date());

  // 영문변환
  const headText = `${curDate.toLocaleString("en-US", {
    month: "long",
  })} ${curDate.getFullYear()}`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "감정일기장";
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59
      ).getTime();

      // setData(
      //   diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      // );
      setData(
        // diaryList.filter(
        //   (it) =>
        //     firstDay <= (it.date as number) && (it.date as number) <= lastDay
        // )
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const allCount = data.length;
    const badCount = data.filter((el): boolean => el.emotion >= 3).length;
    const goodCount = data.length - badCount;
    return { allCount, badCount, goodCount };
  }, [data]);

  const { allCount, badCount, goodCount } = getDiaryAnalysis;

  return (
    <div className="HomePage">
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton text={<BiChevronLeft />} onClick={decreaseMonth} />
        }
        rightChild={
          <MyButton text={<BiChevronRight />} onClick={increaseMonth} />
        }
      />
      <div className="home_page_inner">
        <MyCountScore
          allCount={allCount}
          goodCount={goodCount}
          badCount={badCount}
        />
        <DiaryList diaryList={data} />
      </div>
    </div>
  );
};

export default Home;
