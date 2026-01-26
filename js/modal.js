//  우선순위 버튼

priorityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 기존 active 제거
    priorityBtns.forEach((b) => b.classList.remove("active"));

    // 클릭한 버튼만 active 추가
    btn.classList.add("active");
  });
});

// =============================

//  상태 드롭다운

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
    // 닫기
    statusSelect.classList.remove("open");
  });
});

// =============================

// ======== 모달 닫기 / 열기

// 모달 열기/닫기
const toggleModal = () => {
  modal.classList.toggle("open");

  titleInput.focus();
};
// =============================

//  모달 초기화 (새 할 일 기준)
// 모달 닫기 (입력값 초기화)
const modalClear = () => {
  titleInput.value = "";
  textareaContent.value = "";
  formGroup.classList.remove("error");

  priorityBtns.forEach((btn, i) => {
    // i !== 0 ? btn.classList.remove("active") : btn.classList.add("active");
    btn.classList.toggle("active", i === 0);
  });
  statusItems.forEach((li, i) => {
    // i !== 0 ? li.classList.remove("active") : li.classList.add("active");
    li.classList.toggle("active", i === 0);
  });
  // statusValue.textContent = statusItems[0].textContent;
  // console.log("modalClear 실행됨");
  IsFix = null;
  modalname.textContent = "새 할 일";
};

// =============================

// 타이핑 에러 (제목 입력값 검증)
const removeValue = () => {
  const isValue = !titleInput.value.trim();

  formGroup.classList.toggle("error", isValue);

  return !isValue;
};

// =============================

// 모달 버튼 이벤트

// 모달 열기/닫기
modalBtn.addEventListener("click", () => {
  toggleModal();
  modalClear();
});
cancelBtn.addEventListener("click", () => {
  toggleModal();
  setTimeout(modalClear, 300);
});

// 타이핑 에러
titleInput.addEventListener("input", removeValue);

// =========================

// Todo 데이터 생성 & 저장
const saveData = () => {
  const todos = getTodos();

  const isStatus = document.querySelector(".status-list li.active");
  const isPriority = document.querySelector(".priority-btn.active");
  // 객체 변수들... 하 정신 나갈거같아
  // 우선순위 택1 오ㅐ...얘는 클래스 않줬ㅇ....
  const timeStamp = Date.now();
  const istitle = removeValue();
  // if (!title) return;
  if (!istitle) return;
  const title = titleInput.value.trim();

  const content = textareaContent.value.trim();
  const status = isStatus ? isStatus.dataset.state : "todo";
  const priority = isPriority ? isPriority.dataset.prio : "mid";

  // 있으면 값을꺼내서 수정
  if (IsFix) {
    const todoObj = todos.find((todo) => todo.id == IsFix);
    todoObj.title = title;
    todoObj.content = content;
    todoObj.priority = priority;
    todoObj.status = status;
    todoObj.updateAt = nowDate(timeStamp);
    todoObj.completeAt = status === "done" ? nowDate(timeStamp) : null;

    IsFix = null;
  } else {
    // todo 객체 생성
    const todoObject = {
      id: timeStamp, // data- 속성과 연결하기!
      title, // 인풋 제목 값
      content, // 콘텐츠 제목 값
      status,
      priority,
      createAt: nowDate(timeStamp),
      //  updateAt: null 카드 수정할때 지금 선택된 스테이 터스 랑 로컬에 저장된 스테이터스와 다를 경우 업데이트
      updateAt: null,
      completeAt: status === "done" ? nowDate(timeStamp) : null,
    };

    // 저장 하기
    todos.push(todoObject);
  }

  // 모달 닫기 + 초기화
  setTodos(todos);
  toggleModal();

  // 화면에 추가
  render();
};

// 각 카드에 클릭이벤트를 만들고 클릭된 함수는 각각클릭했을때??
addBtn.addEventListener("click", saveData);
