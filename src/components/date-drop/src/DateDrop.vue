<template>
  <div class="date-drop-container" :style="{width:ddWidth+'px'}">
    <Icon symbol="calendar" className="input-icon"></Icon>
    <input type="text" readonly class="date-drop-Input" :placeholder='ddPlaceholder' :value="dateDropValue"
           @click.stop.prevent="inputFocus"/>
    <transition name="date-drop">
    <div :class="[{ 'date-drop-picker-full': ddDateType=='full' },{'date-drop-picker-withTime':ddType=='dateTimeFull'||ddType=='dateTime'},'date-drop-picker']" v-if="ddShow"
         v-click-outside="closePicker">
        <MonthPicker
          :ddMonth="dateDropMonth"
          @onChange="monthChange"
          :type="ddDateType"
          :maxMonth = "maxTime?contMax('months'):false"
          :minMonth = "minTime?contMin('months'):false"
        >
        </MonthPicker>
        <DatePicker
          :ddDate="dateDropDate"
          @onChange="dateChange"
          :type="ddDateType"
          :maxDay = "maxTime?contMax('days'):false"
          :minDay = "minTime?contMin('days'):false"
          :maxTime='maxTime||false'
          :minTime = 'minTime||false'
        >
        </DatePicker>
        <template v-if="ddType=='dateTimeFull'||ddType=='dateTime'">
          <TimePicker
            :ddHour="dateDropHour"
            :ddMin="dateDropMin"
            @onHourChange="hourChange"
            @onMinChange="minChange"
            :maxHour = "maxTime?contMax('hours'):false"
            :minHour = "minTime?contMin('hours'):false"
            :maxMin = "maxTime?contMax('minutes'):false"
            :minMin = "minTime?contMin('minutes'):false"
          >
          </TimePicker>
        </template>
        <YearPicker
          :ddYear="dateDropYear"
          @onChange="yearChange"
          :type="ddDateType"
          :maxYear = "maxTime?contMax('years'):false"
          :minYear = "minTime?contMin('years'):false"
        >
        </YearPicker>
        <div :class="[{ 'date-drop-footer-full': ddDateType=='full' }, 'date-drop-footer']">
          <div class="select-button" @click="closePicker">
            <Icon symbol="correct" className="select-icon"></Icon>
          </div>
          <div class="change-type" @click="changeType">
            <Icon symbol="spreadOut" class="change-type-icon" v-show="ddDateType=='small'"></Icon>
            <Icon symbol="contract" class="change-type-icon" v-show="ddDateType=='full'"></Icon>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import moment from 'moment';
  import MonthPicker from './MonthPicker';
  import DatePicker from './DatePicker';
  import YearPicker from './YearPicker';
  import TimePicker from './TimePicker';
  import Icon from './Icon';

  import {onThis, offThis, isOutside} from '../../../utils/dom.js';

  let judgeOutside = (el, fuc, e) => {
    if (e && !(el === e.target || el.contains(e.target))) {
      fuc(e);
    }
  };
  let countMonthArr = (date) => {
    let currentTime = moment(date), prevMonth = moment(date).subtract(1, 'months'),
      nextMonth = moment(date).add(1, 'months');
    let prevDays = moment().year(currentTime.year()).date(1).month(currentTime.month()).day();
    if (!prevDays) {
      prevDays = 7;
    }
    let daysArr = [];
    for (let i = 0; i < prevDays; i++) {
      let dayDate = prevMonth;
      dayDate.date(prevMonth.daysInMonth() - prevDays + 1 + i);
      daysArr.push({date: dayDate.format("YYYY-MM-DD HH:mm"), dateType: 'prev'})
    }
    for (let i = 0; i < currentTime.daysInMonth(); i++) {
      let dayDate = currentTime;
      dayDate.date(i + 1);
      daysArr.push({date: dayDate.format("YYYY-MM-DD HH:mm"), dateType: 'current'})
    }
    for (let i = 0; i < 42 - prevDays - currentTime.daysInMonth(); i++) {
      let dayDate = nextMonth;
      dayDate.date(i + 1);
      daysArr.push({date: dayDate.format("YYYY-MM-DD HH:mm"), dateType: 'next'})
    }
    return daysArr;
  };
  moment.locale('zh-cn');
  export default {
    name: 'date-drop',
    components: {
      MonthPicker,
      DatePicker,
      YearPicker,
      TimePicker,
      Icon
    },
    props: {
      ddPlaceholder: {
        type: String,
        default: ''
      },
      ddDefaultValue: {
        type: String,
        validator: function (value) {
          return !(Object.prototype.toString.call(new Date(value)) === "[object Date]" && isNaN(new Date(value)));
        },
      },
      ddType: {
        type: String,
        default: 'date'
      },
      ddWidth: {
        type: [String, Number],
        default: '180'
      },
      timeStep:{
        type: [Number],
        default: 1
      },
      maxTime: {
        type: String,
        validator: function (value) {
          return !(Object.prototype.toString.call(new Date(value)) === "[object Date]" && isNaN(new Date(value)));
        },
      },
      minTime: {
        type: String,
        validator: function (value) {
          return !(Object.prototype.toString.call(new Date(value)) === "[object Date]" && isNaN(new Date(value)));
        },
      },
    },
    computed: {
      dateDropValue() {
        let tempValue = '';
        let tempMin;
        if (this.ddCurrentValue !== '') {
          let thisDate = moment(this.ddCurrentValue);
          switch (this.ddType) {
            case 'date':
              tempValue = thisDate.format("YYYY-MM-DD");
              break;
            case 'dateTime':
            	tempMin = thisDate.minute();
              if(tempMin % this.timeStep !== 0){
                thisDate.minute((tempMin-(tempMin%this.timeStep))+this.timeStep)
              }
              tempValue = thisDate.format("YYYY-MM-DD HH:mm");
              break;
            case 'dateTimeFull':
              tempMin = thisDate.minute();
              if(tempMin % this.timeStep !== 0){
                thisDate.minute((tempMin-(tempMin%this.timeStep))+this.timeStep)
              }
              tempValue = thisDate.format("YYYY-MM-DD HH:mm");
              break;
            default:
              tempValue = thisDate.format("YYYY-MM-DD");
          }
        }
        return (
          tempValue
        )
      },
      dateDropMonth() {
        return moment.months(moment(this.ddCurrentValue).month());
      },
      dateDropDate(){
        return {
          date: moment(this.ddCurrentValue).date(),
          week: moment(this.ddCurrentValue).format('dddd'),
          monthArr: countMonthArr(this.ddCurrentValue)
        };
      },
      dateDropYear(){
        return moment(this.ddCurrentValue).year();
      },
      dateDropHour(){
        return moment(this.ddCurrentValue).hour();
      },
      dateDropMin(){
        return moment(this.ddCurrentValue).minute();
      },
    },
    data(){
      return {
        ddCurrentValue: typeof this.ddDefaultValue === 'undefined'?'':moment(new Date(this.ddDefaultValue).toISOString()).format(),
        ddShow: false,
        ddDateType: this.ddType === ('dateTimeFull' || 'dateFull') ? 'full' : 'small'
      }
    },
    methods: {
      inputFocus() {
        this.ddShow = true;
        if(this.ddCurrentValue === ''){
          this.ddCurrentValue = moment().format();
        }
      },
      contMin(type){
        let interval = 1;
        if(type === 'minutes'){
          interval = this.timeStep;
        }
        return moment(this.ddCurrentValue).subtract(interval,type).isBefore(moment(new Date(this.minTime).toISOString()));
      },
      contMax(type){
        let interval = 1;
        if(type === 'minutes'){
          interval = this.timeStep;
        }
        if(type === 'days'){
          interval = 2;
        }
        return moment(this.ddCurrentValue).add(interval,type).isAfter(moment(new Date(this.maxTime).toISOString()));
      },
      closePicker() {
        this.ddShow = false;
        this.ddDateType = this.ddType === ('dateTimeFull' || 'dateFull') ? 'full' : 'small';
      },
      monthChange(type) {
        type === 'prev' ?
          this.ddCurrentValue = moment(this.ddCurrentValue).subtract(1, 'months').format() :
          this.ddCurrentValue = moment(this.ddCurrentValue).add(1, 'months').format();
        this.$emit('onMonthChange', moment(this.ddCurrentValue).month())
      },
      dateChange(type, date) {
        switch (type) {
          case 'dateNext':
            this.ddCurrentValue = moment(this.ddCurrentValue).add(1, 'days').format();
            break;
          case 'datePrev':
            this.ddCurrentValue = moment(this.ddCurrentValue).subtract(1, 'days').format();
            break;
          case 'choseDate':
            if (date.dateType === 'current') {
              this.ddCurrentValue = moment(this.ddCurrentValue).date(date.date).format();
            } else if (date.dateType === 'prev') {
              this.ddCurrentValue = moment(this.ddCurrentValue).subtract(1, 'months').date(date.date).format();
            } else if (date.dateType === 'next') {
              this.ddCurrentValue = moment(this.ddCurrentValue).add(1, 'months').date(date.date).format();
            }
            break;
        }
        this.$emit('onDateChange', moment(this.ddCurrentValue).date())
      },
      changeType(){
        this.ddDateType = (this.ddDateType === 'small' ? 'full' : 'small');
      },
      yearChange(type) {
        type === 'prev' ?
          this.ddCurrentValue = moment(this.ddCurrentValue).subtract(1, 'years').format() :
          this.ddCurrentValue = moment(this.ddCurrentValue).add(1, 'years').format();
        this.$emit('onYearChange', moment(this.ddCurrentValue).year())
      },
      hourChange(type) {
        type === 'prev' ?
          this.ddCurrentValue = moment(this.ddCurrentValue).subtract(1, 'hours').format() :
          this.ddCurrentValue = moment(this.ddCurrentValue).add(1, 'hours').format();
        this.$emit('onHourChange', moment(this.ddCurrentValue).hour())
      },
      minChange(type) {
        type === 'prev' ?
          this.ddCurrentValue = moment(this.ddCurrentValue).subtract(this.timeStep, 'minutes').format() :
          this.ddCurrentValue = moment(this.ddCurrentValue).add(this.timeStep, 'minutes').format();
        this.$emit('onMinChange', moment(this.ddCurrentValue).minute())
      }
    },
    directives: {
      clickOutside: {
        bind(el, binding, vnode) {
          window.fuc = (e) => {
            judgeOutside(el, vnode.context[binding.expression], e)
          };
          onThis('click', window.fuc);
        },
        unbind() {
          offThis('click', window.fuc);
        },
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .date-drop-container {
    position: relative;
    .date-drop-Input {
      height: 40px;
      width: 100%;
      padding: 0 10px 0 30px;
      font-size: 14px;
      border: 1px solid #7C7C7C;
      border-radius: 5px;
      line-height: 40px;
      box-sizing: border-box;
    }
    .input-icon {
      width: 15px;
      height: 40px;
      position: absolute;
      left: 10px;
      fill: #CCCCCC
    }
    .date-drop-picker {
      width: 140px;
      height: 240px;
      position: absolute;
      left: 50%;
      margin-left: -70px;
      margin-top: 8px;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.21);
      transition: all .8s cubic-bezier(1,-.55,.2,1.37);
      &:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background: #FF2D34;
        position: absolute;
        left: 50%;
        top: -8px;
        transform: rotate(45deg);
        margin-left: -10px;
        border-radius: 3px;
      }
      &.date-drop-picker-withTime{
        height: 320px;
      }
      &.date-drop-picker-full {
        width: 260px;
        height: 370px;
        margin-left: -130px;
        &.date-drop-picker-withTime{
          height: 450px;
        }
      }
    }

    .date-drop-footer {
      position: relative;
      .select-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FF2D34;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
        margin: 0 auto;
        cursor: pointer;
        transition: all .8s cubic-bezier(1,-.55,.2,1.37);
      }
      .select-icon {
        width: 23px;
        height: 40px;
        margin: 0 auto;
        fill: #fff;
        display: block;
        transition: all .8s cubic-bezier(1,-.55,.2,1.37);
      }
      .change-type {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        background: #F1F1F1;
        position: absolute;
        bottom: 5px;
        right: 10px;
        cursor: pointer;
        &:hover{
          background: #FFF;
          box-shadow: 0 0 32px rgba(0,0,0,.1);
          transform: scale(1.2);
          transition: all .2s ease;
        }
        .change-type-icon {
          fill: #FF2D34;
          width: 15px;
          height: 25px;
          display: block;
          margin: 0 auto;
        }
      }
      &.date-drop-footer-full {
        .select-button {
          width: 50px;
          height: 50px;
          margin-top: 5px;
          .select-icon {
            width: 28px;
            height: 50px;
          }
        }
      }
    }
  }
  .date-drop-picker.date-drop-enter,.date-drop-picker.date-drop-leave-active{
    opacity: 0;
    transform: translateY(-10px);
  }
  .date-drop-picker.date-drop-enter-active{
    transition: all .3s ease;
  }
  .date-drop-picker.date-drop-leave-active{
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>

<style lang="less">
  .change-prev-enter{
    left:-100% !important;
  }
  .change-prev-enter-active{
    transition: all .3s ease-in;
  }
  .change-prev-leave-active{
    left:100% !important;
    transition: all .3s ease-in;
  }
  .change-next-enter{
    left:100% !important;
  }
  .change-next-enter-active{
    transition: all .3s ease-in;
  }
  .change-next-leave-active{
    left:-100% !important;
    transition: all .3s ease-in;
  }
</style>
