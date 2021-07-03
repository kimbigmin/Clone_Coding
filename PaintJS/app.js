const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context 설정 context는 픽셀에 접근할 수 있도록 해준다. 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth; // or 700 이라고 적자 실제 픽셀 사이즈를 안 주면 글씨가 안그려진다. 
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 기본값 
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 이벤트에 쓰일 메서드들 - 따로 정의하여 이벤드핸들러에 넣음 직접 넣어도 됨 - 가독성 증가
function onMouseMove(event) {
  //console.log(event);       // TIL : 크롬 검사에서 이벤트 목록확인하면 client X,Y
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  //(윈도우 전체 ) 말고 offset X, Y(캔버스 내 위치)의 값을 확인할 수 있다.
  if(!painting) {
    ctx.beginPath();    // path 는 선이다. 마우스를 움직이면 선이 안생기더라도 마우스의 위치를 계속 추적한다. 
    ctx.moveTo(x, y);  // move to --> line to 로 보이지않는 선이 생김 
  } else {
    ctx.lineTo(x, y); // 마우스가 움직이는 내내 발생 
    ctx.stroke();  // 마우스가 움직이는 내내 발생 선을 그리는 메서드 
  }

}


/*function onMouseDown(event) {  //마우스를 클릭하면 그림이 시작 
  //console.log(event);
  painting = true;

}*/  // onMouseMove 만 있으면 된다. why? 

/*function onMouseUp(event) {  // 마우스를 떼면 그림이 중단되고 선을 남김
  stopPainting();
}

function onMouseLeave(event) { // 마우스가 캔버스를 벗어나면 그림이 중단 
  stopPainting();
}
*/

function handleColorClick(event) {
  //console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  //console.log(color);
  ctx.strokeStyle = color;
}
  

function handleRangeChange(event) {
  //console.log(event.target.value);   //크롬 검사에서 target 에 들어가서 value 를 찾아서 넣었다.
  const size = event.target.value;
  ctx.lineWidth = size;

}


function handleModeClick(event) {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}



if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);  // TIL : 캔버스 안에서만 추적가능 mousemove 는 마우스 움직임 
  canvas.addEventListener("mousedown", startPainting);  // TIL : mousedown 은 클릭을 의미 
  canvas.addEventListener("mouseup", stopPainting); // mouseup 은 마우스 클릭을 떼기
  canvas.addEventListener("mouseleave", stopPainting); // mouseleave 는 마우스가 바깥으로 나감을 의미 

}                                                     


//console.log(Array.from(colors));  //Array.from( ) 메서드 object 로 부터 array를 만들어준다. 
if(colors) {
  Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

}

if(range) {
  range.addEventListener("input", handleRangeChange);
}


if(mode) {
  mode.addEventListener("click", handleModeClick);
}