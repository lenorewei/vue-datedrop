<template>
  <div class="date-drop-date-picker">
    <div :class="[{ 'date-picker-small-hide': type === 'full' }, 'date-drop-date-picker-small']">
      <div class="date-container">
        <div @click="!minDay?onChange('datePrev'):null" class="day-icon-click left">
          <span v-show="!minDay"><Icon symbol="arrowRight" className="day-icon"></Icon></span>
        </div>
        <div class="current-day">
          <transition :name="animationType=='prev'?'change-prev':'change-next'" >
            <span :key="ddDate.date">{{ddDate.date}}</span>
          </transition>
        </div>
        <div @click="!maxDay?onChange('dateNext'):null" class="day-icon-click right">
          <span v-show="!maxDay"><Icon symbol="arrowLeft" className="day-icon"></Icon></span>
        </div>
      </div>
      <div class="current-week">{{ddDate.week}}</div>
    </div>
    <div :class="[{ 'date-picker-full-show': type === 'full' }, 'date-drop-date-picker-full']">
      <div class="date-drop-date-month-container">
        <template v-for="week in currentMonth">
          <div class="date-drop-date-week-container">
            <template v-for="(day,index) in week">
              <span :class="[{ 'current': ddDate.date===day.date && day.dateType === 'current'},{'disabled':day.disabled}, 'day-item']" :style="currentColor(day,index)" @click="day.disabled?null:onChange('choseDate',day)">{{day.date}}</span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Icon from './Icon';
export default {
  components:{
    Icon
  },
  props:{
    ddDate: {
      type:Object,
      default: ''
    },
    type: {
      type: String,
      default: 'small'
    },
    maxDay:null,
    minDay:null,
    maxTime:null,
    minTime:null,
  },
  computed:{
    currentMonth() {
      let rows = [];
      for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 7; j++) {
          let item = this.ddDate.monthArr[7 * i + j];
          let rowItem = {
            date:moment(item.date).date(),
            dateType:item.dateType
          };
          if(this.minTime && moment(item.date).isBefore(moment(new Date(this.minTime)))){
            rowItem.disabled = true;
          }
          if(this.maxTime && moment(item.date).isAfter(moment(new Date(this.maxTime)))){
            rowItem.disabled = true;
          }
          row.push(rowItem);
        }
        rows.push(row)
      }
      return rows;
    },
  },
  methods:{
    onChange(type,date) {
      this.$emit('onChange',type,date)
    },
    currentColor(date,index) {
      let tempColor = '#686666';
      if(date.dateType !== 'current'){
          tempColor = '#CDCDCD'
      }else{
        if(date.disabled){
          tempColor = '#CDCDCD'
        }else {
          index === 0 || index === 6 ? tempColor = '#FF2D34' : null;
          if (date.date === this.ddDate.date) {
            tempColor = '#fff'
          }
        }
      }
      return {color:tempColor};
    }
  }
}
</script>

<style scoped lang="less">
  .date-drop-date-picker{
    border-bottom: 1px solid #F0F0F0;
    transition: all .8s cubic-bezier(1,-.55,.2,1.37);
  }
  .date-drop-date-picker-small{
    max-height: 104px;
    width: 100%;
    overflow: hidden;
    transition: max-height .8s cubic-bezier(1,-.55,.2,1.37);
    &.date-picker-small-hide{
      max-height: 0;
    }
    .date-container{
      height: 75px;
      width: 100%;
      padding: 0 30px;
      font-size: 60px;
      color: #4D4D4D;
      position: relative;
      box-sizing: border-box;
      line-height: 77px;
      text-align: center;
    }
    .current-day{
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      span{
        position: absolute;
        left: 0;
        width: 100%;
      }
    }
    .day-icon-click {
      width: 30px;
      height: 100%;
      position: absolute;
      top: 0;
      cursor: pointer;
      .day-icon {
        width: 22px;
        height: 22px;
        fill: #B7B7B7;
        display: block;
        margin: 30px auto 0 auto;
      }
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
    .current-week{
      width: 100%;
      text-align: center;
      font-size: 18px;
      color: #FF2D34;
    }
  }
  .date-drop-date-picker-full{
    max-height: 0;
    transition: max-height .8s cubic-bezier(1,-.55,.2,1.37);
    overflow: hidden;
    &.date-picker-full-show{
      max-height: 180px;
    }
    .date-drop-date-month-container{
      padding: 6px 7.5px;
      .date-drop-date-week-container{
        height: 28px;
        .day-item{
          width: 14%;
          display: inline-block;
          text-align: center;
          font-size: 12px;
          color: #686666;
          position: relative;
          z-index:1;
          cursor: pointer;
          &.disabled{
            cursor: not-allowed;
          }
          &.current{
            font-size: 14px;
            &:before{
              content: '';
              width: 35px;
              height: 35px;
              position: absolute;
              border-radius: 50%;
              background: #FF2D34;
              z-index: -1;
              top: -7px;
              left: 0;
            }
          }
        }
      }
    }
  }
</style>
