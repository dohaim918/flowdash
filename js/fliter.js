// 여기에 드롭다운 JS 전체
document.addEventListener("DOMContentLoaded", () => {
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
       const periodText = item.textContent.trim();
       filterCardsPeriod(periodText)
    });
  })

  // 두 번째 랭킹버튼
  dropdownItemRanking.forEach((item) => {
    item.addEventListener("click", () => {
      selectedValueRanking.textContent = item.textContent; // 텍스트 변경부분
      // 클래스에 open 있으면 remove (제거) 해라~
      dropdownToggleRanking.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    // 클릭한 대상이 드롭다운 안 아니면 닫아라
    // contains : 선택한 부모 요소 안에 내가 ~ 클릭한 요소 있냐를 확인시켜주는거임
    if (!dropdownToggle.contains(e.target)) {
      dropdownToggle.classList.remove("open");
    }
    if (!dropdownToggleRanking.contains(e.target)) {
      dropdownToggleRanking.classList.remove("open");
    }
 
  });



  function filterCardsPeriod(periodText) {
    const cards = document.querySelectorAll(".task-card");
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const sevenDays = new Date();
    sevenDays.setDate(today.getDate() - 7);

    cards.forEach(card => {
      const dateEl = card.querySelector(".task-date");
      if (!dateEl) return;

      const cardDate = new Date(dateEl.innerText.trim());
      

      if (periodText === "전체") {
        card.style.display = "block";
      } else if (periodText === "오늘") {
        card.style.display = cardDate >= startOfToday ? "block" : "none";
      } else if (periodText === "7일") {
        card.style.display = cardDate >= sevenDays? "block" : "none";
      }
    });                                                           
  }



  // ====================================== 전체 우선순 항목 ==============================================

  // 다시 정리해야함
 dropdownItemRanking.forEach((item) => {
    item.addEventListener("click", () => {
      const clickText = item.textContent.trim();
      selectedValueRanking.textContent = clickText;
 
      const cardList = document.querySelectorAll(".task-card");
      const searchKey = cardSearch.value.toLowerCase().trim();
      
      cardList.forEach((card) => {
      // 제목만 검색
      const titleEl = card.querySelector(".task-text");
      const titleText = titleEl ? titleEl.innerText.toLowerCase().trim() : "";

      const tagText =
        card.querySelector(".task-tag")?.textContent.trim() || "";

      //  검색 조건은 항상 유지
      const matchesSearch = searchKey === "" || titleText.includes(searchKey);

      //  우선순 조건 (전체면 무조건 true)
      const matchesPriority = clickText === "전체 우선순위" || tagText === clickText;

      // 둘 다 만족해야 보이기
      if (matchesSearch && matchesPriority) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
     rankingSpan(clickText);
    });
  });

  function rankingSpan(clickText) {
    const controlWrap = document.querySelector(".contral-bar-wrap");
    if (!controlWrap) return;

    // 우선순위 span만 선택
    const spans = controlWrap.querySelectorAll(".list-control-bar-content.priority");

    spans.forEach((span) => {
      const priority = span.dataset.priority                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ; // data-priority 값
      if (priority === clickText) {
        span.classList.remove("hidden"); // 보여주기
      } else {
        span.classList.add("hidden");    // 숨기기
      }
    });

    // 전체 기간 span은 항상 보여주기
    const periodSpan = controlWrap.querySelector(".list-control-bar-content.period");
    if (periodSpan) periodSpan.classList.remove("hidden");
  }


  // ====================================== 전체 기간 항목 ==============================================


  //===============================================================================
  // 전체 수정 >> 검색 조건과 우선순위 조건 동시작용
  const cardSearch = document.querySelector(".card-search");

  cardSearch.addEventListener("input", () => {
    const cardList = document.querySelectorAll(".task-card");

    const keyText = cardSearch.value.toLowerCase().trim();

    // 현재 선택된 우선순위 버튼 텍스트
    const selectedPriority = selectedValueRanking.textContent.trim();

    cardList.forEach((card) => {
      // 제목 + 내용 
      const cardTextEl = card.querySelector(".task-text");
      const cardText = cardTextEl ? cardTextEl.innerText.toLowerCase().trim() : "";

      // 카드 우선순ㅇ 태그
      const tagText = card.querySelector(".task-tag")?.textContent.trim() || "";

      // 검색 조건
      const matchesSearch = keyText === "" || cardText.includes(keyText);

      // 우선순위 조건
      const matchesPriority = selectedPriority === "전체 우선순위" || tagText === selectedPriority;

      // 둘 다 만족하면 보이게 
      if (matchesSearch && matchesPriority) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // 조건: 검색+우선순 불러오기
    cardSearch.addEventListener("input", () => {
      updateSearchSpan(cardSearch.value.trim());
    });
  });
  
  // ==========================================================================
  // 검색 시 같이 입력과 누르면 삭제 (조건 추가/제거)
  function updateSearchSpan(searchText) {
    const controlWrap = document.querySelector(".contral-bar-wrap");
    if (!controlWrap) return;

    let searchSpan = controlWrap.querySelector(".search-span");

    // span 추가 (검색 시 마지막 추가/제거)
    if (searchText !== "") {
      if (!searchSpan) {
        searchSpan = document.createElement("span");
        searchSpan.className = "list-control-bar-content added search-span";
        controlWrap.appendChild(searchSpan);

        // 클릭하면 검색 초기화
        searchSpan.addEventListener("click", () => {
          const cardSearch = document.querySelector(".card-search");
          cardSearch.value = "";              // 검색창 비우기
          searchSpan.remove();                // span 제거
          cardSearch.dispatchEvent(new Event("input")); //  검색 이벤트 다시 실행해서 카드 복구
        });
      }
      searchSpan.textContent = searchText;
    } else {
      searchSpan?.remove();
    }
      
  }
  //=====================================================================

  //=====================================================================
  // 전체 초기화 버튼!
  // 기존 flowdash-todos 배열 가져오는데 || 값이 없으면 빈 배열!!
  let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];

  allDelete.addEventListener("click", () => {
    todos.splice(0, todos.length);

    // 로컬 스토리지 빈 배열로
    localStorage.setItem("flowdash-todos", JSON.stringify(todos));

    // 화면 부분 초기화!
    todosList.forEach((list) => {
      list.innerHTML = "";
    });
  });

  // ====================================================================

  let isAsc = true; // 오름차순 기본값

  sortBtn.addEventListener("click", () => {
    const toggleText = isAsc ? "내림차순" : "오름차순";
    //  모든 카드 (배열) 전역에 이미 선언에서 안에.
    const taskLists = Array.from(document.querySelectorAll(".task-list"));

    taskLists.forEach((container) => {
      const cardList = Array.from(container.querySelectorAll(".task-card"));

      // 오름차순 / 내림차순 결정 (일반 조건문 아님)
      cardList.sort((a, b) => {
        const textA = a.querySelector(".task-title").textContent.trim();
        const textB = b.querySelector(".task-title").textContent.trim();

        if (textA < textB) return isAsc ? -1 : 1;
        if (textA > textB) return isAsc ? 1 : -1;
        return 0;
      });

      // 정렬된 카드 다시 부모에 붙이는 ( 마지막 자식으로 이동시키기 )
      cardList.forEach((card) => container.appendChild(card));
    });

    // 모든 .change 텍스트 바꾸기
    change.forEach((el) => (el.textContent = toggleText));

    isAsc = !isAsc; // 다음 클릭 때 반대로
  });
});

