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

// 테마 적용
const applyTheme = (theme) => {
  theme === "dark" ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");
};

// 아이콘 교체
const updateIcon = () => {
  const isDark = body.classList.contains("dark-mode");
  themeBtn.innerHTML = isDark ? lightIcon : darkIcon;
};

// 클릭했을때 테마 교체
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
const svgIcons = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16"><path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bluesky" viewBox="0 0 16 16"><path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16"><path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg>`,
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-lightning-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/></svg>`,
];
const changeIcon = () => {
  const user = document.querySelector(".user");
  let randomWarp = user.querySelector(".nickname-icon");

  if (!randomWarp) {
    randomWarp = createTag("span", "nickname-icon");
    user.append(randomWarp);
  }

  // 0 이상 1 미만 만들어주니 * 랜덤 이미지 인덱스 번호
  const randomIndex = Math.floor(Math.random() * svgIcons.length);
  randomWarp.innerHTML = svgIcons[randomIndex];
};
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
document.addEventListener("DOMContentLoaded", () => {
  const dateNow = document.querySelector(".date");

  // 날짜 문자열로 가져와..
  const text = dateNow.textContent.trim();

  // 숫자만 가져오기 (규식이형)
  const numberDate = text.match(/\d+/g); // ["0000","0","00"] 현재 날짜

  const year = Number(numberDate[0]);
  const month = Number(numberDate[1]) - 1; // - 1 안하면 2월 인식
  const day = Number(numberDate[2]);

  // Date 객체로 전환?..변환(conversion)
  const conversion = new Date(year, month, day);
  conversion.setHours(0, 0, 0, 0);

  // 오늘 날짜 추출
  const dateToday = new Date();
  dateToday.setHours(0, 0, 0, 0);
});

// // 비교 콘솔 확인용 (확인 필요 시 사용)
// if (conversion.getTime() === dateToday.getTime()) {
//   console.log('오늘 날짜 맞음');
// } else {
//   console.log('오늘 아님');
// }
