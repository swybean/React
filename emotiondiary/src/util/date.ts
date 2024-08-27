// 주어진 Date 객체를 YYYY-MM-DD 문자열 형식으로 반환하는 함수

// Date 객체를 받아 문자열로 변환
// date라는 하나의 매개변수를 받음 (이건 Date 타입)
export const getStringDate = (date: Date) => {
  // Date 객체 중 연도를 가져옴
  let year = date.getFullYear();
  // Date 객체 중 월을 가져옴, 인덱스로 가져오기 때문에 1을 더해야 함
  let month: string = String(date.getMonth() + 1);
  // Date 객체 중 일을 가져옴
  let day: string = String(date.getDate());
  // 월 & 일이 한자리 수 이면 앞에 0을 추가함
  if (Number(month) < 10) {
    month = `0${month}`;
  }
  if (Number(day) < 10) {
    day = `0${day}`;
  }
  // 2024-08-27 형식으로 반환
  return `${year}-${month}-${day}`;
};
