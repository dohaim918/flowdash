// ====================================================================

// 기존 flowdash-todos 배열 가져오는데 || 값이 없으면 빈 배열!!
// let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];

// + 이거 데이터 초기화 함수 불러와서 쓰면됨
let todos = getTodos();

allDelete.addEventListener("click", () => {
  todos.splice(0, todos.length);

  // 로컬 스토리지 빈 배열로
  localStorage.setItem("flowdash-todos", JSON.stringify(todos));

  // 화면 부분 초기화!
  todosList.forEach((list) => {
    list.innerHTML = "";
  });

  // + 아무것도 없을때 나오는 문구 재출력 + 통계 초기화 함수 추가!!!!
  toggleEmpty();
  countStatus(todos);
});

// ====================================================================

// 삭제 모달 탐색
const deleteBtns = document.querySelectorAll(".task-delete-btn");

// 토글 함수만 요소 받아서 쓰는거로 따로 만들수도..?
const toggleDeleteModal = () => {
  const removerList = document.querySelector(".delete-over");
  removerList.classList.toggle("open");
};

deleteBtns.forEach((d) => {
  // li 삭제 모달 열기
  d.addEventListener("click", () => {
    toggleDeleteModal();
  });
});
