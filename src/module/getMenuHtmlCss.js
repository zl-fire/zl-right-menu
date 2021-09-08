import getMenuCss from "./getMenuCss";

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

export default getMenuHtmlCss