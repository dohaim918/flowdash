
// active 추가 + 제거
const priorityBtns = document.querySelectorAll('.priority-btn');

priorityBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 기존 active 제거
    priorityBtns.forEach(b => b.classList.remove('active'));

    // 클릭한 버튼만 active 추가
    btn.classList.add('active');
  });
});


// 요소 선택 (버튼드롭 리스트)
const statusSelect = document.querySelector('.status-select');
const statusBtn = statusSelect.querySelector('.status-bth');
const statusList = statusSelect.querySelector('.status-list');
const statusItems = statusList.querySelectorAll('li');

// 버튼 클릭 → 리스트 열기/닫기
statusBtn.addEventListener('click', () => {
// open 클래스 토글
  statusSelect.classList.toggle('open'); 
});

// 리스트 항목 클릭 >> 버튼 텍스트 변경 + 리스트 닫기
statusItems.forEach(item => {
  item.addEventListener('click', () => {
    statusBtn.textContent = item.textContent; // 버튼 텍스트 변경
    statusSelect.classList.remove('open');    // 리스트 닫기
  });
});

