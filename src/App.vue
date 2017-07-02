<template>
  <div id="app">
    <date-drop
      date-placeholder="ssss"
      dd-type="date"
      minTime="2015-12-15"
      :ddDefaultValue="time"
      :timeStep = '15'
    ></date-drop>
  </div>
</template>

<script>
import DateDrop from './components/date-drop/index.js';

export default {
  name: 'app',
  data(){
      return {
          time:'2015-12-31'
      }
  },
  components: {
    DateDrop
  }
}
</script>

<style>
  #app{
    margin-left: 200px;
  }
</style>
