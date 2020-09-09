/**
 * https://developer.mozilla.org/zh-CN/docs/Web/Web_Components 新方式定义自定义元素
 * 自定义元素的两种类型
 * 1，自主定制元素：独立元素; 它们不会从内置HTML元素继承。
 * 2，自定义内置元素：这些元素继承自 - 并扩展 - 内置HTML元素
 * window.customElements;
 * customElements.define(name, constructor, options); option 目前只有一个选项 extends 由于实现 自定义内置元素也就是 is = 'xxx'
 * CustomElementRegistry 的get()方法返回以前定义自定义元素的构造函数 name 你想要返回引用的构造函数的自定义元素的名字。
 * CustomElementRegistry接口的upgrade()方法将更新节点子树中所有包含阴影的自定义元素，甚至在它们连接到主文档之前也是如此。root : 待升级的包含阴影的派生元素节点 。如果没有可升级的派生实例，则不会抛出异常。
 *  当一个元素被定义时CustomElementRegistry 中的方法whenDefined() 接口返回  Promise.name 自定义元素的名称,返回 当自定义元素被定义时一个Promise 返回{jsxref("undefined")}}. 如果自定义元素已经被定义，则resolve立即执行。这也就是异步组件的实现
 */
class PopUpInfo extends HTMLElement {
  constructor(){
    super();
    var shadow = this.attachShadow({mode: 'open'});
    var wrapper =  document.createElement('div');
    var icom  = document.createElement('span');
    var info = document.createElement('span');
    var img = document.createElement('img');
    var style = document.createElement('style');
    var div = document.createElement('div');
    var text = this.getAttribute('text'); // 内置元素或扩展内置元素上，自定义属性再定义是需加上data-,所以那时候我们就要获取getAttribute('data-text')
    wrapper.setAttribute('class','wrapper');
    icom.setAttribute('class','icom');
    icom.setAttribute('tabindex',0);
    info.setAttribute('class','info');
    info.textContent = text;
    var imgURL = this.hasAttribute('img') ? this.getAttribute("img"): '';
    img.height = '100';
    img.src = imgURL;
    style.textContent = '.wrapper {' +
                     'position: relative;' +
                  '}' +
                   '.info {' +
                      'font-size: 0.8rem;' +
                    '}' +
                    'img {' +
                      'width: 100px;' +
                    '}' +
                    '.icon:hover + .info, .icon:focus + .info {' +
                      'opacity: 1;' +
                    '}';
    icom.appendChild(img);
    shadow.appendChild(style);
    console.log(style.isConnected); // Returns true if node is connected and false otherwise 是否液晶链接
    shadow.appendChild(wrapper);
    shadow.appendChild(div);
    wrapper.appendChild(icom);
    div.appendChild(info);
  }
} 
customElements.define('popup-info',PopUpInfo);
/* 自定义内置元素 || 扩展内置元素 */
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
    const wcParent = this.parentNode; // 拿父节点
    console.log('parent',this.parentNode,'this',this);
    function countWords(node) {
      const text = node.textContent || node.text;
      return text.split(/\s+/g).length;
    }
    const count = 'Word: ' + countWords(wcParent);
    const shadow = this.attachShadow({mode: 'open'});
    const text = document.createElement('span');
    text.textContent = count;
    shadow.appendChild(text);
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });

/**
 * connectedCallback：当 custom element首次被插入文档DOM时，被调用。
 * disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
 * adoptedCallback：当 custom element被移动到新的文档时，被调用。也就是创建，包括了移动
 * attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
 * 发 attributeChangedCallback()回调函数，你必须监听这个属性。这可以通过定义observedAttributes() get函数来实现，observedAttributes()函数体内包含一个 return语句，返回一个数组，包含了需要监听的属性名称：
 */
class CustomSquare extends HTMLElement {
  static get observedAttributes() {
    console.log("监视中...")
    return ['c','l'];  // 要监听属性的名称数组
  }
  constructor() {
    super();
    // delegatesFocus 当元素被点击或者聚焦时。是否自动聚焦到内部可聚焦元素上
    var shadow = this.attachShadow({mode: 'open',delegatesFocus: true});
    var div = document.createElement('div');
    var style = document.createElement('style');
    var textNode = document.createTextNode('wodiu');
    var input = document.createElement('input');
    input.setAttribute('class','in');
    div.appendChild(textNode);
    div.appendChild(input);
    shadow.appendChild(style);
    shadow.appendChild(div);
  }
  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }
  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }
  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.')
    updateStyle(this);
  }
}
function updateStyle(elem) {
  var shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
  div {
    width: ${elem.getAttribute('l')}px;
    height: ${elem.getAttribute('l')}px;
    background-color: ${elem.getAttribute('c')};
  }
  :focus {
    background-color: #0f0;
  }
  `;
}
customElements.define('custom-square',CustomSquare)

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;
update.disabled = true;
remove.disabled = true;
function  random(min, max) {
  return Math.floor(Math.random() * (max - min +1) +min); // 向下取整
  // return Math.floor(Math.random() * 10);
}

add.onclick = function () {
  square = document.createElement('custom-square');
  square.setAttribute('l','120');
  square.setAttribute('c','green');
  document.querySelector('#lifecycled').appendChild(square);
  add.disabled = true;
  update.disabled = false;
  remove.disabled = false;
}

update.onclick = function () {
  square.setAttribute('l',100);
  //   square.setAttribute('l',random(50,100));
  // square.setAttribute('c',`#${random()}${random()}${random()}`);
  square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
  // updateStyle(square);
}
remove.onclick = function () {
  // document.body.removeChild(square);
  document.querySelector('#lifecycled').removeChild(square);
  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
}

// 使用Slot
window.customElements.define('my-paragraph', class extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('my-paragraph');
    let templateContent = template.content;
    console.log("this",this,'template',template,'templateContent',templateContent)
    // this.appendChild(template.cloneNode(true))
    // var shadowRoot = this.attachShadow({mode: 'open'})
    //     .appendChild(template.cloneNode(true));
    const shadowRoot = this.attachShadow({mode: 'open'})
    .appendChild(templateContent.cloneNode(true));
  }
  connectedCallback() {
    console.log('创建了my-paragraph')
  }
  adoptedCallback() {
    console.log('挂在了my-paragraph')
  }
  disconnectedCallback() {
    console.log('删除了my-paragraph')
  }
  attributeChangedCallback(attName,oldVal, newVal) {
    console.log('改变了属性',attName,oldVal,newVal)
  }
})




