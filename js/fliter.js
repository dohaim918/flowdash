// 여기에 드롭다운 JS 전체


    // 요소 리스트 ( 안되면 점 ,"",절차 표시 다시확인 )
    // 첫번째 드롭다운 
  const dropdownToggle = document.querySelector (".dropdown-toggle");
  const dropdownTrigger = dropdownToggle.querySelector (".dropdown-trigger");
  const selectedValue = dropdownTrigger.querySelector (".selected-value");
  const dropdownMenu = dropdownToggle.querySelector (".dropdown-menu")
  const dropdownItem = dropdownMenu.querySelectorAll("li")

    // 두번째 드롭다운
  const dropdownToggleRanking = document.querySelector (".dropdown-toggle.ranking");
  const dropdownTriggerRanking = dropdownToggleRanking.querySelector (".dropdown-trigger.ranking");
  const selectedValueRanking = dropdownTriggerRanking.querySelector (".selected-value.ranking");
  const dropdownMenuRanking = document.querySelector (".dropdown-menu.ranking") // toggle 밖에 있음 (분리)
  const dropdownItemRanking = dropdownMenuRanking.querySelectorAll("li")
 
  // 주의 : 만약 ul li  버튼이 밖이면 document 헷갈리지말기..

  dropdownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();

    // 2번재 드롭다운 닫기
    dropdownToggleRanking.classList.remove("open");
    // 클릭한 드롭다운 열닫기! 
    dropdownToggle.classList.toggle("open");
  });

  //  위에 순서 반대로 한번 더
  dropdownTriggerRanking.addEventListener("click",(e) => {
    e.stopPropagation();  // 위에 전달 막기위해 사용 ( 버튼 클릭 시 위에 문서 올라방지 )
    dropdownToggle.classList.remove("open");
    dropdownToggleRanking.classList.toggle("open");
  });

  // 항목 클릭 → 글자 변경 + 메뉴 닫기
  // forEach : 모든 요소 하나씩~ (기능 추가하면 한개씩 기능)
  // 첫 번째 우선순위
  dropdownItem.forEach(item => {
    item.addEventListener("click", () => {
      // 전체 선택 해제부분
      dropdownItem.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      selectedValue.textContent = item.textContent;  // 텍스트 변경부분
      // 클래스에 open 있으면 remove (제거) 
      dropdownToggle.classList.remove("open");
      
    });
  });

  // 두 번째 랭킹버튼
  dropdownItemRanking.forEach(item => {
    item.addEventListener("click", () => {
      selectedValueRanking.textContent = item.textContent;  // 텍스트 변경부분
      // 클래스에 open 있으면 remove (제거) 해라~
      dropdownToggleRanking.classList.remove("open");
    });
  });

    document.addEventListener("click", (e) => {
    // 클릭한 대상이 드롭다운 안 아니면 닫아라
    // contains : 선택한 부모 요소 안에 내가 ~ 클릭한 요소 있냐를 확인시켜주는거임
       if (!dropdownToggle.contains(e.target)){ dropdownToggle.classList.remove("open")}
       if (!dropdownToggleRanking.contains(e.target) ){dropdownToggleRanking.classList.remove("open")}; 
    })
    
    // ====================================== 전체 우선순 항목 ==============================================

      dropdownItemRanking.forEach(item => {
        item.addEventListener("click", () => {

        // 클릭한 항목 텍스트
        // 높음 / 중간 / 낮음 / 전체 우선순
        const clickText = item.textContent.trim(); 

        // 버튼 텍스트 변경 (버튼 안 텍스트)
        selectedValueRanking.textContent = clickText;

        // 카드 필터 부분 (출력부분)
        const cardList = document.querySelectorAll(".task-card");

        cardList.forEach(card => {
          const tagEl = card.querySelector(".task-tag");
          const tagText = tagEl ? tagEl.textContent.trim() : "";

          // 버튼 안 || li안 텍스트 같아야지 나오게 아님 숨기기 
          if (clickText === "전체 우선순" || tagText === clickText) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

// ====================================== 전체 기간 항목 ==============================================



//===============================================================================

//======================================================================================

// 각 영역이 떨어져 있음 (검색 필터기능 부분)
const cardSearch = document.querySelector(".card-search") // 검색 기능박스
const taskText = Array.from(document.querySelectorAll(".task-text")); // 제목 + 내용 (박스)
// const taskDesc = Array.from(document.querySelectorAll(".task-desc"));


cardSearch.addEventListener("input", () => {
  const cardList = Array.from(document.querySelectorAll(".task-card")); // 카드 리스트 
  // 변형 되는 부분 / todos 배열 가져오기 (로컬스토리지)
  let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];
  const keyText = cardSearch.value.toLowerCase();
  
  // 카드 리스트 검사 (화면 렌더링부분임)
  cardList.forEach(card => {
  // 중간 배찌도 검색해서 특정요소 뽑아서 
  const cardTextEl = card.querySelector(".task-text"); // 제목 + 내용만
  const cardText = cardTextEl ? cardTextEl.innerText.toLowerCase().trim() : ""; // 소문자+공백 포함
  //  제목+내용+소문자(toL...)+공배(trim) 포함 특정 키 있나 확인(includes)
  if (cardText.includes(keyText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  })
})

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
     todosList.forEach(list => {
      list.innerHTML = "";
    });
});



// ====================================================================



    