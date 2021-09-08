(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['zl-right-menu'] = factory());
}(this, (function () { 'use strict';

    // top:元素顶端到试图顶端的距离，right:元素右边与视图左边的距离
    async function showMenu({ e, menuId = "menu", top, right }) {
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
     * @param {string} menuId 页面上的右键菜单DOM的ID
     * @returns {string} 返回右键菜单css样式字符串
     */

    function getMenuCss(menuId= "menu") {
        return `
<style>
    #${menuId} {
        display: none;
        position: absolute;
        background-color:rgb(37, 37, 38);
        border: black;
        z-index: 6;
        min-width: 150px;
        min-height: 200px;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 0;
        cursor:default;
        text-align: left;
      }
      #${menuId}  ul {
        padding-left: 0;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      #${menuId}  ul li {
        list-style: none;
        padding: 5px 3px;
        color: rgb(255 255 255);
        border-bottom: 1px solid rgb(71, 69, 69);
        padding-left:15px;
        padding-right:15px;
      }
      #${menuId}  ul li:hover{
        background-color:rgb(9, 71, 113);
      }
</style>
    `;
    }

    /**
     * @function getMenuHtmlCss 
     * @description 返回右键菜单的HtmlCss代码字符串，用于后续注入到页面上
     * @param {string} menuId 页面上的右键菜单DOM的ID,class默认也会取这个值,默认值:menu
     * @param {object[]} menuJson 页面上的右键菜单结构
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
     * 
     * let menuStrArr = getMenuHtmlCss("menu", menuJson);

     */
    function getMenuHtmlCss(menuId = "menu", menuJson) {
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
        menuStrArr.push(getMenuCss(menuId));
      }
      return menuStrArr;
    }

    /**
     * @function clickPosContr 
     * @description 判断是否点击了指定位置或者其内部（精确到具体某个位置）
     * @param {Event} eve 事件对象
     * @param {string} className 指定位置的类名
     * @param {function} yesCallback 如果点击的指定位置,执行的回调
     * @param {function} noCallback 如果点击的指定位置外面的地方,执行的回调
     * @example
     * 
     *         clickPosContr(e, menuId, () => {
     *             console.log("点击了:", node)
     *             // 判断是否有子菜单，如果有就显示子菜单
     * 
     *         }, () => {
     *             $(`[class^="${menuId}"]`).css("display", "none")
     *         });
     */
    function clickPosContr(eve, className, yesCallback, noCallback) {
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
     * @description 判断是否点击了指定位置或者其内部（精确到具体某个位置）
     * @param {Event} eve 事件对象
     * @param {string} likeClassName 页面上的右键菜单DOM的ID
     * @param {function} yesCallback 如果点击的指定位置,执行的回调
     * @param {function} noCallback 如果点击的指定位置外面的地方,执行的回调
     * @example
     * 
     *         clickBatchPosContr(e, menuId, () => {
     *             console.log("点击了:", node)
     *             // 判断是否有子菜单，如果有就显示子菜单
     * 
     *         }, () => {
     *             $(`[class^="${menuId}"]`).css("display", "none")
     *         });
     */
    function clickBatchPosContr(eve, likeClassName, yesCallback, noCallback) {
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
     * @description 返回右键菜单的HtmlCss代码字符串，用于后续注入到页面上
     * @param {string} containerSelector 当我们的按钮右键行为在指定的选择器为 containerSelector  的容器上才生效,默认在html上都有效
     * @param {string} menuId 页面上的右键菜单DOM的ID,class默认也会取这个值,默认值:menu
     * @param {object[]} menuJson 页面上的右键菜单结构
     * @param {function} clickItemCallback 点击了具体的菜单项（无孩子节点）的回调函数
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
     * 
     * let menuStrArr = getMenuHtmlCss("menu", menuJson);

     */
    function initMenu({ containerSelector = "html", menuId = "menu", menuJson, clickItemCallback=(root,node)=>{} }) {
        // 生成默认菜单结构
        if (!menuJson) {
            menuJson = [
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
        let menuStrArr = getMenuHtmlCss(menuId, menuJson);
        $("body").append(menuStrArr.join(""));

        //监听body鼠标右键按下，做事件代理
        $("html").on("contextmenu", containerSelector, async function () {
            // 在点击右键前先把可能存在的已经显示的右键菜单全部隐藏掉
            $(`[class$="${menuId}"]`).css("display", "none");
            let e = window.event;
            window.rightMenuRoot=window.event.target;
            e.preventDefault();
            clickBatchPosContr$1(e, menuId, () => {
                // 在菜单里面点击右键无效果
                return;
            }, () => {
                //左键--button属性=1，右键button属性=2
                if (e.button == 2) {
                    showMenu({ e, menuId });
                }
            });
        });
        // 当点击鼠标左键时的操作
        $("html").on("click", async function () {
            let e = window.event;
            clickBatchPosContr$1(e, menuId, (node) => {
                // 判断是否有子菜单，如果有就显示子菜单
                let nodeClass = $(node).prop("class");
                let data_child = $(node).attr("data-child");

                // 在显示此菜单前，先把其他同级与后面级别的菜单全部隐藏掉
                let pubNameArr = nodeClass.split("_");
                let end = pubNameArr[pubNameArr.length - 1];
                let reg = new RegExp(end + "$");
                let pubName = nodeClass.replace(reg, "");
                $(`menu[class^="${pubName}"]`).css("display", "none");

                if (data_child == "true") {
                    let pos = node.getBoundingClientRect();
                    // 显示菜单
                    showMenu({ e, menuId: nodeClass + "_" + menuId, top: pos.top, right: pos.right + 1 });
                }
                else {
                    if (clickItemCallback) {
                        clickItemCallback(window.rightMenuRoot,node);
                    }
                }
            }, () => {
                $(`[class$="${menuId}"]`).css("display", "none");
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
