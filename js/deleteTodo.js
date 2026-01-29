// 삭제모달 클래스 추가

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

    // ID를 숫자로 변환
  } else {
    const targetId = Number(IsFixId);
    todos = todos.filter((todo) => todo.id !== targetId);
  }

  // 삭제 전 로컬스토리지에서 최신 데이터를 다시 가져오기

  // 화면 새로 갱신
  setTodos(todos);
  render();

  // 모달닫기
  colseDelModal();

  // ====================================================
};

deletBtn.addEventListener("click", listDelet);

// 드롭다운 영역외 클릭시 닫기
window.addEventListener("click", (e) => {
  if (statusSelect.classList.contains("open") && !statusSelect.contains(e.target))
    statusSelect.classList.remove("open");
});
