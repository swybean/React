import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import { BiTrash, BiArrowBack, BiCheck, BiImageAdd, BiX } from "react-icons/bi";

import { useDispatch } from "react-redux";
import {
  createItem,
  DiaryItemType,
  editItem,
  removeItem,
} from "../redux/modules/items";

import shortId from "shortid";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { read } from "fs";

// DiaryEditor 컴포넌트가 받을 수 있는 props의 타입을 정의
type PropsType = {
  isEdit: boolean;
  originData: DiaryItemType;
};

const DiaryEditor = ({ isEdit, originData }: PropsType) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState<string>(getStringDate(new Date()));
  const [images, setImages] = useState<string>("");
  const dispatch = useDispatch();
  const handleImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = () => {
      setImages(reader.result as string);
    };
  }, []);

  const deleteImage = () => {
    setImages("");
  };

  const handleClick = useCallback(() => {
    photoInput.current!.click();
  }, []);

  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const dataId = shortId.generate();
    if (content.length < 1) {
      contentRef.current!.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        dispatch(createItem(dataId, date, content, emotion, images));
      } else {
        dispatch(editItem(originData.id, date, content, emotion, images));
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(removeItem(originData.id));
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
      setImages(originData.images);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton text={<BiArrowBack />} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={<BiTrash />}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4 className="today_date">오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4 className="today_emotion">오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => {
              return (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmote}
                  isSelected={it.emotion_id === emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4 className="today_diary">오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="img_wrapper">
            {images && <h4 className="today_emotion">오늘의 추억</h4>}
            {images && <img src={images} className="thumbNail" alt="이미지" />}
          </div>
          <div className="control_box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImages}
              ref={photoInput}
              style={{ display: "none" }}
            />
            <MyButton text={<BiImageAdd />} onClick={handleClick} />
            {images && (
              <MyButton text={<BiX />} type={"default"} onClick={deleteImage} />
            )}
            <MyButton
              text={<BiCheck />}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
