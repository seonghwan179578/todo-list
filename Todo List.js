// 유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// 유저가 delete 버튼을 누르면 할 일이 삭제된다
// check 버튼을 누르면 할 일이 끝나면서 취소선이 생긴다
// 1. check 버튼을 클릭하는 순간 false => true(false를 true로 바꿔줌) 
// 2. true이면 끝난 걸로 간주하고 취소선 넣기
// 3. false이면 안 긑난 걸로 간주하고 그대로 두기

// not done 탭을 누르면, 언더바가 이동한다
// done 탭은, 끝난 아이템만, not done 탭은 진행중인 아이템만 나오게 된다
// all 탭을 누르면 다시 전체 아이템으로 돌아옴

// task => 할 일

// 유저가 입력하는 공간
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask); // 클릭하면 addTask 함수 실행

function addTask() {
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

// 유저가 task를 입력하고 +버튼을 누르면 화면에 구현시키는 함수
function render() {
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) { // true
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div> 
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`;
        } else { // false
            resultHTML += ` <div class="task">
        <div>${taskList[i].taskContent}</div> 
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
    </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML
}

// task 완료 여부를 확인
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render(); // true가 되면서 ui를 업데이트 해주는 역할
    console.log(taskList);
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    render(); // 값을 업데이트 파면 ui도 반드시 업데이트를 같이 해야 한다
}

// 랜덤한 값으로 id 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 5)
}

