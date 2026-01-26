// 여기에 드롭다운 JS 전체
document.addEventListener('DOMContentLoaded', () => {

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

    //  2번재 드롭다운 닫기
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
  // active 추가했어!!!
  dropdownItem.forEach(item => {
    item.addEventListener("click", () => {
      // 전체 선택 해제부분
      dropdownItem.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      selectedValue.textContent = item.textContent;  // 텍스트 변경부분
      // 클래스에 open 있으면 remove (제거) 해라~
      dropdownToggle.classList.remove("open");
    });
  });

  // 항목 클릭 → 글자 변경 + 메뉴 닫기
  // forEach : 모든 요소 하나씩~ (기능 추가하면 한개씩 기능)
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
})

//===============================================================================



//================================================================================================

// 각 영역이 떨어져 있음 (검색 필터기능 부분)
const cardSearch = document.querySelector(".card-search") // 검색 기능박스
const cardList = Array.from(document.querySelectorAll(".task-card")); // 카드 리스트 
const taskText = Array.from(document.querySelectorAll(".task-text")); // 제목 + 내용 (박스)
// const taskDesc = Array.from(document.querySelectorAll(".task-desc"));


cardSearch.addEventListener("input", () => {
  // 검색창 소문자로도 검색하게 끔
  const keyText = cardSearch.value.toLowerCase();
  const filteredTodos = []; // 로컬스토리지 저장할 배열

  // 카드 리스트 검사
  cardList.forEach(card => {
  // 중간 배찌도 검색함...
  const cardTextEl = card.querySelector(".task-text"); // 제목 + 내용만
  const cardText = cardTextEl.innerText.toLowerCase(); // 소문자 검색가능
  //  문자열 안에 특정 글자 있는가 확인(includes)
  if (cardText.includes(keyText)) {
      card.style.display = "block";
      // 배열 객체 추가
      filteredTodos.push({
        id: card.dataset.id,
        text: cardTextEl.innerText
      });
    } else {
      card.style.display = "none";
    }

})
  // 로컬 
  localStorage.setItem("flowdash-todos", JSON.stringify(filteredTodos));
})
//=====================================================================

//=====================================================================
// 전체 초기화 버튼! 
const allDelete = document.querySelector(".all-delete");    
const todosList = document.querySelector(".task-list");

// 기존 flowdash-todos 배열 가져오는데 || 값이 없으면 빈 배열!!
let todos = JSON.parse(localStorage.getItem("flowdash-todos")) || [];

allDelete.addEventListener("click", () => {
    todos = [];  // 배열 초기화
    
    // 로컬 삭제(key 정확히)작성..
    localStorage.removeItem("flowdash-todos") 
    if(todosList) todosList.innerHTML = ""; // 화면부분 
});