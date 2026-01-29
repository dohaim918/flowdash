// ====================================================================

// 기존 flowdash-todos 배열 가져오는데 || 값이 없으면 빈 배열!!
// let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];

// ! + 이거 데이터 초기화 함수 불러와서 쓰면됨
let todos = getTodos();

// ====================================================================

// // 삭제 버튼 탐색
// const deleteBtns = document.getElementsByClassName("task-delete-btn");

// // 토글 함수만 요소 받아서 쓰는거로 따로 만들수도..?
// const toggleDeleteModal = () => {
//   const removerList = document.querySelector(".delete-over");
//   removerList.classList.toggle("open");
// };
// console.log(Array.from(deleteBtns));

// Array.from(deleteBtns).forEach((d) => {
//   // li 삭제 모달 열기

//   d.addEventListener("click", (e) => {
//     e.stopPropagation();
//     toggleDeleteModal();
//   });
// });

// 삭제모달 클래스 추가 &

const openDelModal = (id) => {
  IsFixId = id;
  deletModal.classList.add("open");
  document.body.style.overflow = "hidden";
};

allDelete.addEventListener("click", () => {
  deletModal.classList.add("open");
  document.body.style.overflow = "hidden";
});

// 삭제 모달 닫기
const colseDelModal = () => {
  IsFixId = null;

  deletModal.classList.remove("open");
  console.log("지워졌는지 확인 :", IsFixId);
  document.body.style.overflow = "unset";
};

// 취소 버튼에 연결
deletCancelBtn.addEventListener("click", colseDelModal);

// 딤드 클릭시 모달닫기
deletModal.addEventListener("click", (e) => {
  if (e.target == deletModal) colseDelModal();
});

//식제 모달 확인 버튼
const listDelet = () => {
  todos = getTodos();
  if (!IsFixId) {
    todos.length = 0;
  } else {
    const targetId = Number(IsFixId);
    todos = todos.filter((todo) => todo.id !== targetId);
  }

  // 삭제 전 로컬스토리지에서 최신 데이터를 다시 가져오기

  // ID를 숫자로 변환

  // 화면 새로 갱신
  setTodos(todos);
  render();

  // 모달닫기
  colseDelModal();
  console.log("삭제 후, 남은 할일 수:", todos.length);
};

deletBtn.addEventListener("click", listDelet);
