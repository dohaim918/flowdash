// ===== 다크모드 기능 =====

// 추가할 아이콘
const lightIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;

const darkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg>`;

// 1. 테마 적용
const applyTheme = (theme) => {
  theme === "dark" ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");
};

// 2. 아이콘 교체
const updateIcon = () => {
  const isDark = body.classList.contains("dark-mode");
  themeBtn.innerHTML = isDark ? lightIcon : darkIcon;
};

// 3. 클릭했을때 테마 교체
const toggleHandler = () => {
  const isDark = body.classList.contains("dark-mode");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  updateIcon();
  localStorage.setItem("flowdash-theme", newTheme);
};

// 초기 불러오기
const loadTheme = () => {
  const savedTheme = localStorage.getItem("flowdash-theme") || "light";

  applyTheme(savedTheme);
  updateIcon();
};

// 이벤트 핸들러
themeBtn.addEventListener("click", toggleHandler);
document.addEventListener("DOMContentLoaded", loadTheme);

// ========================

const newBtn = document.querySelector(".new-btn");
const modalBg = document.querySelector(".modal-overlay");

// 클릭 시 수정
const nicknameSpan = document.querySelector(".user-name");

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

  const dateNow = document.querySelector(".date");

  // 오늘 날짜 추출 
  const dateToday = new Date();  // 지금 (date객체 생성)
  dateToday.setHours(0,0,0,0);  // 시간을 00~00초기화


  const dateYear = dateToday.getFullYear();    // 연도
  const dateMonth = dateToday.getMonth() + 1; // 월 (js 인덱스 0~11 기준 )
  const dateDay = dateToday.getDate();       // 일

  // 주석 풀고 아래 주석처리하면 확인가능 (분) 
  // const dateMinutes = now.getMinutes();     
  // dateNow.textContent = `${dateYear}년 ${dateMonth}월 ${dateDay}일 ${dateMinutes}분`;
  
  // HTML에 적용
  dateNow.textContent = `${dateYear}년 ${dateMonth}월 ${dateDay}일`;
  


