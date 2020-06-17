import Vue from 'vue'
import {
  Button, Select, Form, FormItem, Input, Checkbox, MessageBox,

  Container,
  Header,
  Main,
  Aside,

  Radio,
  RadioGroup,
  RadioButton,

  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,

  Badge,

  Row,
  Col,

  Tabs,
  TabPane,

  Tooltip
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Select)

Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)

Vue.use(Badge)

Vue.use(Row)
Vue.use(Col)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.use(Tooltip)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
