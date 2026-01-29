// ===== 다크모드 기능 =====

// 테마 적용
const applyTheme = (theme) => {
  theme === "dark" ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");
};

// 클릭했을때 테마 교체
const toggleHandler = () => {
  const isDark = body.classList.contains("dark-mode");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  // updateIcon();
  localStorage.setItem("flowdash-theme", newTheme);
};

// 초기 불러오기
const loadTheme = () => {
  const savedTheme = localStorage.getItem("flowdash-theme") || "light";

  // 아이콘 교체 로직 변경
  themeBtn.innerHTML = `
    <div class="icon-wrapper">
      ${lightIcon} 
      ${darkIcon}
    </div>
    <span class="ripple"></span>
  `;

  applyTheme(savedTheme);
  // updateIcon();
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
    input.style.width = "0px";
    input.style.width = input.scrollWidth + 2 + "px";
  });
}
// 엔터 누르면 span 돌아옴
function inputEnter(e) {
  if (e.key === "Enter") {
    // finishEdit(e.target); // input 전달식 !!!!!
    e.target.blur();
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

// 아이콘 넣을 span 요소 생성
const iconWrap = () => {
  const user = document.querySelector(".user");
  let randomWarp = user.querySelector(".nickname-icon");

  // span이 만들어져 있는지 확인
  if (!randomWarp) {
    randomWarp = createTag("span", "nickname-icon");
    user.append(randomWarp);
  }

  // 아이콘 요소 반환
  return randomWarp;
};

// =========

// 랜덤 아이콘
const changeIcon = (randomWarp) => {
  // 0 이상 1 미만 만들어주니 * 랜덤 이미지 인덱스 번호
  const randomIndex = Math.floor(Math.random() * svgIcons.length);

  // 선택된 아이콘 SVG 삽입
  randomWarp.innerHTML = svgIcons[randomIndex];
};

// =========

// 아이콘 요소 받아와서 클릭이벤트 실행
const iconEl = iconWrap();
// 처음 한번 랜덤 아이콘 만들기!
changeIcon(iconEl);

// 아이콘 클릭 시 랜덤 아이콘 변경
iconEl.addEventListener("click", () => {
  changeIcon(iconEl);
});

//=================================================

// 시간대별로 메세지

const nicknameEl = document.querySelector(".time");

// 현재 시간 가져오기
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

// 날짜 실시간 적용 js

const dateNow = document.querySelector(".date");

// 오늘 날짜 추출
const dateToday = new Date(); // 지금 (date객체 생성)
dateToday.setHours(0, 0, 0, 0); // 시간을 00~00초기화

const dateYear = dateToday.getFullYear(); // 연도
const dateMonth = dateToday.getMonth() + 1; // 월 (js 인덱스 0~11 기준 )
const dateDay = dateToday.getDate(); // 일

// 주석 풀고 아래 주석처리하면 확인가능 (분)
// const dateMinutes = now.getMinutes();
// dateNow.textContent = `${dateYear}년 ${dateMonth}월 ${dateDay}일 ${dateMinutes}분`;

// HTML에 적용
dateNow.textContent = `${dateYear}년 ${dateMonth}월 ${dateDay}일`;
