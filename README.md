# zl-right-menu
一个向页面快速添加右键菜单的模块，默认会覆盖掉默认的浏览器右键菜单

## 演示
https://zl-fire.github.io/code/rigthMenu.html
  ![777777](/assets/777777.png)

## 依赖
 此模块依赖于jquery,所以在使用前最后先引入下jquery

## 通过script方式引入与使用
```js
  <script src="https://cdn.jsdelivr.net/npm/blogzl-indexjs@18.0.0/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/zl-right-menu@1.0.1/index.js"></script>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
        }
    </style>
    <script>
        let menuJson = [
            {
                name: "测试菜单项666 ",
                id: "0",
            },
            {
                name: "在新窗口打开 > ",
                id: "1",
                children: [
                    {
                        name: "窗口a",
                        id: "1_1",
                    },
                    {
                        name: "窗口b",
                        id: "1_2",
                    }
                ]
            },
            {
                name: "打开搜索页面 > ",
                id: "2",
                children: [
                    {
                        name: "打开百度页面",
                        id: "2_1",
                    },
                    {
                        name: "打开搜狗页面> ",
                        id: "2_2",
                        children: [
                            {
                                name: "搜狗1",
                                id: "2_2_1",
                            },
                            {
                                name: "搜狗2",
                                id: "2_2_2",
                            }
                        ]
                    }
                ]
            }
        ];
        // 点击
        window["zl-right-menu"].initMenu({
            containerSelector: "body", //当在body元素上鼠标右键时会触发右键菜单
            menuId: "myMenu", //自定义菜单名字
            menuJson: menuJson, //渲染的菜单json数据结构
           /* 自定义样式参数
            backcolor:"red", //右键菜单的背景颜色
            fontcolor:"yellow",//右键菜单的字体颜色
            fontsize:"20px",//右键菜单的字体大小
            border_bottom:"5px solid rgb(71, 69, 69)",//右键菜单的菜单项分割线的样式
           */
            clickItemCallback: (root, node) => { //当点击菜单项时触发的回调函数
                console.log("触发右键菜单的元素:", root);
                console.log("你点击了具体的菜单项:", node,);
                alert("你点击了菜单："+node.innerText);
            }
        });
    </script>

注意：
   在全局jQuery对象可用的情况下，不管是react还是vue，都可以直接在public/index.html里面直接引入jQuery和zl-right-menu模块进行使用

```

## 通过import方式引入与使用
```js
// 先安装
npm i zl-right-menu -S

// 在全局jQuery对象可用的情况下，可以直接import使用
import { initMenu } from 'zl-right-menu';

let menuJson = [
  {
    name: "测试菜单项666 ",
    id: "0",
  },
  {
    name: "在新窗口打开 > ",
    id: "1",
    children: [
      {
        name: "窗口a",
        id: "1_1",
      },
      {
        name: "窗口b",
        id: "1_2",
      }
    ]
  },
  {
    name: "打开搜索页面 > ",
    id: "2",
    children: [
      {
        name: "打开百度页面",
        id: "2_1",
      },
      {
        name: "打开搜狗页面> ",
        id: "2_2",
        children: [
          {
            name: "搜狗1",
            id: "2_2_1",
          },
          {
            name: "搜狗2",
            id: "2_2_2",
          }
        ]
      }
    ]
  }
];
// 点击
initMenu({
  containerSelector: ".nav-text,div[class^='RecommendList'] li", //当在body元素上鼠标右键时会触发右键菜单
  menuId: "myMenu", //自定义菜单名字
  menuJson: menuJson, //渲染的菜单json数据结构
  /* 自定义样式参数
   backcolor:"red", //右键菜单的背景颜色
   fontcolor:"yellow",//右键菜单的字体颜色
   fontsize:"20px",//右键菜单的字体大小
   border_bottom:"5px solid rgb(71, 69, 69)",//右键菜单的菜单项分割线的样式
  */
  clickItemCallback: (root, node) => { //当点击菜单项时触发的回调函数
    console.log("触发右键菜单的元素:", root);
    console.log("你点击了具体的菜单项:", node,);
    alert("你点击了菜单：" + node.innerText);
  }
});

```
