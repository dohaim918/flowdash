# 6조 (TODO_404)

> 공통 과제: 칸반 기반 태스크 관리 대시보드  
> 팀원: 김나나, 오나라, 아주나  
> 저장소: [GitHub](https://github.com/링크주소/)
> 배포: [GitHub Pages](https://링크주소)

---

## 0. 프로젝트 개요 (간단 요약)
(※ 공통 과제이므로 1~2문단 이내로 간단히 작성)

본 프로젝트는 공통 요구사항을 기반으로 한  
칸반 형태의 태스크 관리 대시보드 구현 과제이다.

CRUD, 기간 필터, 통계, 테마 및 UX 요소를 포함하며  
팀 단위 협업을 통해 설계 및 구현을 진행했다.

---

## 1. 팀 구성 및 역할 분담 (Team & Roles)

| 이름 | 역할 | 주요 담당 | 비고 |
|----|----|----|----|
| 김도하 | Core Logic / Design | HTML(수정) / 반응형 /  상태 / 카드(+연동) / 스토리지 / 필터 파이프라인 / Todos(통계) ||
| 김신중 | Board UI | 보드 / HTML (메인 + 모달) / 카드 / 모달 / 필터 파이프라인 / 닉네임 / 날짜 | |

- 역할과 디자인은 초기 합의 후 고정
- 공통 스펙 변경은 팀 합의 후 진행

---

## 2. 수행 절차 및 방법 (Process & Strategy)

### 2-1. 진행 순서
1. 요구사항 전체 리뷰 및 필수 / 가산 구분
2. 데이터 모델 및 LocalStorage 키 합의
3. 보드 구조 및 렌더링 전략 결정
4. 필터 / 정렬 / 검색 파이프라인 구현
5. UX / 테마 / 반응형 구현
6. 통합 및 QA

### 2-2. 협업 규칙
- 브랜치 전략: main / dev / feature/*
- PR 단위: 기능 1개 기준
- PR 전 rebase 필수
- 스펙 변경은 dev merge 전까지만 허용

---

## 3. 프로젝트 구조 및 아키텍처

### 3-1. 디렉터리 구조
```
flowdash/
├─ README.md
├─ index.html
├─ css/
│  ├─ reset.css             (resrt.css)
│  ├─ base.css              (style.css : 메인) 
│  ├─ components.css        (delete.css / modal_style.css : 재사용 )
│  ├─ theme.css             (색상변수:다크모드)
│  └─ responsive.css        (쿼리)
└─ js/
   ├─ main.js                (main.js : 이벤트리스너 ,,,)
   ├─ state.js               (deleteTodo.js : 삭제모달 / filter.js : 검색 파이프라인 ) 
   ├─ storage.js             (저장)
   ├─ utils/
   │  └─ date.js               
   └─ ui/                      (icons.js : svg /modal.js : 모달기능 / todoCard.js :)
      ├─ board.js              (dom)
      ├─ card.js               (top.js : 제목,내용,날짜)
      ├─ header.js             (로고버튼프로필)
      └─ stats.js              

       ※ todoCard.js : 카드생성 Ui + Dom + 모달역할 + 통계 
```

### 3-2. 모듈 책임 분리
- state.js: 앱의 단일 상태 관리
- storage.js: LocalStorage IO 전담
- ui/board.js: 보드 단위 렌더링
- ui/card.js: 카드 렌더링 및 이벤트
- utils/date.js: 날짜 계산 유틸

### 3-3. 데이터 흐름
User Action  

→ updateState()  
→ saveToStorage()  
→ renderBoards()  
→ renderStats()

---

## 4. 핵심 설계 결정 사항 (Design Decisions)

- status 기반 보드 분리 → 상태 필터 제거
- 모든 날짜 데이터는 timestamp(number)로 통일
- 검색 → 기간 → 우선순 → 할 일 순서의 고정 파이프라인 적용
- 통계는 기간 필터와 무관하게 전체 Todo 기준으로 계산

---

## 5. 수행 결과 (Implementation Result)

### 5-1. 구현 완료 기능
- CRUD 전 기능
- TODO / DOING / DONE 칸반 보드
- 기간 필터 / 검색 / 정렬
- 통계 대시보드 및 달성률
- 라이트 / 다크 테마
- 인사말 및 닉네임 UX
- 반응형 레이아웃
- DONE 전환 시 completedAt 기록 / 해제 시 초기화 
- 우선순위(HIGH / MID / LOW) 설정 및 수정 
- 필터 적용 순서 유지 (기간 → 정렬 → 검색) 
- 제목/내용 검색 정상 동작 
- 제목 기준 오름차순/내림차순 정렬 
- 통계 대시보드 표시 
- 달성률 계산 -
- 전체 초기화 시 확인 절차 존재 
- 테마 전환 및 LocalStorage 저장 
- 인사말 시간대 표시 
- 닉네임 인라인 수정 및 LocalStorage 저장 
- 새로고침 후 상태 유지 
- 반응형 레이아웃 동작 
- 콘솔 치명적 에러 없음
- 
### 5-2. 요구사항 충족 범위
- 필수 요구사항: 충족
- [O] Todo CRUD 기능이 모두 정상 동작한다 (생성 / 조회 / 수정 / 삭제)
- [O] TODO / DOING / DONE 상태별 칸반 보드가 분리되어 렌더링된다
- [O] status 변경 시 Todo가 즉시 해당 보드로 이동한다
- [O] DONE 전환 시 completedAt이 기록되며, 해제 시 null로 초기화된다
- [O] 우선순위(HIGH / MID / LOW)를 설정 및 수정할 수 있다
- [보류] 기간
  필터(전체 / 오늘 / 7일)가 createdAt 기준으로 동작한다
- [O] 필터 적용 순서(기간 → 정렬 → 검색)가 항상 유지된다
- [O] 제목/내용 기준 검색이 필터 결과 내에서 정상 동작한다
- [O] 제목 기준 오름차순 / 내림차순 정렬이 가능하다
- [O] 통계 대시보드에 전체 / TODO / DOING / DONE / 달성률이 표시된다
- [O] 달성률은 (DONE / 전체) * 100 기준으로 계산된다
- [O] 전체 초기화 시 Todo 데이터만 삭제되며 확인 절차가 존재한다
- [O] 테마(Light / Dark) 전환이 가능하며 LocalStorage에 저장된다
- [O] 인사말이 시간대 기준으로 표시된다
- [O] 닉네임을 인라인으로 수정할 수 있으며 LocalStorage에 저장된다
- [O] 새로고침 후에도 Todo / 테마 / 닉네임 상태가 유지된다
- [O] 반응형 레이아웃이 Mobile / Tablet / Desktop 기준으로 동작한다
- [O] 콘솔에 치명적인 에러가 발생하지 않는다
- 가산 요소: (해당 시 작성)
- [O] 디자인 커스터마이징
- [O] UX 개선 아이디어 적용
- [O] 예외 처리 강화 (빈 상태, 입력 검증 등)
- [O] 추가 기능 구현 (명세 외)
---

## 6. 트러블슈팅 (Troubleshooting)

### 6-1. (문제 제목)
- 증상: 드롭다운 커스텀 X / 정렬이 안됨 
- 원인: option으로 하면 커스텀이랑 정렬이 어렵다.
- 해결: ul il 활용하여 커스텀과 정렬 한번에 해결
- 회고: 

### 6-2. (문제 제목)
- 증상: 
- 원인:
- 해결:
- 회고:

---

## 7. 자체 평가 및 회고 (Self Review)

### 7-1. 잘한 점
- 역할 맡은 분담이 명확하고 부족한 부분 서로 합의하여 해결한 점
- 서로 배려하면서 원활하게 협업한 점

### 7-2. 아쉬운 점
- 통합 시점이 늦어 충돌 해결 시간이 부족했다
- 테스트 케이스를 코드로 남기지 못했다
- 소통 오류가 많아서 충돌

### 7-3. 다음에 개선할 점
- 상태 변경 로직 테스트 자동화
- 드래그 앤 드롭 UX 도입
- 

---

## 8. 실행 방법

Live Server 실행 또는 index.html 직접 실행

---

## 9. 결론

공통 과제를 통해 협업 구조와 상태 관리의 중요성을 체감했으며  
요구사항을 코드 구조로 해석하는 경험을 얻었다.
