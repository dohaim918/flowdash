// 여기에 드롭다운 JS 전체
//  첫번 째 = 전체기간 드롭다운 / 두 번째 = 우선순위 버튼
// 주의 : 만약 ul li  버튼이 밖이면 document
dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();

  // 2번재 드롭다운 닫기
  dropdownToggleRanking.classList.remove("open");
  // 클릭한 드롭다운 열닫기!
  dropdownToggle.classList.toggle("open");
});

//  위에 순서 반대로 한번 더
dropdownTriggerRanking.addEventListener("click", (e) => {
  e.stopPropagation(); // 위에 전달 막기위해 사용 ( 버튼 클릭 시 위에 문서 올라방지 )
  dropdownToggle.classList.remove("open");
  dropdownToggleRanking.classList.toggle("open");
});

// 항목 클릭 → 글자 변경 + 메뉴 닫기
// forEach : 모든 요소 하나씩~ (기능 추가하면 한개씩 기능)
// 첫 번째 우선순위
dropdownItem.forEach((item) => {
  const todos = getTodos();
  item.addEventListener("click", () => {
    //  기존 active 제거
    dropdownItem.forEach((i) => i.classList.remove("active"));

    //  클릭한 버튼만 active
    item.classList.add("active");

    // 선택된 텍스트 span 업데이트
    selectedValue.textContent = item.textContent;

    //  드롭다운 닫기

    dropdownToggle.classList.remove("open");
    // 필터 (조건)부분

    periodBadge(selectedValue.textContent);
    applyFilter(todos, filter);
    render();
  });
});

// 두 번째 랭킹버튼
dropdownItemRanking.forEach((item) => {
  item.addEventListener("click", () => {
    const todos = getTodos();
    const text = item.textContent.trim();
    selectedValueRanking.textContent = text; // 텍스트 변경부분

    // 상태 업데이트 및 필터 실행
    priorityBadge(selectedValueRanking.textContent);
    applyFilter(todos, filter);
    render();

    dropdownToggleRanking.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  // 클릭한 대상이 드롭다운 안 아니면 닫아라
  // contains : 선택한 부모 요소 안에 클릭한 요소 있냐를 확인
  if (!dropdownToggle.contains(e.target)) {
    dropdownToggle.classList.remove("open");
  }
  if (!dropdownToggleRanking.contains(e.target)) {
    dropdownToggleRanking.classList.remove("open");
  }
});

// ===========================

// 이미지에 맞춘 라벨 매핑

const periodBadge = (text) => {
  const dateLi = document.querySelectorAll(".period>li");
  const periodText = document.querySelector(".period>.change");
  const period = document.querySelector(".list-control-bar-content.period");

  dateLi.forEach((li) => {
    if (text !== "전체 기간") {
      period.classList.remove("hidden");
      periodText.textContent = text;
      filter.date = text;
    } else {
      period.classList.add("hidden");
    }
  });
  filter.date = text;
};

const priorityBadge = (text) => {
  const rankingLi = document.querySelectorAll(".ranking>li");
  const priority = document.querySelector(".list-control-bar-content.priority");
  const priorityText = document.querySelector(".priority>.change");
  rankingLi.forEach((li) => {
    if (text !== "전체 우선순위") {
      priority.classList.remove("hidden");
      priorityText.textContent = text;
      filter.priority = text;
    } else {
      priority.classList.add("hidden");
    }
  });
  filter.priority = text;
};

// 필터 초기화 함수
const resetFilter = (type) => {
  if (type === "search") {
    cardSearch.value = "";
    // 현재 상태 저장해둔 객체에 값전달
    filterState.search = "";
  } else if (type === "priority") {
    selectedValueRanking.textContent = "전체 우선순위";
    filterState.priority = "전체 우선순위";
  } else if (type === "period") {
    filterState.period = "전체";
  }
};

// =========\

sortBtn.addEventListener("click", () => {
  const todos = getTodos();
  const ascbtnText = document.querySelector(".toggle-btn>.change");
  const ascFilterText = document.querySelector(".sort>.change");

  filter.sort = filter.sort === "오름차순" ? "내림차순" : "오름차순";
  ascbtnText.textContent = filter.sort;
  ascFilterText.textContent = filter.sort;
  applyFilter(todos, filter.sort);
  render();
});

cardSearch.addEventListener("input", (e) => {
  const todos = getTodos();
  const badge = document.querySelector(".list-control-bar-content.search");
  const badgeText = document.querySelector(".list-control-bar-content.search>.change");
  filter.keyword = e.target.value.trim();

  if (filter.keyword) {
    badge.classList.remove("hidden");
    badgeText.textContent = filter.keyword;
  } else {
    badge.classList.add("hidden");
  }
  applyFilter(todos, filter);
  render();
});

// ================================================

function datefilter(todos, filters) {
  if (!filters || filters === "전체 기간") return todos;
  const today = new Date();
  const todayStart = today.setHours(0, 0, 0, 0); // 오늘기준의 자정00시00분00초00밀리초
  if (filters === "오늘") {
    // 데이터가 문자열 - Date 객체로 변환 후 비교
    return todos.filter((todo) => new Date(todo.createAt) >= todayStart);
  } else {
    const sevenDaysStart = new Date(todayStart);
    sevenDaysStart.setDate(sevenDaysStart.getDate() - 7);

    return todos.filter((todo) => new Date(todo.createAt) >= sevenDaysStart.getTime());
  }
}

function priorityfilter(todos, filters) {
  if (!filters || filters === "전체 우선순위") return todos;

  if (filters === "높음") {
    return todos.filter((todo) => todo.priority === "high");
  } else if (filters === "중간") {
    return todos.filter((todo) => todo.priority === "mid");
  } else {
    return todos.filter((todo) => todo.priority === "low");
  }
}

function sortfilter(todos, filters) {
  return filters === "오름차순"
    ? todos.sort((a, b) => {
        return a.title.localeCompare(b.title, "ko", {
          numeric: true,
          sensitivity: "base",
        });
      })
    : todos.sort((a, b) => {
        return b.title.localeCompare(a.title, "ko", {
          numeric: true,
          sensitivity: "base",
        });
      });
}

function searchfilter(todos, keyword = "") {
  if (!keyword?.trim()) return todos;

  return todos.filter((todo) => todo.title.includes(keyword) || todo.content.includes(keyword));
}

function applyFilter(todos, filter) {
  let result = todos;

  result = datefilter(result, filter.date);
  console.log(result);
  result = priorityfilter(result, filter.priority);
  console.log(result);
  result = sortfilter(result, filter.sort);
  console.log(result);
  result = searchfilter(result, filter.keyword);
  console.log(result);

  return result;
}

function listNumbers(filterList) {
  const statusElements = {
    todo: document.querySelector(".todo-number.todo"),
    doing: document.querySelector(".progress-number.doing"),
    done: document.querySelector(".done-number.done"),
  };

  todoListKey.forEach((st) => {
    const count = filterList.filter((to) => to.status === st).length;
    console.log(count);
    // DOM 요소가 존재한다면 텍스트 업데이트
    if (statusElements[st]) {
      statusElements[st].textContent = count;
    }
  });
}

// 뱃지 클릭 시 삭제
// 전체 기간
const perioBadgeEl = document.querySelector(".list-control-bar-content.period");
// 우선 순위
const prioBadgeEl = document.querySelector(".list-control-bar-content.priority");
// 검색어
const searchBadgeEl = document.querySelector(".list-control-bar-content.search");

perioBadgeEl.addEventListener("click", () => {
  filter.date = "전체 우선순위";
  selectedValueRanking.textcontent = "전체기간";
  perioBadgeEl.classList.add("hidden");

  render();
});

prioBadgeEl.addEventListener("click", () => {
  filter.priority = "전체 우선순위";
  selectedValueRanking.textcontent = "전체 우선순위";
  prioBadgeEl.classList.add("hidden");

  render();
});

searchBadgeEl.addEventListener("click", () => {
  filter.keyword = "";
  cardSearch.value = "";
  searchBadgeEl.classList.add("hidden");

  render();
});
