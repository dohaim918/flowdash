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

// ========= 요소를 만들쟝 ㅎ

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

// SVG 아이콘
const deletBtnSvg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="bi bi-x-lg"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>`;
const dateSvg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="0.5"
      stroke="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="bi bi-calendar-heart"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1m7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
      />
    </svg>`;
const doingSvg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-calendar-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
    </svg>`;
const doneSvg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-calendar-check"
      viewBox="0 0 16 16"
    >
      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
    </svg>`;

// =============================

// todo → li 생성

// !! li 반환하는 함수!!! 나중에 ul에 append 할거!
const createList = (todo) => {
  // & 이거 svg 바꿀때 클래스도 함께 변경해주기 주의!!

  // 전체 list li
  const li = createTag("li", "task-card");
  li.dataset.id = todo.id;

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
  const createDate = (svg, day) => {
    const footer = createTag("div", "task-footer");
    footer.innerHTML = svg;
    const date = createTag("span", "task-date", day);
    footer.append(date);

    return footer;
  };

  // 합치기
  tagWrap.append(tag, deleteBtn);
  text.append(title, Desc);

  // li에 병합

  li.append(tagWrap, text, createDate(dateSvg, todo.createAt));

  // 스테이터스가 던일경우 day = compliteAt
  if (todo.status === "done") {
    li.append(createDate(doneSvg, todo.completeAt));
  } else if (todo.updateAt) {
    li.append(createDate(doingSvg, todo.updateAt));
  }

  return li;
};

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
    total == 0 ? 0 : Math.round((todos.filter((t) => t.status === "done").length / total) * 100) + `%`;
};
