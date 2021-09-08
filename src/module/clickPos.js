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

export default {
    clickPosContr,
    clickBatchPosContr
}