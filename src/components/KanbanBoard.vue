<template>
  <!-- form add data -->
  <div id="board">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-12">
          <img src="../assets/kanban-board.png" class="kanbanlogo" alt="kanbanlogo" @click="inputForm = true, kanbanBoard = false">
          <h2>Click above ICON to ADD Task</h2>
        </div>
      </div>
      <div class="col-md-12">
        <InputTask :showInput="inputForm"
                    :progress="progress"
                    @submitForm="submitForm"
                    @cancel="inputForm = false, kanbanBoard = true">
        </InputTask>
      </div>
    </div>

    <!-- board -->
    <div class="row" v-if="kanbanBoard">
      <div class="col-md-12">
        <div class="col-md-12">
        </div>
        <div class="col-sm-3">
          <Task status="stat_0" :tasks="stat_0" @backBoard="backBoard" @nextBoard="nextBoard" @deleteBoard="deleteBoard"></Task>
        </div>
        <div class="col-sm-3">
          <Task status="stat_1" :tasks="stat_1" @backBoard="backBoard" @nextBoard="nextBoard" @deleteBoard="deleteBoard"></Task>
        </div>
        <div class="col-sm-3">
          <Task status="stat_2" :tasks="stat_2" @backBoard="backBoard" @nextBoard="nextBoard" @deleteBoard="deleteBoard"></Task>
        </div>
        <div class="col-sm-3">
          <Task status="stat_3" :tasks="stat_3" @backBoard="backBoard" @nextBoard="nextBoard" @deleteBoard="deleteBoard"></Task>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Firebase from 'firebase'
import swal from 'sweetalert'
import InputTask from '@/components/InputTask'
import Task from '@/components/Task'

const config = {
  apiKey: 'AIzaSyCUTngrom-0v3SHVtuMnCZvRHI5Q0YTTsA',
  authDomain: 'kanban-board-007.firebaseapp.com',
  databaseURL: 'https://kanban-board-007.firebaseio.com',
  projectId: 'kanban-board-007',
  storageBucket: 'kanban-board-007.appspot.com',
  messagingSenderId: '1098181510023'
}
const app = Firebase.initializeApp(config)
const db = app.database()
const tasksRef = db.ref('tasks')

export default {
  data () {
    return {
      inputForm: false,
      kanbanBoard: true,
      progress: false
    }
  },
  firebase: {
    tasks: tasksRef
  },
  components: {
    InputTask,
    Task
  },
  computed: {
    stat_0 () {
      return this.tasks.filter((task) => task.status === 0)
    },
    stat_1 () {
      return this.tasks.filter((task) => task.status === 1)
    },
    stat_2 () {
      return this.tasks.filter((task) => task.status === 2)
    },
    stat_3 () {
      return this.tasks.filter((task) => task.status === 3)
    }
  },
  methods: {
    nextBoard (data) {
      let status = data.stat + 1
      tasksRef.child(data.key).child('status').set(status)
    },
    backBoard (data) {
      let status = data.stat - 1
      tasksRef.child(data.key).child('status').set(status)
    },
    submitForm (data) {
      this.kanbanBoard = true
      this.inputForm = false
      tasksRef.push(data).then(result => {
        this.progress = true
      })
    },
    deleteBoard (data) {
      tasksRef.child(data.key).remove()
      swal('Yeay', 'Delete Success!', 'success')
    }
  }
}
</script>


<style>
#board {
  padding: 10px;
}
.kanbanlogo {
  width:70px;
  height:70px;
  margin-bottom: 5px;
}

.kanbanlogo:hover {
  cursor: pointer;
}

h2 {
  color:silver;
}

</style>
