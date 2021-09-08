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
export default showMenu