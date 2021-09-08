
import showMenu from "./showMenu";
import getMenuHtmlCss from "./getMenuHtmlCss";
import clickPos from "./clickPos"
let { clickBatchPosContr } = clickPos;
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
        clickBatchPosContr(e, menuId, () => {
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
        clickBatchPosContr(e, menuId, (node) => {
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
export default initMenu
