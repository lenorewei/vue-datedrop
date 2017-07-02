/**
 * Created by weirong on 2017/3/23.
 */
import DateDrop from './src/DateDrop';

/* istanbul ignore next */
DateDrop.install = function(Vue) {
  Vue.component(DateDrop.name, DateDrop);
};

export default DateDrop;
