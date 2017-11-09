import generateLunarCalendar from './generate-lunar-calendar';

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world',
  },
  methods: {
    handleGenerateLunarCalendar: () => {
      window.open( "data:text/calendar;charset=utf8," + escape(generateLunarCalendar()));
    }
  }
});
