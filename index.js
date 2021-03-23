// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA0KARqaLLPFkTC0Lqwk1Z1dxTb5_iX53E",
    authDomain: "project-6-e5f0e.firebaseapp.com",
    projectId: "project-6-e5f0e",
    storageBucket: "project-6-e5f0e.appspot.com",
    messagingSenderId: "554456985320",
    appId: "1:554456985320:web:54167ed85d4a7a8553a35d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.getElementById('form').addEventListener("submit",(e)=>{
      var task = document.getElementById('task').value;
      var description = document.getElementById("description").value;
      e.preventDefault();
      createTask(task,description);
      form.reset();
  });

  function createTask(taskName,description){

    var task={

        task: taskName,
        description:description
    }
    let db= firebase.firestore().collection("tasks/");
    db.add(task).then(()=>{
        Swal.fire(
            'Good job!',
            'Task Added!',
            'success'
        )
        document.getElementById("cardSection").innerHTML='';
    readTask();
    })
  }

  function readTask(){
      firebase.firestore().collection("tasks").onSnapshot(function(snapshot){
         document.getElementById('cardSection').innerHTML='';
         snapshot.forEach(function(taskValue){
             document.getElementById("cardSection").innerHTML+=`
             <div class="card mb-3">
                <div class="card-body">
                <h5 class="card-title">${taskValue.data().task}</h5>
                <p class="card-text">${taskValue.data().description}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask('${taskValue.id}','${taskValue.data().task}','${taskValue.data().description}')"><i class="fas fa-edit"></i> Edit Task</button>
                <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')"><i class="fas fa-trash-alt"></i> Delete Task</button>
                </div>
                </div>
             `;
         }) 
      })
  }

  function reset(){
      document.getElementById("firstSection").innerHTML=`
      <form class="border p-4 mb-4 " id='form'>

                    <div class="form-group">
                        <label >Task</label>
                        <input type="text" class="form-control" id="task" placeholder="Enter task">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" id='description' placeholder="Description">
                    </div>
                    <button type='submit' id="button1" class="btn btn-success">ADD Task</button>
                    <button style="display: none;" id="button2" class="btn btn-success">Update Task</button>
                    <button style="display: none;" id="button3" class="btn btn-danger">Cancel</button>
                    </form>
      `;
    document.getElementById("form").addEventListener("submit",(e)=>{
        var task = document.getElementById("task").value;
        var description = document.getElementById("description").value;
        e.preventDefault();
        createTask(task,description);
        form.reset();
  });
}
function updateTask(id,name,description){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4 " id='form2'>

                    <div class="form-group">
                        <label >Task</label>
                        <input type="text" class="form-control" id="task" placeholder="Enter task">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" id='description' placeholder="Description">
                    </div>
                    <button style="display: none;" id="button1" class="btn btn-primary">ADD Task</button>
                    <button type="submit" id="button2" class="btn btn-success"><i class="fas fa-sync"></i>Update Task</button>
                    <button style="display: inline-block;" id="button3" class="btn btn-danger">Cancel</button>
                    </form>
    `;
    document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
        updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
    })
   document.getElementById("task").value=name;
   document.getElementById("description").value=description;
    
}

function updateTask2(id,name,description){
    var taskUpdated={
        task:name,
        description:description
    }
    let db= firebase.firestore().collection("tasks").doc(id);
    db.set(taskUpdated).then(()=>{
        Swal.fire(
            'Goob job!',
            'Task Updated',
            'sucess'
        )
    })

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
}

function deleteTask(id){
    firebase.firestore().collection("tasks").doc(id).delete().then(()=>{
        swal.fire(
            'Goob job!',
            'Task Removed!',
            'sucess'
        )
    })
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
}