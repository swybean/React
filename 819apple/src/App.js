import "./App.css";
import { useState } from "react";

function App() {
  // 일반 변수
  // let post = "강남 우동 맛집";

  // 블로그 제목 같이 바뀔 일이 없거나 매우 드문 경우 사용 X
  // let [logo, setLogo] = useState("ReactBlog");

  let [likeCount, setLikeCount] = useState(0);

  function likePlus() {
    setLikeCount(likeCount + 1);
  }

  // let [title1, setTitle1] = useState("남자 코트 추천");
  // let [title2, setTitle2] = useState("강남 우동 맛집");
  // let [title3, setTitle3] = useState("파이썬 독학");

  // 위 useState 3개를 한 번에 쓰는 법
  let [title, setTitle] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);

  function changeTitle() {
    let copy = [...title];
    copy[0] = "여자 코트 추천";
    setTitle(copy);
  }

  function sorting() {
    var sortArray = [...title];
    sortArray = sortArray.sort();
    setTitle(sortArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={changeTitle}>첫 번째 글 제목 수정</button>
      <button onClick={sorting}>가나다순 정렬</button>

      <div className="list">
        <h4>
          {/* {title[0]} */}
          {title[0]}
          <span onClick={likePlus}>👍</span> {likeCount}
        </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        {/* <h4>{title[1]}</h4> */}
        <h4>{title[1]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        {/* <h4>{title[2]}</h4> */}
        <h4>{title[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <Modal />
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

// const Modals = ({ title }) => {
//   return (
//     <div>
//       <h1>{title}</h1>
//     </div>
//   );
// };

export default App;
