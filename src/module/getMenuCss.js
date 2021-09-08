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

export default getMenuCss