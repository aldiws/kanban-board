<template>
  <div :class="cssPanel" >    
    <div class="panel-heading">
      <h3 class="panel-title">{{title}}</h3>
    </div>
    <div class="panel-body" v-for="(item, index) in tasks" :key="index">
      <div class="panel panel-default"  >
        <div class="card" >
          <h3>{{item.title}} </h3>          
          <hr>          
          <p> Feature: {{item.feature}}</p>          
          <p> Desc: {{item.desc}}</p>      
          <p v-if="item.status === 0"> Status: Development</p>
          <p v-else-if="item.status === 1"> Status: Testing</p>
          <p v-else-if="item.status === 2"> Status: Deploy </p>
          <p v-else-if="item.status === 3"> Status: Done</p>          
          <div>
            <button :class="beforePanel" @click="backBoard(item['.key'], item.status)" v-if="back">{{btnBack}}</button>
            <button :class="nextPanel" @click="nextBoard(item['.key'], item.status)" v-if="next">{{btnNext}}</button>
            <button class="btn btn-danger btn-xs" @click="deleteBoard(item['.key'], item.status)">DELETE</button>
          </div>
          <br>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['status', 'tasks'],
  data () {
    return {
    }
  },
  methods: {
    nextBoard (id, status) {
      this.$emit('nextBoard', {key: id, stat: status})
    },
    backBoard (id, status) {
      this.$emit('backBoard', {key: id, stat: status})
    },
    deleteBoard (id, status) {
      this.$emit('deleteBoard', {key: id, stat: status})
    },
    status (status) {
      if (status === 0) {
        status = 'develop'
      }
    }
  },
  computed: {
    title () {
      if (this.status === 'stat_0') {
        return 'DEVELOP'
      }
      if (this.status === 'stat_1') {
        return 'TESTING'
      }
      if (this.status === 'stat_2') {
        return 'DEPLOY'
      }
      if (this.status === 'stat_3') {
        return 'DONE'
      }
    },
    cssPanel () {
      if (this.status === 'stat_0') {
        return 'panel panel-primary'
      }
      if (this.status === 'stat_1') {
        return 'panel panel-warning'
      }
      if (this.status === 'stat_2') {
        return 'panel panel-info'
      }
      if (this.status === 'stat_3') {
        return 'panel panel-success'
      }
    },
    beforePanel () {
      if (this.status === 'stat_1') {
        return 'btn btn-primary btn-xs'
      }
      if (this.status === 'stat_2') {
        return 'btn btn-warning btn-xs'
      }
      if (this.status === 'stat_3') {
        return 'btn btn-info btn-xs'
      }
    },
    nextPanel () {
      if (this.status === 'stat_0') {
        return 'btn btn-warning btn-xs'
      }
      if (this.status === 'stat_1') {
        return 'btn btn-info btn-xs'
      }
      if (this.status === 'stat_2') {
        return 'btn btn-success btn-xs'
      }
    },
    btnNext () {
      if (this.status === 'stat_0') {
        return 'TESTING'
      }
      if (this.status === 'stat_1') {
        return 'DEPLOY'
      }
      if (this.status === 'stat_2') {
        return 'DONE'
      }
    },
    btnBack () {
      if (this.status === 'stat_1') {
        return 'DEVELOP'
      }
      if (this.status === 'stat_2') {
        return 'TESTING'
      }
      if (this.status === 'stat_3') {
        return 'DEPLOY'
      }
    },
    next () {
      if (this.status !== 'stat_3') {
        return true
      }
    },
    back () {
      if (this.status !== 'stat_0') {
        return true
      }
    }
  }
}
</script>

<style scoped>
h3 {
  font-size:14px;
   font-weight: bold;
}
h4 {
  color:red;
  font-size:14px;
  font-weight: bold;
}
h5 {
  color:green;
  font-size:14px;  
}

</style>
