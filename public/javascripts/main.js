

// class PopUpInfo extends HTMLElement {
//   constructor () {
//     super();
//     const shadow = this.attachShadow({mode: 'open'});
//     const wrapper = document.createElement('span');
//     const icom = document.createElement('span');
//     const info = document.createElement('span');
//     wrapper.setAttribute('class','wrapper');;
//     icom.setAttribute('class','icom');
//     icom.setAttribute('tabindex',0);
//     info.setAttribute('class','info');
//     // var text = this.getAttribute('text');
//     const text = this.getAttribute('text'); //新Web规范规定自定义属性前面需要加data-, 但是我们这里没有用data- 所以直接text
//     console.log('text',text)
//     info.textContent = text;
//     //  由于是内部脚本而不是通过stc属性引入的,所以 Boolean  defer 属性不起作用，所以页面的text属性获取不到, 
//     let imgURL;
//     if(this.hasAttribute('img')) {
//       imgURL = this.getAttribute('img');
//     } else {
//       imgURL = 'http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg'
//     }
//     const img = document.createElement('img');
//     img.height = '500';
//     img.src = imgURL;
//     icom.appendChild(img);
//     const style = document.createElement('style');
//     style.textContent = '.wrapper {' +
//                      'position: relative;' +
//                   '}' +
//                    '.info {' +
//                       'font-size: 0.8rem;' +
//                       'width: 200px;' +
//                       'display: inline-block;' +
//                       'border: 1px solid black;' +
//                       'padding: 10px;' +
//                       'background: white;' +
//                       'border-radius: 10px;' +
//                       'opacity: 0;' +
//                       'transition: 0.6s all;' +
//                       'position: absolute;' +
//                       'bottom: 20px;' +
//                       'left: 10px;' +
//                       'z-index: 3;' +
//                     '}' +
//                     'img {' +
//                       'width: 100%' +
//                     '}' +
//                     '.icon:hover + .info, .icon:focus + .info {' +
//                       'opacity: 1;' +
//                     '}';
//     shadow.appendChild(style);
//     console.log(style.isConnected);
//     shadow.appendChild(wrapper);
//     wrapper.appendChild(icom);
//     wrapper.appendChild(info);   
//   }
// }
// customElements.define('popup-info',PopUpInfo);

// class WordCount extends HTMLParagraphElement {
//   constructor() {
//     super();
//     const wcParent = this.parentNode;
//     console.log('parent',this.parentNode,this)
//     function countWords (node) {
//       console.log('node',node);
//       var text = node.textContent
//       return text.split(/\s+/g).length;
//     }
//     const count = 'Words: ' + countWords(wcParent);
//     const shadow = this.attachShadow({mode: 'open'});
//     const text = document.createElement('span');
//     text.textContent = count;
//     shadow.appendChild(text);
// //     setInterval(() => {
// //       var count = 'Words: ' + countWords(wcParent);
// // text.textContent = count;
// //     }, 2000);
//   }
// }
// customElements.define('word-count', WordCount, { extends: 'p' });

// // connectedCallback：当 custom element首次被插入文档DOM时，被调用。
// // disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
// // adoptedCallback：当 custom element被移动到新的文档时，被调用。也就是创建，包括了移动
// // attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
// // 发 attributeChangedCallback()回调函数，你必须监听这个属性。这可以通过定义observedAttributes() get函数来实现，observedAttributes()函数体内包含一个 return语句，返回一个数组，包含了需要监听的属性名称：
// class CustomSquare extends HTMLElement {
//   static get observedAttributes() {
//     console.log("监视中...")
//     return ['c','l'];
//   }
//   constructor() {
//     super();
//     var shadow = this.attachShadow({mode: 'open',delegatesFocus: true});
//     var div = document.createElement('div');
//     var style = document.createElement('style');
//     var textNode = document.createTextNode('wodiu');
//     var input = document.createElement('input');
//     input.setAttribute('class','in');
//     div.appendChild(textNode);
//     div.appendChild(input);
//     shadow.appendChild(style);
//     shadow.appendChild(div);
//   }
//   connectedCallback() {
//     console.log('Custom square element added to page.');
//     updateStyle(this);
//   }
//   disconnectedCallback() {
//     console.log('Custom square element removed from page.');
//   }
//   adoptedCallback() {
//     console.log('Custom square element moved to new page.');
//   }
//   attributeChangedCallback(name, oldValue, newValue) {
//     console.log('Custom square element attributes changed.')
//     updateStyle(this);
//   }
// }
// function updateStyle(elem) {
//   var shadow = elem.shadowRoot;
//   shadow.querySelector('style').textContent = `
//   div {
//     width: ${elem.getAttribute('l')}px;
//     height: ${elem.getAttribute('l')}px;
//     background-color: ${elem.getAttribute('c')};
//   }
//   :focus {
//     background-color: #0f0;
//   }
//   `;
// }
// customElements.define('custom-square',CustomSquare)

// const add = document.querySelector('.add');
// const update = document.querySelector('.update');
// const remove = document.querySelector('.remove');
// let square;
// update.disabled = true;
// remove.disabled = true;
// function  random(min, max) {
//   return Math.floor(Math.random() * (max - min +1) +min); // 向下取整
//   // return Math.floor(Math.random() * 10);
// }

// add.onclick = function () {
//   square = document.createElement('custom-square');
//   square.setAttribute('l','120');
//   square.setAttribute('c','green');
//   document.body.appendChild(square);
//   add.disabled = true;
//   update.disabled = false;
//   remove.disabled = false;
// }

// update.onclick = function () {
//   square.setAttribute('l',100);
//   //   square.setAttribute('l',random(50,100));
//   // square.setAttribute('c',`#${random()}${random()}${random()}`);
//   square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
//   // updateStyle(square);
// }
// remove.onclick = function () {
//   document.body.removeChild(square);
//   update.disabled = true;
//   remove.disabled = true;
//   add.disabled = false;
// }

// // class CustomSlot extends HTMLElement {
// //   constructor() {
// //     super();
// //     var shadow = this.attachShadow({mode: 'open'});
// //     var slot = document.createElement('slot');
// //     // var text = document.createTextNode('有插槽才可以插');
// //     // var rang = document.createRange();
// //     var div = document.createElement('div');
// //     var span = document.createElement('span');
// //     // slot.appendChild(text);
// //     // div.appendChild(text);
// //     // div.appendChild(rang);
// //     // shadow.appendChild(text);
// //     shadow.appendChild(div);
// //     div.appendChild(span);
// //     // shadow.appendChild(slot);
// //     // document.body.appendChild(shadow);
// //   }
// // }
// // customElements.define('custom-slot',CustomSlot);


