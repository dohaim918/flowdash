const newBtn = document.querySelector(".new-btn");
const modal = document.querySelector(".modal-overlay");

// 클릭 시 수정
const nicknameSpan = document.querySelector(".nickname-name");

// 저장된 닉네임 불러오기
const savedName = localStorage.getItem("flowdash-nickname");
if (savedName) {
  nicknameSpan.textContent = savedName;
}

// 클릭 시 -> input 변환
function activeInput() {
  const spanWidth = nicknameSpan.offsetWidth; // ⭐ 교체 전에 너비 저장

  const input = document.createElement("input");
  input.type = "text";
  input.value = nicknameSpan.textContent;
  input.className = "nickname-input";
  input.maxLength = 20;

  nicknameSpan.replaceWith(input);

  // span이 갖고 있던 너비 그대로 적용
  input.style.width = spanWidth + 2 + "px";

  input.focus();

  input.addEventListener("keydown", inputEnter);
  input.addEventListener("blur", inputBlur);

  // 입력 중에도 width 자연스럽게 업데이트(선택)
  input.addEventListener("input", () => {
    // 여기고침!!!!!!!!!!!!!!!!!!ㅎㅎㅎㅎㅎ (고맙워!! ㅋㅋ)
    // scrollWidth = 요소 안에 있는 “내용이 실제로 차지하는 진짜 너비(px)”
    // input.style.width = input.value.length + 1 + "ch";
    input.style.width = "0px";
    input.style.width = input.scrollWidth + 2 + "px";
  });
}
// 엔터 누르면 span 돌아옴
function inputEnter(e) {
  if (e.key === "Enter") {
    finishEdit(e.target); // input 전달식 !!!!!
  }
}

// 포커스 벗어나도 span 돌아오는
function inputBlur(e) {
  finishEdit(e.target);
}

// 공백 입력 시 기본값으로 돌리기
function finishEdit(inputEl) {
  const value = inputEl.value.trim() || nicknameSpan.textContent;

  // 로컬스토리지에 저장 (이전 값 혹은 새로 입력한 값)
  localStorage.setItem("flowdash-nickname", value);

  // 로컬스토리지 저장
  localStorage.setItem("flowdash-nickname", value);

  // 다시 span 바뀌게
  nicknameSpan.textContent = value;
  inputEl.replaceWith(nicknameSpan);
}

// 저장 길이에 따라 폭 조절
// >> e.target.value.length -> 글자 수 !!
function inputSize(e) {
  e.target.style.width = `${e.target.value.length + 1}ch`;
}

// 클릭 시 input 활성화
nicknameSpan.addEventListener("click", activeInput);

// =================================================

// 아이콘 랜덤변경
const random = document.querySelectorAll(".nickname-icon");

// 0 이상 1 미만 만들어주니 * 랜덤 이미지 인덱스 번호
const randomIndex = Math.floor(Math.random() * random.length);
random[randomIndex].classList.add("img");

//=================================================

// 시간대별로 메세지

const nicknameEl = document.querySelector(".time");

// //  현재 시간 가져오기
const now = new Date();
const hour = now.getHours(); // 0-23

let message = ""; //

if (hour >= 5 && hour < 11) {
  message = "좋은 아침이에요";
} else if (hour >= 11 && hour < 17) {
  message = "좋은 오후이에요";
} else if (hour >= 17 && hour < 22) {
  message = "좋은 저녁이에요";
} else {
  message = "안녕하세요";
}

nicknameEl.textContent = message;

// ================================================
// 날짜 실시간 이 느낌으로

// text,match(/\d+/g) : 숫자 뽑기

// function isData() {
//   const dateNow = new Date()        // 지금
//   const dateToday = new Date();     // 오늘 
//   dataToday.setHours(0,0,0,0);      // 오늘, 00:00 지정

//   const live = new Data(dataToday);
//   live.setDate(dataToday.getDate() + 1 or -1); // 내일 00.00 지정


// 날짜 실시간 적용 js
document.addEventListener("DOMContentLoaded",() => {
const dateNow = document.querySelector(".date")

// 날짜 문자열로 가져와..
const text = dateNow.textContent.trim(); 

// 숫자만 가져오기 (규식이형)
const numberDate = text.match(/\d+/g); // ["0000","0","00"] 현재 날짜

const year = Number(numberDate[0]);
const month = Number(numberDate[1]) - 1; // - 1 안하면 2월 인식
const day = Number(numberDate[2]);

// Date 객체로 전환?..변환(conversion) 
const conversion = new Date(year,month,day);
conversion.setHours(0,0,0,0);

// 오늘 날짜 추출 
const dateToday = new Date();
dateToday.setHours(0,0,0,0);

});

// // 비교 콘솔 확인용 (확인 필요 시 사용)
// if (conversion.getTime() === dateToday.getTime()) {
//   console.log('오늘 날짜 맞음');
// } else {
//   console.log('오늘 아님');
// }



