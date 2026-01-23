const newBtn =document.querySelector(".new-btn")
const modal = document.querySelector(".modal-overlay")

// 클릭 시 수정 
const nicknameSpan = document.querySelector(".nickname-name");

// 저장된 닉네임 불러오기
const savedName = localStorage.getItem("flowdash-nickname");
if (savedName) {
  nicknameSpan.textContent = savedName;
}

// 클릭 시 -> input 변환 
function activeInput(){
  const input =document.createElement("input") // 빈요소
  input.type ="text";                          // 동적 생성
  input.value = nicknameSpan.textContent;      
  input.className = "nickname-input";

  //기존 span -> 새로 만든 input 자리 교체 
  nicknameSpan.replaceWith(input);
  input.focus();
  
  //  이벤트 등록
  input.addEventListener("keydown",inputEnter);
  input.addEventListener("blur",inputBlur);
  input.addEventListener("input",inputSize);
  
  inputSize({target:input})
};
  
  // 엔터 누르면 span 돌아옴 
  function inputEnter(e) {
    if (e.key === "Enter") {
      finishEdit(e.target);  // input 전달식 !!!!!  
    } 
  }

  // 포커스 벗어나도 span 돌아오는 
  function inputBlur (e) {
    finishEdit(e.target);
  };

  // 공백 입력 시 기본값으로 돌리기 
  function finishEdit (inputEl){
    const value =inputEl.value.trim() || "Initial Nicknam";

    // 로컬스토리지 저장
    localStorage.setItem("flowdash-nickname",value);

    // 다시 span 바뀌게 
    nicknameSpan.textContent = value;
    inputEl.replaceWith(nicknameSpan);
  }

  // 저장 길이에 따라 폭 조절 
  // >> e.target.value.length -> 글자 수 !!
  function inputSize(e) {
    e.target.style.width = `${e.target.value.length + 1}ch`;
  };
  
  // 클릭 시 input 활성화
  nicknameSpan.addEventListener("click",activeInput);

// =================================================

// 아이콘 랜덤변경
const random = document.querySelectorAll(".nickname-icon");

// 0 이상 1 미만 만들어주니 * 랜덤 이미지 인덱스 번호
const randomIndex = Math.floor(Math.random() * random.length);
random[randomIndex].classList.add("img")


//=================================================

// 시간대별로 메세지 

const nicknameEl = document.querySelector(".nickname");

//  현재 시간 가져오기 
// const now = new Date();
// const hour = now.getHours();  // 0-23

// let message = "";  // 

// if (hour >= 5 && hour < 11) {
//   message = "좋은 아침이에요,";
// } else if (hour >= 11 && hour < 17) {
//   message = "좋은 오후이에요,";
// } else if (hour >= 18 && hour < 22) {
//   message = "좋은 저녁이에요,";
// } else {
//   message = "안녕하세요"
// }

// nicknameEl.textContent = message;