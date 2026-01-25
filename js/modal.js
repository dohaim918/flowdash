// active 추가 + 제거
const priorityBtns = document.querySelectorAll(".priority-btn");

priorityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 기존 active 제거
    priorityBtns.forEach((b) => b.classList.remove("active"));

    // 클릭한 버튼만 active 추가
    btn.classList.add("active");
  });
});

// ==========================================

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

// ! 리스트 닫기
const closeStatus = () => {
  statusSelect.classList.remove("open");
};
// ! open 클래스 토글
const toggleStatus = () => {
  // open 클래스 토글
  statusSelect.classList.toggle("open");
};
// 버튼 클릭 → 리스트 열기/닫기
statusBtn.addEventListener("click", toggleStatus);

// 리스트 항목 클릭 >> 버튼 텍스트 변경 + 리스트 닫기
statusItems.forEach((item) => {
  item.addEventListener("click", () => {
    // !!!!!!!!!!!!!!!!!!!!!추가함 ㅡㅡ 개 너무해
    statusItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    statusValue.textContent = item.textContent; // 버튼 텍스트 변경
    closeStatus();
  });
});

// ======== 모달 닫기 / 열기

// 전체영역
const modal = document.querySelector(".modal-overlay");
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

// 모달 열기/닫기
const toggleModal = () => {
  modal.classList.toggle("open");
  titleInput.focus();
};

// 모달 닫기 (입력값 초기화)
const modalClear = () => {
  titleInput.value = "";
  textareaContent.value = "";
  formGroup.classList.remove("error");

  priorityBtns.forEach((btn, i) => {
    i !== 0 ? btn.classList.remove("active") : btn.classList.add("active");
  });

  statusValue.textContent = "할 일";
  closeStatus();
  // console.log("modalClear 실행됨");
};

// 타이핑 에러
const removeValue = () => {
  const isValue = !titleInput.value.trim();

  formGroup.classList.toggle("error", isValue);

  return !isValue;
};

// 모달 열기/닫기
modalBtn.addEventListener("click", toggleModal);
cancelBtn.addEventListener("click", () => {
  toggleModal();
  // 닫히고 0.3초뒤 초기화
  setTimeout(() => {
    modalClear();
  }, 300);
});

// 타이핑 에러
titleInput.addEventListener("input", removeValue);

// & ======== 리스트 추가...도전중;;
// *** curId = 현재 아이디 값 내가 클릭한 카드의 아이디 !!!!
// *** 널로 해두고 카드를 클릭시 이걸 저장되게!!!

// & 가져오기이~~~~~~~~~~~~~~~ todo
const getTodos = () => {
  const todos = localStorage.getItem("flowdash-todos");
  return todos ? JSON.parse(todos) : [];
};

// 상태 각각 배열

// & 보내기이~~~~~~~~~~~~~~~ todo
const setTodos = (key) => {
  return localStorage.setItem("flowdash-todos", JSON.stringify(key));
};

const saveData = () => {
  const todos = getTodos();

  const isStatus = document.querySelector(".status-list li.active");
  const isPriority = document.querySelector(".priority-btn.active");
  // 객체 변수들... 하 정신 나갈거같아
  // 우선순위 택1 오ㅐ...얘는 클래스 않줬ㅇ....
  const timestamp = Date.now();
  const title = titleInput.value.trim();
  const content = textareaContent.value.trim();
  const status = isStatus ? isStatus.textContent : "할일";
  const priority = isPriority ? isPriority.textContent : "보통";
  const now = new Date();

  // 이거 함수로 바꾸기
  const nowDate = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}. ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const todoObject = {
    id: timestamp, // data- 속성과 연결하기!
    title, // 인풋 제목 값
    content, // 콘텐츠 제목 값
    status,
    priority,
    createdAt: timestamp,
    //  updatedAt: null 카드 수정할때 지금 선택된 스테이 터스 랑 로컬에 저장된 스테이터스와 다를 경우 업데이트
    updatedAt: null,
    completedAt: status === "완료" ? nowDate : null,
  };

  todos.push(todoObject);
  setTodos(todos);
  toggleModal();
};

// ! 요소 만드는 함수
const createTag = (el, className) => {
  const element = document.createElement(el);
  element.className = className;
};
// 요소만들고(ㄱㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ)  +모달 리셋함수&렌더(로컬데이터 안에)
// +숫자세는거 리스트!!!!!! 그거에 맞춰서바꿔주기
addBtn.addEventListener("click", saveData);

const createList = (todo) => {
  // 전체 list li
  const li = document.createElement("li");
  li.className = "task-card";

  li.dataset.id = todo.id;

  // div 테그
  const tagWrap = document.createElement("div");
  tagWrap.className = "task-tag-wrap";
  // span 테그
  const tag = document.createElement("span");
  tag.className = "task-tag-wrap";
};
