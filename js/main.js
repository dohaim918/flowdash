// 요소 선택

// 다크모드
const themeBtn = document.querySelector(".dark-mode-toggle");
const body = document.body;

// =============================

// modal 영역

// 전체영역
const modal = document.querySelector(".modal-overlay");
// 모달 상단 메인 텍스트
const modalname = modal.querySelector(".modal-title");
// 제목을입력하는 인풋
const titleInput = modal.querySelector(".text");
// 에러 클래스를 넣을 부모
const formGroup = modal.querySelector(".form-group");
// 내용 입력하는 텍스트영역
const textareaContent = modal.querySelector("textarea");

// 클릭할 버튼
const modalBtn = document.querySelector(".new-btn");
// 삭제 버튼
const cancelBtn = modal.querySelector(".btn-cancel");
// 추가 버튼
const addBtn = modal.querySelector(".btn-save");

// =============================

// 우선순위 버튼

// active 추가 + 제거
const priorityBtns = document.querySelectorAll(".priority-btn");

// 요소 선택 (버튼드롭 리스트)
// 전체영역
const statusSelect = document.querySelector(".status-select");
// 드롭다운 메인 버튼
const statusBtn = statusSelect.querySelector(".status-btn");
// 메인 버튼 문구
const statusValue = statusSelect.querySelector(".status");
// ul요소
const statusList = statusSelect.querySelector(".status-list");
// const statusListAll = statusSelect.querySelectorAll(".status-list");
// li요소
const statusItems = statusList.querySelectorAll("li");

// ! ~ 현재 선택된 li에 id값 !! ~ !
let IsFix = null;

// ==========================================

// todoObj.content = content;
// todoObj.priority = priority;
// todoObj.status = status;
// todoObj.updateAt = nowDate(timeStamp);
// todoObj.completeAt = status === "done" ? nowDate(timeStamp) : null;

// 상태값 텍스트

// ! status(상태) 텍스트
const statusText = {
  todo: "할 일",
  doing: "진행 중",
  done: "완료",
};
// ! priority(중요도) 텍스트
const priorityText = {
  high: "높음",
  mid: "중간",
  low: "낮음",
};

// ==========================================

// ! 상태별 리스트 - ul
const lists = {
  todo: document.querySelector("#todoList"),
  doing: document.querySelector("#progressList"),
  done: document.querySelector("#doneList"),
};

const todoList = Object.values(lists);
// ==========================================

// & 저장된 todo 목록 가져오기
const getTodos = () => {
  const todos = localStorage.getItem("flowdash-todos");
  return todos ? JSON.parse(todos) : [];
};
// & 저장된 todo 목록 로컬에 보내기
const setTodos = (key) => {
  return localStorage.setItem("flowdash-todos", JSON.stringify(key));
};

// ==========================================

// ! 카드 클릭 → 수정 모달 열기

// 모달을 다시열자 수정하쟣ㅎ....
const openModal = (id) => {
  //   console.log("openModal 실행됨, id:", id);
  const todos = getTodos();
  const todoObj = todos.find((todo) => todo.id == id);

  toggleModal();
  modalname.textContent = "할 일 수정";
  titleInput.value = todoObj.title;
  textareaContent.value = todoObj.content;
  priorityBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.prio == todoObj.priority);
  });
  statusItems.forEach((li) => {
    const isActive = li.dataset.state === todoObj.status;
    console.log("li:", li.dataset.state, "| todo:", todoObj.status);
    if (isActive) {
      li.classList.toggle("active");
      statusValue.textContent = li.textContent;
    }
  });

  IsFix = id;
};

// ul 객체 값만 배열로 변환
todoList.forEach((ul) => {
  ul.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    openModal(li.dataset.id);
  });
});

// ==========================================

// # 화면 렌더링
const render = () => {
  const todos = getTodos();
  todoList.forEach((li) => (li.innerHTML = ""));
  todos.forEach((todo) => {
    renderTodo(todo); //  todoCard.js
  });
};

document.addEventListener("DOMContentLoaded", render);
