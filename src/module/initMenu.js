
import showMenu from "./showMenu";
import getMenuHtmlCss from "./getMenuHtmlCss";
import clickPos from "./clickPos"
let { clickBatchPosContr } = clickPos;

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
        containerSelector = "body",
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
        clickBatchPosContr({
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
        clickBatchPosContr({
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
export default initMenu
