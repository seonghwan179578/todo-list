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
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
let mode = "all" // 초기값을 all로 해주어야 처음 todo_list를 열었을 때 모든 리스트가 출력된다
let filterList = []
let tabs = document.querySelectorAll(".task-tabs div")
addButton.addEventListener("click", addTask) // 클릭하면 addTask 함수 실행

// filter(all, not done, done) 클릭에 이벤트를 주는 함수
for(let i=1; i<tabs.length; i++) { // #under-line은 필요없으므로 1부터 시작
    tabs[i].addEventListener("click", function(event){filter(event)})
}


function addTask() {
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    }
    taskList.push(task);
    console.log(taskList);
    render()
}

// UI를 업데이트해주는 역할
function render() {
    let list = []
    if(mode == "all") {
        list = taskList // taskList => 오리지널 리스트
    } else if(mode == "ongoing" || mode == "done") {
        list = filterList
    }


    let resultHTML = ""
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) { // true
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        } else { // false
            resultHTML += ` <div class="task">
        <div>${list[i].taskContent}</div> 
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
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
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    render() // true가 되면서 ui를 업데이트 해주는 역할
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    render() // 값을 업데이트 파면 ui도 반드시 업데이트를 같이 해야 한다
}

function filter(event) {
    mode = event.target.id
    filterList = []

    // 클릭 이벤트 발생시 리스트 bar 이동
    document.getElementById("under-line").style.width = 
        event.target.offsetWidth + "px"
    document.getElementById("under-line").style.top = 
        event.target.offsetTop + event.target.offsetHeight + "px"
    document.getElementById("under-line") .style.left = 
        event.target.offsetLeft + "px"    

    // console.log("filter 클릭댐", event.target.id) // event : 클릭했을 때 모든 상황을 알려주는 게 event. 어떤 아이템을 클릭, 이 이벤트가 어떤 타입인지 등. 어떤 걸 클릭했는지 알고싶으면 target을 이용
    if(mode == "all") {
        render()
    } else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) { // not done만 출력
            if(taskList[i].isComplete == false) { // done이 false 이면, 즉 아직 완료되지 않은(not done) 상태이면
                filterList.push(taskList[i])
            }
        }

        // taskList = filterList // render 함수는 taskList(전체 리스트 = all)를 출력. 여기선 not done만 출력해야 하기 때문에 filterList를 출력하도록 변경 필요
        render()
    } else if(mode == "done") {
        for(i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
        render()
    }

    console.log(filterList)
}    


// 랜덤한 값으로 id 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 5)
}

