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
      // 전체 선택 해제부분
      dropdownItem.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      selectedValue.textContent = item.textContent; // 텍스트 변경부분
      // 클래스에 open 있으면 remove (제거)
      dropdownToggle.classList.remove("open");
    });
  });

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

  // ====================================== 전체 우선순 항목 ==============================================

  dropdownItemRanking.forEach((item) => {
    item.addEventListener("click", () => {
      // 클릭한 항목 텍스트
      // 높음 / 중간 / 낮음 / 전체 우선순
      const clickText = item.textContent.trim();

      // 버튼 텍스트 변경 (버튼 안 텍스트)
      selectedValueRanking.textContent = clickText;

      // 카드 필터 부분 (출력부분)
      const cardList = document.querySelectorAll(".task-card");

      cardList.forEach((card) => {
        const tagEl = card.querySelector(".task-tag");
        const tagText = tagEl ? tagEl.textContent.trim() : "";

<<<<<<< HEAD
          // 버튼 안 || li안 텍스트 같아야지 나오게 아님 숨기기 
          if (clickText === "전체 우선순" || tagText === clickText) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });

        //  카드 반복 끝나고 한 번만 컨트롤바 업뎃 
        updateControlBar(clickText);
      });
    });

    // ===== contral-bar-wrap span 추가/삭제 (배치 추가) =====
    // 공용 함수: controlWrap에 span 추가/제거
    function updateControlBar(text) {
      const controlWrap = document.querySelector(".contral-bar-wrap");
      if (!controlWrap) return;

      // 기존 추가된 span 제거
      const oldSpan = controlWrap.querySelector(".list-control-bar-content.added");
      if (oldSpan) oldSpan.remove();

      // 전체 우선순이면 추가하지 않ㄱㅔ
      if (text !== "전체 우선순") {
        const newTextSpan = document.createElement("span");
        newTextSpan.className = "list-control-bar-content added";
        newTextSpan.textContent = text;
        controlWrap.appendChild(newTextSpan);
      }
    }
     
=======
        // 버튼 안 || li안 텍스트 같아야지 나오게 아님 숨기기
        if (clickText === "전체 우선순" || tagText === clickText) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
>>>>>>> f8872cc9c120f05dbeb97a2b35ba6c3c3e95bd96

  // ====================================== 전체 기간 항목 ==============================================

<<<<<<< HEAD
//===============================================================================
=======
  //===============================================================================

  // 검색창 기능

  cardSearch.addEventListener("input", () => {
    const filterList = Array.from(document.querySelectorAll(".task-card")); // 카드 리스트
    // 변형 되는 부분 / todos 배열 가져오기 (로컬스토리지)
    let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];
    const keyText = cardSearch.value.toLowerCase();
>>>>>>> f8872cc9c120f05dbeb97a2b35ba6c3c3e95bd96

    // 카드 리스트 검사 (화면 렌더링부분임)
    filterList.forEach((card) => {
      // 중간 배찌도 검색해서 특정요소 뽑아서
      const cardTextEl = card.querySelector(".task-text"); // 제목 + 내용만
      const cardText = cardTextEl ? cardTextEl.innerText.toLowerCase().trim() : ""; // 소문자+공백 포함
      //  제목+내용+소문자(toL...)+공배(trim) 포함 특정 키 있나 확인(includes)
      if (cardText.includes(keyText)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  //=====================================================================

  //=====================================================================
  // 전체 초기화 버튼!
  const allDelete = document.querySelector(".all-delete");
  const todosList = document.querySelectorAll(".task-list");

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

<<<<<<< HEAD
=======
// ===== contral-bar-wrap span 추가/삭제 (배치 추가) =====
// 공용 함수: controlWrap에 span 추가/제거
function updateControlBar(text) {
  const controlWrap = document.querySelector(".contral-bar-wrap");
  if (!controlWrap) return;

  // 기존 추가된 span 제거
  const oldSpan = controlWrap.querySelector(".list-control-bar-content.added");
  if (oldSpan) oldSpan.remove();

  // 전체 우선순이면 추가하지 않ㄱㅔ
  if (text !== "전체 우선순") {
    const newTextSpan = document.createElement("span");
    newTextSpan.className = "list-control-bar-content added";
    newTextSpan.textContent = text;
    controlWrap.appendChild(newTextSpan);
  }
}
>>>>>>> f8872cc9c120f05dbeb97a2b35ba6c3c3e95bd96

//============================
//  힌트
// funxtion 우선순위필터(todos, filter) {
//   if (!filter) return todos;
//   return todos.filter(todo => todo.priority === filter값);
// }

//   // 전역 상태 활용??
//   const filterState = {
//     keyword: "",
//     priority: null,
//     sort: null,
//     date: null
//   };

//   // 기간 필터 버튼/드롭다운 등도 동일하게
//   // 예: datePicker.addEventListener("change", ...)

//   // 렌더링

//   // 필터 함수
//   function applyFilter(todos, filter) {
//     let result = todos;
//     result = 우선순위필터(result, filter.priority);
//     result = 검색어필터(result, filter.keyword);
//     result = 기간필터(result, filter.date);
//     result = 정렬(result, filter.sort);
//     return result;
//   }

// });
