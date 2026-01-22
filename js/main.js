// 1. 요소 선택
const themeBtn = document.querySelector(".dark-mode-toggle"); // 버튼 클래스명에 맞게 수정
const body = document.body;

// 2. 초기 테마 설정 확인 (새로고침 시 유지용)
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  body.classList.add("dark-mode");
}

// 3. 버튼 클릭 이벤트
themeBtn.addEventListener("click", () => {
  // 다크 모드 클래스 토글
  body.classList.toggle("dark-mode");

  // 현재 상태 저장
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// 1. 요소 선택 (전역이 아니라 클릭 시점이나 로드 시점에 확실히 잡기 위해 함수 안에 넣기도 함)
// const themeBtn = document.querySelector(".dark-mode-toggle");
// const body = document.body;

// // 버튼이 존재하는지 먼저 확인 (에러 방지)
// if (themeBtn) {
//   // 2. 초기 테마 설정 확인
//   const currentTheme = localStorage.getItem("theme");
//   if (currentTheme === "dark") {
//     body.classList.add("dark-mode");
//   }

//   // 3. 버튼 클릭 이벤트
//   themeBtn.addEventListener("click", () => {
//     body.classList.toggle("dark-mode");

//     if (body.classList.contains("dark-mode")) {
//       localStorage.setItem("theme", "dark");
//     } else {
//       localStorage.setItem("theme", "light");
//     }
//   });
// } else {
//   console.error("클래스명이 'dark-mode-toggle'인 요소를 찾을 수 없습니다!");
// }
