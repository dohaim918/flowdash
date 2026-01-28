// ! empty 상태 토글 함수
//    - 각 리스트에 li 요소가 있는지 확인
//    - empty 비어있을때 문구가 요소 생성되면 "none" 클래스 추가
const toggleEmpty = () => {
  // mainjs - todoListKey = Object.keys(lists); - 상태별 리스트 ul 객체의 키만 배열로 가져옴
  todoListKey.forEach((key) => {
    const ul = lists[key];
    const count = ul.children.length;

    // empty 문구 토글
    const empty = emptyTexts[key];
    count > 0 ? empty.classList.add("none") : empty.classList.remove("none");
  });
};

// =============================

//  카드 DOM 생성 전용 파일
//    - todo 객체 → li 변환
// & ======== 리스트 추가...도전중;;
// *** curId = 현재 아이디 값 내가 클릭한 카드의 아이디 !!!! = IsFix
// *** 널로 해두고 카드를 클릭시 이걸 저장되게!!!

// 상태 각각 배열

// 클릭했을때 데이터 저장
// *** 요소만들고(ㄱㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ)  +모달 리셋함수&렌더(로컬데이터 안에)
//     + 숫자세는거 리스트!!!!!! 그거에 맞춰서바꿔주기

// =========

// todo → li 생성

// !! li 반환하는 함수!!! 나중에 ul에 append 할거!
const createList = (todo) => {
  // & 이거 svg 바꿀때 클래스도 함께 변경해주기 주의!!

  // 전체 list li
  const li = createTag("li", "task-card");
  li.dataset.id = todo.id;
  // done일때 클래스 추가하기 위해 검사
  if (todo.status == "done") {
    li.classList.add("done-list");
  }

  // 중요도 뱃지부분 영역
  const tagWrap = createTag("div", "task-tag-wrap");
  const tag = createTag("span", `task-tag ${todo.priority}`, PRIORITY_TEXT[todo.priority]);
  const deleteBtn = createTag("span", "task-delete-btn");
  deleteBtn.innerHTML = deletBtnSvg;

  // 내용 컨텐츠 부분
  const text = createTag("div", "task-text");
  const title = createTag("h4", "task-title", todo.title);
  const Desc = createTag("p", "task-desc", todo.content);

  //  날짜 생성
  const createDate = (svg, day, name = "todo-time") => {
    const footer = createTag("div", `task-footer ${name}`);
    footer.innerHTML = svg;
    const date = createTag("span", `task-date`, day);
    footer.append(date);

    // console.log(date);
    return footer;
  };

  // 합치기
  tagWrap.append(tag, deleteBtn);
  text.append(title, Desc);

  // li에 병합

  li.append(tagWrap, text, createDate(dateSvg, todo.createAt));

  // 스테이터스가 던일경우 day = compliteAt
  if (todo.status === "done") {
    li.append(createDate(doneSvg, todo.completeAt, "done-time"));
  } else if (todo.updateAt) {
    li.append(createDate(doingSvg, todo.updateAt, "doing-time"));
  }

  return li;
};

// =============================

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

// =============================

// todo 상태별 리스트에 카드 렌더링
const renderTodo = (todo) => {
  const li = createList(todo);
  lists[todo.status].append(li);
};

// ========================

// 통계 계산 함수
const countStatus = (todos) => {
  const total = todos.length;
  statusNums.textContent = total;

  todoNums.forEach((el) => (el.textContent = todos.filter((t) => t.status === "todo").length));
  doingNums.forEach((el) => (el.textContent = todos.filter((t) => t.status === "doing").length));
  doneNums.forEach((el) => (el.textContent = todos.filter((t) => t.status === "done").length));

  percentNums.textContent =
    total == 0
      ? 0
      : Math.round((todos.filter((t) => t.status === "done").length / total) * 100) + `%`;
};
