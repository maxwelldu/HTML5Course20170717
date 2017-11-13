#Vue的学习过程
1. 声明式渲染
<div id="app">
  {{ msg }} //渲染变量的值，不能有HTML
  <span v-once>{{ msg }}</span> //渲染变量的值，只渲染一次，后期修改后不改变
  <div v-html="rawHtml"></div> //渲染HTML的元素
  <div v-bind:id="dynamicId"></div>//将dynamicId变量动态的绑定到id属性上
  {{ number + 1 }} //表达式
  {{ ok ? 'YES' : 'NO' }} //三元运算表达式
  {{ message.split('').reverse().join('') }} //表达式
  <div v-bind:id="'list-' + id"></div> //动态绑定值的时候也可以使用表达式, 字符串list-加上id变量

  <!-- 这是语句，不是表达式 -->
  {{ var a = 1 }}
  <!-- 流控制也不会生效，请使用三元表达式 -->
  {{ if (ok) { return message } }}

  <p v-if="seen">Now you see me</p>//if指令，seen为true则插入当前的这个标签，否则当前标签被移除
  <a v-bind:href="url"></a> //动态绑定url变量到href属性
  <a v-on:click="doSomething">//绑定点击事件，事件处理函数是doSomething
  <form v-on:submit.prevent="onSubmit"></form>//绑定提交事件，并阻止默认行为, .prevent是修饰符
  <!-- in mustaches -->
  {{ message | capitalize }}//过滤器,message是变量，capitalize是一个过滤器函数，这个函数返回的值是最终的值
  <!-- in v-bind -->
  <div v-bind:id="rawId | formatId"></div>//rawId是一个变量，formatId是一个过滤器方法
  {{ message | filterA | filterB }}//filterA和filterB都是过滤器
  {{ message | filterA('arg1', arg2) }}//filterA过滤，过滤的时候并传递参数
  <!-- 完整语法 -->
  <a v-bind:href="url"></a>
  <!-- 缩写 -->
  <a :href="url"></a>//相当于v-bind:href
  <!-- 完整语法 -->
  <a v-on:click="doSomething"></a>
  <!-- 缩写 -->
  <a @click="doSomething"></a>//相当于v-on:click

   {{ message.split('').reverse().join('') }} //表达式
   <p>Original message: "{{ message }}"</p> //普通的数据渲染
   <p>Computed reversed message: "{{ reversedMessage }}"</p> //计算属性,计算属性是基于它们的依赖进行缓存的, 使用最多
   <p>Reversed message: "{{ reversedMessage() }}"</p>//总会执行该函数,没有缓存, 使用其次
   <div id="demo">{{ fullName }}</div> //watched属性，并不常用

   <div v-bind:class="{ active: isActive }"></div> //当isActive为正时会添加active样式
   <div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
    </div>//当isActive为真是添加active样式，当hasError为真时添加text-danger样式
    <div v-bind:class="classObject"></div>//classObject的值为{active: isActive, 'text-danger': hasError}
    <div v-bind:class="[activeClass, errorClass]">//表示添加activeClass对应的字符串样式和errorClass对应的字符串样式

    <div v-if="type === 'A'"> A </div>
    <div v-else-if="type === 'B'"> B </div>
    <div v-else-if="type === 'C'"> C </div>
    <div v-else> Not A/B/C </div>

    <h1 v-if="ok">Hello!</h1>//如果ok为真则插入当前标签，否则移除当前标签
    <h1 v-show="ok">Hello!</h1>//如果ok为真则显示(通过display的方式), 否则隐藏

    <li v-for="item in items"> //item是临时的一个别名,items是数组
     {{ item.message }}
    </li>

    <li v-for="(item, index) in items">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>

   <button v-on:click="counter += 1">增加 1</button>//绑定点击事件，直接让counter这个变量自加1
   <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
  <!-- 阻止单击事件冒泡 -->
  <a v-on:click.stop="doThis"></a>//.stop修饰阻止冒泡
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>//阻止默认行为
  <!-- 修饰符可以串联  -->
  <a v-on:click.stop.prevent="doThat"></a>//阻止冒泡和默认行为
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>//阻止默认行为
  <!-- 添加事件侦听器时使用事件捕获模式 -->
  <div v-on:click.capture="doThis">...</div>//只侦听捕获阶段
  <!-- 只当事件在该元素本身（比如不是子元素）触发时触发回调 -->
  <div v-on:click.self="doThat">...</div>
  <!-- 点击事件将只会触发一次 -->
  <a v-on:click.once="doThis"></a>

  <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
  <input v-on:keyup.13="submit">
  <!-- 同上 -->
  <input v-on:keyup.enter="submit">
  <!-- 缩写语法 -->
  <input @keyup.enter="submit">
  // 可以使用 v-on:keyup.f1
  Vue.config.keyCodes.f1 = 112
  <!-- Alt + C -->
  <input @keyup.alt.67="clear">
  <!-- Ctrl + Click -->
  <div @click.ctrl="doSomething">Do something</div>

  <input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>


</div>
//生成一个Vue的实例
var vm = new Vue({
  //绑定DOM元素
  el: '#app',
  //数据
  data: {
    msg: "",
    rawHtml: "<p>这是p</p>",
    classObject: {
     active: true,
     'text-danger': false
    },
    isActive: true,
    hasError: false,
    activeClass: 'active',
    errorClass: 'text-danger'
  },
  //方法的集合
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
    greet: function (event) {
     // `this` 在方法里指当前 Vue 实例
     alert('Hello ' + this.name + '!')
     // `event` 是原生 DOM 事件
     if (event) {
       alert(event.target.tagName)
     }
   }
  },
  //观察属性
  watch: {
    //观察的属性名称  val是当前属性的新值
   firstName: function (val) {
     this.fullName = val + ' ' + this.lastName
   },
   lastName: function (val) {
     this.fullName = this.firstName + ' ' + val
   }
  },
  //生命周期方法
  beforeCreate: function(){ },
  created: function() { },
  beforeMount: function() { },
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  //过滤器集合，里面都是过滤器方法
  filters: {
     capitalize: function (value) {
       if (!value) return ''
       value = value.toString()
       return value.charAt(0).toUpperCase() + value.slice(1)
     }
   },
   //计算属性的集合
 computed: {
   // a computed getter
   reversedMessage: function () {
     // `this` points to the vm instance
     return this.message.split('').reverse().join('')
   },
   reversedMessage: {
     get: function () {
       return this.message.split('').reverse().join('')
     }
   },
   //即有getter也有setter
   fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    //当你给fullName设置值的时候，会调用这个方法，newValue是新的完整的名称
    //比如newValue是"Maxwell Du"
    //比如newValue是"jian xiong wu"
    set: function (newValue) {
      var names = newValue.split(' '); //['Maxwell', 'Du']
      this.firstName = names[0]; //firstName = 'Maxwell'
      this.lastName = names[names.length - 1]; //lastName = 'Du'
    }
  },
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
 },
})
2. 组件系统
	组件里面有且只能有一个根标签
	全局注册：
		<div id="app">
			<zhangmei></zhangmei>
		</div>
		let zhangmei = {
			template: '<div>a</div>'
		}
		Vue.component(
			'zhangmei', zhangmei
		);
		var app = new Vue({
			el: '#app',

		})
	局部注册：
		<div id="app">
			<zhangmei></zhangmei>
		</div>
		let zhangmei = {
			template: '<div>zhangmei</div>'
		}
		var app = new Vue({
			el: '#app',
			components: {
				'zhangmei': zhangmei
			}
		});
	子组件中再加子组件：
		<div id="app">
			<zhangmei></zhangmei>
		</div>
		let changkun = {
			template: '<div>changkun</div>',
		}
		let zhangmei = {
			template: '<div><changkun></changkun>zhangmei</div>'
			components: {
				'changkun': changkun
			}
		}
		var app = new Vue({
			el: '#app',
			components: {
				'zhangmei': zhangmei
			}
		});

3. 客户端路由
4. 状态管理
5. 构建系统

作业：
安装 vue-devtools插件
安装 vue-cli
$ npm i -g vue-cli
$ vue init webpack vue-shop
? Project name (vue-shop)
? Project description (A Vue.js project)
? Author (maxwelldu <dcj3sjt@126.com>)
? Vue build (Use arrow keys)
> Runtime + Compiler: recommended for most users
? Vue build standalone
? Install vue-router? (Y/n) y
? Use ESLint to lint your code? (Y/n) y
? Pick an ESLint preset (Use arrow keys)
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? (Y/n) n
? Setup e2e tests with Nightwatch? (Y/n) n
     cd vue-shop
     npm i
     npm run dev
$ 一定要按一下Ctrl+C 退出当前进程
$ cd vue-shop
$ npm i
