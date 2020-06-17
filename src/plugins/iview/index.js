import Vue from 'vue'
import { Message } from 'view-design'
import 'view-design/dist/styles/iview.css'

Message.config({
  duration: 2.5
})
Vue.prototype.$Message = Message
