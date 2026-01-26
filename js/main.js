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

// ====================

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

// li요소
const statusItems = statusList.querySelectorAll("li");

// ! ~ 현재 선택된 li에 id값 !! ~ !
let IsFix = null;

// ==========================================

// 오름차순 내림차순 요소 선택
const sortBtn = document.querySelector(".toggle-btn");
const sortSub = document.querySelector(".list-control-bar-content");
const change = document.querySelectorAll(".change");

// ================================

// 통계 요소
// const statusNums = document.querySelectorAll(".dashbord-stats .stats-number");
// const cardStatusNums = document.querySelectorAll(".card-header span");
const statusNums = document.querySelector("span[data-num]");
const todoNums = document.querySelectorAll("span.todo");
const doingNums = document.querySelectorAll("span.doing");
const doneNums = document.querySelectorAll("span.done");
const percentNums = document.querySelector("span[data-num='percent']");

// ==========================================

// todoObj.content = content;
// todoObj.priority = priority;
// todoObj.status = status;
// todoObj.updateAt = nowDate(timeStamp);
// todoObj.completeAt = status === "done" ? nowDate(timeStamp) : null;

// 상태값 텍스트

// ! status(상태) 텍스트
const STATUS_TEXT = {
  todo: "할 일",
  doing: "진행 중",
  done: "완료",
};
// ! priority(중요도) 텍스트
const PRIORITY_TEXT = {
  high: "높음",
  mid: "중간",
  low: "낮음",
};

// ==========================================

// ! 상태별(할 일, 진행 중, 완료) ul 요소
const lists = {
  todo: document.querySelector("#todoList"),
  doing: document.querySelector("#progressList"),
  done: document.querySelector("#doneList"),
};
// ul 객체의 키와 값 각각 배열로 반환
const todoListKey = Object.keys(lists);
const todoList = Object.values(lists);

// ! 상태별 리스트가 비어있을 때 보여줄 문구
const emptyTexts = {
  todo: document.querySelector(".todo-item .empty"),
  doing: document.querySelector(".progress-item .empty"),
  done: document.querySelector(".done-item .empty"),
};
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

  // 저장된 우선순위 값이랑 같은 버튼에 active 설정
  priorityBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.prio == todoObj.priority);
  });

  // 저장된 상태(할일/진행중/완료) 값이랑 같은 버튼에 active 설정
  statusItems.forEach((li) => {
    const isActive = li.dataset.state === todoObj.status;
    // console.log("li:", li.dataset.state, "| todo:", todoObj.status);
    li.classList.toggle("active", isActive);
    if (isActive) {
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
  // 로컬스토리지에서 저장된 todo 목록 가져오기
  const todos = getTodos();
  // ul 초기화
  todoList.forEach((ul) => (ul.innerHTML = ""));

  // 각 todo 객체를 해당 상태별 리스트에 렌더링
  todos.forEach((todo) => {
    renderTodo(todo); //  todoCard.js에서 li 요소 생성 후 ul에 추가
  });

  // 상태별 리스트가 비어있으면 empty 문구 표시, 있으면 숨기기
  toggleEmpty();

  // 통계 계산 함수 호출
  // const stats = gatCountStats(todos);
  // renderStatus(stats);
  countStatus(todos);

  // 아이콘 생성 함수
  changeIcon();
};

document.addEventListener("DOMContentLoaded", render);
