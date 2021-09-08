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

export default getMenuCss