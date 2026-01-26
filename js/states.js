// 통계 데이터 만들기
// const arr = ['a', 'b', 'a', 'c', 'a'];
// const count = arr.reduce((acc, cur) => {
//   acc[cur] = (acc[cur] || 0) + 1;
//   return acc;
// }, {});
// // {a: 3, b: 1, c: 1}
// const gatCountStats = (todos) => {
//   const status = todos.reduce((acc, todo) => {
//     acc[todo.status] = (acc[todo.status] || 0) + 1;
//     return acc;
//   }, {});

//   const total = todos.length;
//   const percent = total === 0 ? 0 : Math.round((status.done / total) * 100);

//   return { ...status, total, percent };
// };

// const renderStatus = (status) => {

//   console.log(cardStatusNums);

//   statusNums.forEach((el) => {
//     const statuskey = el.dataset.num;

//     el.textContent = statuskey == "percent" ? `${status[statuskey]}%` : status[statuskey];
//   });

//   cardStatusNums.forEach((el) => {
//     const cardStatusKey = el.dataset.cardNum;
//     console.log(cardStatusKey);

//     el.textContent = status[cardStatusKey];
//     console.log(status[cardStatusKey]);
//   });
// };
