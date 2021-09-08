(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['zl-right-menu'] = factory());
}(this, (function () { 'use strict';

    /**
     * @function showMenu 
     * @description 当用户在指定元素上鼠标右键之后，会调用此函数进行显示右键菜单
     * @param {object} params 传入的鼠标右键事件对象
     * @param {string} params.e 传入的鼠标右键事件对象
     * @param {string} params.menuId 要显示的右键菜单id/class名字，默认menu
     * @param {object[]} params.top  top:元素顶端到视图顶端的距离, 默认情况右键菜单会显示在右键时鼠标的坐标处，此参数会覆盖调默认的y轴坐标。
     * @param {function} params.right right:元素右边与视图左边的距离, 默认情况右键菜单会显示在右键时鼠标的坐标处，此参数会覆盖调默认的x轴坐标。
     * @example
     * showMenu({ e, menuId });
     */
    async function showMenu(params) {
        let { e, menuId = "menu", top, right }=params;
        var oMenu = document.getElementById(menuId);
        // 计算边界距离
        var _x = e.clientX,
            _y = e.clientY;
        let vw = document.documentElement.clientWidth;
        let vh = document.documentElement.clientHeight;
        let eleH = $('#' + menuId).height();
        let eleW = $('#' + menuId).width();
        if (vw - _x < eleW) {
            _x = _x - (eleW - (vw - _x)) + 12;
        }
        if (vh - _y < eleH) {
            _y = _y - (eleH - (vh - _y)) + 12;
        }
        // 开始赋值
        oMenu.style.display = "block";
        oMenu.style.left = _x - 5 + "px";
        oMenu.style.top = _y - 20 + "px";
        // top,right
        if (right) {
            oMenu.style.left = right + "px";
        }
        if (top) {
            oMenu.style.top = top + "px";
        }
    }

    /**
     * @function getMenuCss 
     * @description 返回右键菜单的样式代码字符串，用于后续注入到页面上
     * @param {object} params 菜单样式对象
     * @param {string} params.menuId 右键菜单ID
     * @param {string} params.backcolor 右键菜单的背景颜色
     * @param {string} params.fontcolor 右键菜单的字体颜色
     * @param {string} params.fontsize 右键菜单的字体大小
     * @param {string} params.border_bottom 右键菜单的菜单项分割线的样式
     * @returns {string} 返回右键菜单css样式字符串
     */

    function getMenuCss(params) {
      let {
        menuId = "menu",
        backcolor = "rgb(37, 37, 38)",
        fontcolor = "rgb(255 255 255)",
        fontsize = "16px",
        border_bottom = "1px solid rgb(71, 69, 69)"
      } = params;
      return `
<style>
    #${menuId} {
        display: none;
        position: absolute;
        background-color:${backcolor};
        border: black;
        z-index: 6;
        min-width: 150px;
        min-height: 200px;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 0;
        cursor:default;
        text-align: left;
        font-size:${fontsize};
      }
      #${menuId}  ul {
        padding-left: 0;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      #${menuId}  ul li {
        list-style: none;
        padding: 5px 3px;
        color: ${fontcolor};
        border-bottom: ${border_bottom};
        padding-left:15px;
        padding-right:15px;
      }
      #${menuId}  ul li:hover{
        background-color:rgb(9, 71, 113);
      }
      .active{
        background-color:rgb(9, 71, 113);
      }
</style>
    `;
    }

    /**
     * @function getMenuHtmlCss 
     * @description 返回右键菜单的HtmlCss代码字符串，用于后续注入到页面上
     * @param {object} params 参数对象
     * @param {string} params.menuId 页面上的右键菜单DOM的ID,class默认也会取这个值,默认值:menu
     * @param {object[]} params.menuJson 页面上的右键菜单结构
     * @param {string} params.backcolor 右键菜单的背景颜色
     * @param {string} params.fontcolor 右键菜单的字体颜色
     * @param {string} params.fontsize 右键菜单的字体大小
     * @param {string} params.border_bottom 右键菜单的菜单项分割线的样式
     * @returns {string} 返回右键菜单HtmlCss样式字符串
     * @example
     *   let menuJson = [
     *       {
     *         name: "在新窗口打开页面",
     *         id: "1",
     *       },
     *       {
     *         name: "打开搜索页面",
     *         id: "2",
     *         children: [
     *           {
     *             name: "打开百度页面",
     *             id: "2_1",
     *           },
     *           {
     *             name: "打开搜狗页面",
     *             id: "2_1",
     *           }
     *         ]
     *       }
     *     ];
     *   let menuStrArr = getMenuHtmlCss({
     *         menuId,
     *         menuJson,
     *         backcolor,
     *         fontcolor,
     *         fontsize,
     *         border_bottom,
     *     });

     */
    function getMenuHtmlCss(params) {
      let {
        menuId="menu",
        menuJson,
        backcolor,
        fontcolor,
        fontsize,
        border_bottom,
      } = params;
      let root = menuId;
      // 生成默认菜单结构
      if (!menuJson) {
        menuJson = [
          {
            name: "在新窗口打开页面",
            id: "1",
          },
          {
            name: "打开搜索页面",
            id: "2",
            children: [
              {
                name: "打开百度页面",
                id: "2_1",
              },
              {
                name: "打开搜狗页面",
                id: "2_1",
              }
            ]
          }
        ];
      }
      // 递归循环json数据，生成右键菜单
      let menuStrArr = [];
      createMenu(menuJson, menuId, menuStrArr);
      function createMenu(list, menuId, menuStrArr) {
        let str = `<menu class="${menuId}" id="${menuId}"><ul>`;
        for (let i = 0; i < list.length; i++) {
          if (list[i].children) {
            str += `  <li  class="${menuId + "_" + list[i].id}" id="${menuId + "_" + list[i].id}" data-child="true" >${list[i].name}</li>`;
            createMenu(list[i].children, menuId + "_" + list[i].id + "_" + root, menuStrArr);
          }
          else {
            str += `  <li  class="${menuId + "_" + list[i].id}" id="${menuId + "_" + list[i].id}" >${list[i].name}</li>`;
          }
        }
        str += `</ul></menu>`;
        menuStrArr.push(str);
        menuStrArr.push(getMenuCss({ menuId, backcolor, fontcolor, fontsize, border_bottom }));
      }
      return menuStrArr;
    }

    /**
     * @function clickPosContr 
     * @description 判断是否点击了指定位置(className选择器所指的元素)或者其内部
     * 
     * @param {object} params 事件对象
     * @param {Event} params.eve 事件对象
     * @param {string} params.className 指定位置的类名
     * @param {function} params.yesCallback 点击了的指定位置时执行的回调
     * @param {function} params.noCallback 没点击的指定位置时执行的回调
     * @example
     *  //监听body鼠标右键按下，做事件代理
     *     $("html").on("contextmenu", containerSelector, async function () {
     *         // 在点击右键前先把可能存在的已经显示的右键菜单全部隐藏掉
     *         $(`[class$="${menuId}"]`).css("display", "none");
     *         let e = window.event;
     *         window.rightMenuRoot = window.event.target;
     *         e.preventDefault();
     *         clickPosContr({
     *             eve: e,
     *             likeClassName: menuId,
     *             yesCallback: () => {
     *                 // 在菜单里面点击右键无效果
     *                 return;
     *             },
     *             noCallback: () => {
     *                 // 在外面点击显示右键菜单
     *                 //左键--button属性=1，右键button属性=2
     *                 if (e.button == 2) {
     *                     showMenu({ e, menuId });
     *                 }
     *             }
     *         });
     *     });
     */
    function clickPosContr({eve, className, yesCallback, noCallback}) {
        let node = eve.target;
        let nodeClass = $(node).prop("class");
        let parEle = $(node).parents("." + className)[0];
        //如果点击的指定位置之外的地方 
        if (nodeClass != className && !parEle) {
            if (noCallback) noCallback(node);
        }
        // 如果点击的指定位置
        else {
            if (yesCallback) yesCallback(node);
        }
    }

    /**
     * @function clickBatchPosContr 
     * @description 判断是否点击了指定位置(likeClassName选择器所指的元素)或者其内部
     * @param {Event} params.eve 事件对象
     * @param {string} params.likeClassName 指定位置的类名
     * @param {function} params.yesCallback 点击了的指定位置时执行的回调
     * @param {function} params.noCallback 没点击的指定位置时执行的回调
     * 
     * @example
     *  //监听body鼠标右键按下，做事件代理
     *     $("html").on("contextmenu", containerSelector, async function () {
     *         // 在点击右键前先把可能存在的已经显示的右键菜单全部隐藏掉
     *         $(`[class$="${menuId}"]`).css("display", "none");
     *         let e = window.event;
     *         window.rightMenuRoot = window.event.target;
     *         e.preventDefault();
     *         clickBatchPosContr({
     *             eve: e,
     *             likeClassName: menuId,
     *             yesCallback: () => {
     *                 // 在菜单里面点击右键无效果
     *                 return;
     *             },
     *             noCallback: () => {
     *                 // 在外面点击显示右键菜单
     *                 //左键--button属性=1，右键button属性=2
     *                 if (e.button == 2) {
     *                     showMenu({ e, menuId });
     *                 }
     *             }
     *         });
     *     });
     */
    function clickBatchPosContr({eve, likeClassName, yesCallback, noCallback}) {
        let node = eve.target;
        let nodeClass = $(node).prop("class");
        let parEle = $(node).parents(`[class^="${likeClassName}"]`)[0];
        // 构建正则表达式
        let reg=new RegExp("^"+likeClassName);
        //如果点击的指定位置之外的地方 
        if (!reg.test(nodeClass) && !parEle) {
            if (noCallback) noCallback(node);
        }
        // 如果点击的指定位置
        else {
            if (yesCallback) yesCallback(node);
        }
    }

    var clickPos = {
        clickPosContr,
        clickBatchPosContr
    };

    let { clickBatchPosContr: clickBatchPosContr$1 } = clickPos;

    /**
     * @function initMenu 
     * @description 创建右键菜单
     * 
     * @param {object} params 参数对象
     * @param {string} params.menuId 页面上的右键菜单DOM的ID,class默认也会取这个值,默认值:menu
     * @param {string} params.containerSelector 当在 containerSelector 元素上鼠标右键时会触发右键菜单，如：.three
     * @param {object[]} params.menuJson 用于渲染右键菜单的json数据结构
     * @param {function} params.clickItemCallback 点击了具体的菜单项的回调函数
     * @param {string} params.backcolor 右键菜单的背景颜色 ，默认值：backcolor = "rgb(37, 37, 38)",
     * @param {string} params.fontcolor 右键菜单的字体颜色 ，默认值：fontcolor = "rgb(255 255 255)",
     * @param {string} params.fontsize 右键菜单的字体大小 ，默认值：fontsize = "16px",
     * @param {string} params.border_bottom 右键菜单的菜单项分割线的样式 ，默认值：border_bottom = "1px solid rgb(71, 69, 69)"
     * @example
     *         let menuJson = [
     *             {
     *                 name: "测试菜单项666 ",
     *                 id: "0",
     *             },
     *             {
     *                 name: "在新窗口打开 > ",
     *                 id: "1",
     *                 children: [
     *                     {
     *                         name: "窗口a",
     *                         id: "1_1",
     *                     },
     *                     {
     *                         name: "窗口b",
     *                         id: "1_2",
     *                     }
     *                 ]
     *             },
     *             {
     *                 name: "打开搜索页面 > ",
     *                 id: "2",
     *                 children: [
     *                     {
     *                         name: "打开百度页面",
     *                         id: "2_1",
     *                     },
     *                     {
     *                         name: "打开搜狗页面> ",
     *                         id: "2_2",
     *                         children: [
     *                             {
     *                                 name: "搜狗1",
     *                                 id: "2_2_1",
     *                             },
     *                             {
     *                                 name: "搜狗2",
     *                                 id: "2_2_2",
     *                             }
     *                         ]
     *                     }
     *                 ]
     *             }
     *         ];
     *         // 点击
     *         window["zl-right-menu"].initMenu({
     *             containerSelector: ".three", //当在".three"元素上鼠标右键时会触发右键菜单
     *             menuId: "myMenu", //自定义菜单名字
     *             menuJson: menuJson, //渲染的菜单json数据结构
     *             // 自定义样式参数
     *             // backcolor:"red", //右键菜单的背景颜色
     *             // fontcolor:"yellow",//右键菜单的字体颜色
     *             // fontsize:"20px",//右键菜单的字体大小
     *             // border_bottom:"5px solid rgb(71, 69, 69)",//右键菜单的菜单项分割线的样式
     *             clickItemCallback: (root, node) => { //当点击菜单项时触发的回调函数
     *                 console.log("触发右键菜单的元素:", root)
     *                 console.log("你点击了具体的菜单项:", node,)
     *             }
     *         });

     */
    function initMenu(params) {

        let {
            containerSelector = "html",
            menuId = "menu",
            menuJson,
            backcolor,
            fontcolor,
            fontsize,
            border_bottom,
            clickItemCallback = (root, node) => { }
        } = params;

        // 生成默认菜单结构
        if (!menuJson) {
            menuJson = [
                {
                    name: "测试菜单项 ",
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
        }
        //向页面注入模板字符串
        // let menuStrArr = getMenuHtmlCss(menuId, menuJson);
        let menuStrArr = getMenuHtmlCss({
            menuId,
            menuJson,
            backcolor,
            fontcolor,
            fontsize,
            border_bottom,
        });

        $("body").append(menuStrArr.join(""));

        //监听body鼠标右键按下，做事件代理
        $("html").on("contextmenu", containerSelector, async function () {
            // 在点击右键前先把可能存在的已经显示的右键菜单全部隐藏掉
            $(`[class$="${menuId}"]`).css("display", "none");
            let e = window.event;
            window.rightMenuRoot = window.event.target;
            e.preventDefault();
            clickBatchPosContr$1({
                eve: e,
                likeClassName: menuId,
                yesCallback: () => {
                    // 在菜单里面点击右键无效果
                    return;
                },
                noCallback: () => {
                    // 在外面点击显示右键菜单
                    //左键--button属性=1，右键button属性=2
                    if (e.button == 2) {
                        showMenu({ e, menuId });
                    }
                }
            });
        });
        // 当点击鼠标左键时的操作
        $("html").on("click", async function () {
            let e = window.event;
            clickBatchPosContr$1({
                eve: e,
                likeClassName: menuId,
                yesCallback: (node) => {
                    //过来掉点击的menu标签
                    if (node.nodeName == "MENU") return;
                    // 判断是否有子菜单，如果有就显示子菜单
                    let nodeClass = $(node).prop("class");
                    let data_child = $(node).attr("data-child");

                    // 在显示此菜单前，先把其他同级与后面级别的菜单全部隐藏掉
                    let pubNameArr = nodeClass.split("_");
                    let end = pubNameArr[pubNameArr.length - 1];
                    let reg = new RegExp(end + "$");
                    let pubName = nodeClass.replace(reg, "");
                    $(`menu[class^="${pubName}"]`).css("display", "none");

                    //------------将当前点击的菜单进行突出显示-------------
                    // 先把所有兄弟选择的状态全部取消
                    $(node).siblings().removeClass("active");
                    // 在把后代的相关li元素全部清空选中状态
                    $(`menu[class^="${pubName}"] li`).removeClass("active");
                    //在给当前点击的元素添加选中状态
                    $(node).addClass("active");

                    // 如果存在后代，那就对后代元素显示对应的子菜单
                    if (data_child == "true") {
                        let pos = node.getBoundingClientRect();
                        // 显示菜单
                        showMenu({ e, menuId: nodeClass + "_" + menuId, top: pos.top, right: pos.right + 1 });
                    }
                    else {
                        if (clickItemCallback) {
                            clickItemCallback(window.rightMenuRoot, node);
                        }
                    }
                },
                noCallback: () => {
                    $(`[class$="${menuId}"]`).css("display", "none");
                }
            });
        });
    }

    var main = {
        initMenu,
        clickPos,
        showMenu
    };

    return main;

})));
