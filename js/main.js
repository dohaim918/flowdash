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

// ==========================================================

// 요소 리스트 ( 안되면 점 ,"",절차 표시 다시확인 )
// 첫번째 드롭다운 (전체기간 버튼)
// 드롭다운 전체 영역
const dropdownToggle = document.querySelector(".dropdown-toggle");
// 드롭다운 전체기간 버튼
const dropdownTrigger = dropdownToggle.querySelector(".dropdown-trigger");
// 전체 우선순 텍스트
const selectedValue = dropdownTrigger.querySelector(".selected-value");
// 전체 메뉴 (ul)
const dropdownMenu = dropdownToggle.querySelector(".dropdown-menu");
// 메뉴 안 리스트 (li 전체)
const dropdownItem = dropdownMenu.querySelectorAll("li");

// 두번째 드롭다운 (우선순위 버튼)
// 드롭다운 버튼
// 위에랑 같음 내부말고 박스영역 (.ranking만 붙음)
const dropdownToggleRanking = document.querySelector(".dropdown-toggle.ranking");
const dropdownTriggerRanking = dropdownToggleRanking.querySelector(".dropdown-trigger.ranking");
const selectedValueRanking = dropdownTriggerRanking.querySelector(".selected-value.ranking");
const dropdownMenuRanking = document.querySelector(".dropdown-menu.ranking"); // toggle 밖에 있음 (분리)
const dropdownItemRanking = dropdownMenuRanking.querySelectorAll("li");

// 오름차순 내림차순 (내부) 요소 선택
const sortBtn = document.querySelector(".toggle-btn");
const sortSub = document.querySelector(".list-control-bar-content");
const change = document.querySelectorAll(".change");

//===========================================================

// 검색
// 검색창 버튼
const cardSearch = document.querySelector(".card-search");
//===========================================================

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

// 전체 초기화 버튼!
const allDelete = document.querySelector(".all-delete");
const todosList = document.querySelectorAll(".task-list");

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

// ! 요소 만드는 함수
const createTag = (el, className, content = "") => {
  const element = document.createElement(el);
  if (className) element.className = className;
  if (content) element.textContent = content;

  return element;
};

// =============================

// ! timestamp → 날짜 문자열 변환
const nowDate = (timestamp) => {
  const now = new Date(timestamp);
  return `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}. ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

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

  // // 아이콘 생성 함수
  // changeIcon();
};

document.addEventListener("DOMContentLoaded", render);
