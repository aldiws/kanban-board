<template>
<transition name="fade" v-if="showInput">
  <div id="form-task" v-if="showInput">
      <form class="form-horizontal" @submit.prevent="createtask('formNewTask')" ref="formNewTask">
        <fieldset>
          <div class="form-group">
            <label for="inputTitle" class="col-md-4 control-label">Title</label>
            <div class="col-md-4">
              <input class="form-control" id="inputTitle" placeholder="Title" type="text" v-model="task.title">
            </div>
          </div>
          <div class="form-group">
            <label for="inputAssing" class="col-md-4 control-label">Feature</label>
            <div class="col-md-4">
              <input class="form-control" id="inputAssig" placeholder="Feature" type="text" v-model="task.feature">
            </div>
          </div>
          <div class="form-group">
            <label for="textArea" class="col-md-4 control-label">Description</label>
            <div class="col-md-4">
              <textarea class="form-control" rows="2" id="textArea" v-model="task.desc" placeholder="Task Short Description"></textarea>              
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-4 col-md-offset-4">
              <button type="reset" class="btn btn-default" @click="cancelAction">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </transition>
</template>

<script>

export default {
  props: ['showInput', 'progress'],
  data () {
    return {
      task: {
        title: null,
        desc: null,
        feature: null,
        status: 0
      }
    }
  },
  watch: {
    progress: function (newvalue) {
    }
  },
  methods: {
    clearData () {
      this.task.title = null
      this.task.desc = null
      this.task.feature = null
      this.task.status = 0
    },
    createtask (name) {
      this.$emit('submitForm', this.task)
      this.clearData()
    },
    cancelAction () {
      this.$emit('cancel')
      this.clearData()
    }
  }
}
</script>

<style>
#form-task {
  margin: 10px;
}
.fade-enter-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
