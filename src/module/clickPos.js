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

export default {
    clickPosContr,
    clickBatchPosContr
}