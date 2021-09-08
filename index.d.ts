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
export function initMenu(params: {
    menuId: string;
    containerSelector: string;
    menuJson: object[];
    clickItemCallback: Function;
    backcolor: string;
    fontcolor: string;
    fontsize: string;
    border_bottom: string;
}): void;
export namespace clickPos {
    export { clickPosContr };
    export { clickBatchPosContr };
}
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
export function showMenu(params: {
    e: string;
    menuId: string;
    top: object[];
    right: Function;
}): Promise<void>;
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
declare function clickPosContr({ eve, className, yesCallback, noCallback }: {
    eve: Event;
    className: string;
    yesCallback: Function;
    noCallback: Function;
}): void;
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
declare function clickBatchPosContr({ eve, likeClassName, yesCallback, noCallback }: Event): void;
export {};
