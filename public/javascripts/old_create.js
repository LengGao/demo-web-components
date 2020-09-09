/**
 * https://www.cnblogs.com/zytrue/p/8494533.html 自定义HTML
 * 规范自定义名称 x-xx 不规范  tabs, 非规范元素继承 HTMLUnknownElement 规范继承 HTMLElement 
 * registerElemtent('name',option)
 */

$(document).ready(function () {
// 自主定义元素
  var MySelf = document.registerElement('my-self',{
    prototype: Object.create(HTMLElement.prototype,{
      // 生命周期
      createdCallback: {
        value: function () {
          console.log('创建元素实例')
          this.addEventListener('click',function (e) {
            alert('你好,我是MySelf!');
            this.setAttribute('class','start');
          })
        }
      },
      attachedCallback: {
        value: function () {
          console.log('向文档插入实例')
          this.innerHTML = '<p>我是MySelf</p>';
        }
      },
      detachedCallback: {
        value: function () {
          console.log('从文档移除实例');
        }
      },
      attributeChangedCallback: {
        value: function (attName,oldVal,newVal) {
          console.log('增删改查属性时',attName,oldVal,newVal);
        }
      }
    })
  });
  
  // var Obj = {a:"a"}; new Obj(); TypeError: Obj is not a constructor 需要时Class 或者时 function
  var myself = document.createElement('my-self'); // 由于定义提升所以可以率先使用
  console.log(typeof MySelf, 'MySelf是一个Node类',typeof myself, 'myself是一个node对象'); // function  object
  document.body.appendChild(new MySelf()); // 直接使用new
  document.body.appendChild(myself); // 定义提升

  // 自定义内置元素
  var MyButton = document.registerElement('my-button',{
    prototype: Object.create(HTMLButtonElement.prototype, {
      createdCallback: {
        value: function () {
          console.log('创建my-button',)
        }
      },
      attachedCallback: {
        value: function () {
          console.log('创建my-button')
        }
      }
    })
  });
  var mybutton = document.createElement('button','my-button'); // megaButton instanceof MegaButton === true
  document.body.appendChild(mybutton); // 定义提升

// shadow DOM 讲shadow怪哉到My-shadow 以便达到发呢装的目的，其实内置HTML元素也是shadow如input,其本质时div spen 等一些基本元素封装而成 
  var ShaowDom = document.registerElement('my-shadow',{
    prototype: Object.create(HTMLElement.prototype,{
      createdCallback: {
        value: function () {
          console.log('shadow元素创建')
          var shadow = this.createShadowRoot(); // 返回 ShadowRoot。
          var sdtemplate = document.importNode(document.querySelector('#sdtemplate').content,true); // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/importNode  将外部文档的一个节点拷贝一份,然后可以把这个拷贝的节点插入到当前文档中.
          shadow.appendChild(sdtemplate); // 使用模板
        }
      }
    })
  })
  var shadowdom = new ShaowDom();
  document.body.appendChild(shadowdom);
})
