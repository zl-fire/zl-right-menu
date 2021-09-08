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
export default showMenu