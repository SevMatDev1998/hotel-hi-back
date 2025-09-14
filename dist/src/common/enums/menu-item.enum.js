"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemDisplayNames = exports.MenuItemGroupMapping = exports.MenuItem = exports.MenuItemIcons = exports.MenuItemGroup = void 0;
exports.MenuItemGroup = {
    Hotel: 'Hotel',
    Price: 'Price',
    Partners: 'Partners',
    Notification: 'Notification',
};
exports.MenuItemIcons = {
    [exports.MenuItemGroup.Hotel]: 'fa fa-th-large',
    [exports.MenuItemGroup.Price]: 'fa fa-book',
    [exports.MenuItemGroup.Partners]: 'fa fa-envelope-open',
    [exports.MenuItemGroup.Notification]: 'fa fa-envelope-open',
};
var MenuItem;
(function (MenuItem) {
    MenuItem[MenuItem["Hotel"] = 1] = "Hotel";
    MenuItem[MenuItem["Room"] = 2] = "Room";
    MenuItem[MenuItem["Food"] = 3] = "Food";
    MenuItem[MenuItem["Service"] = 4] = "Service";
    MenuItem[MenuItem["Price"] = 5] = "Price";
    MenuItem[MenuItem["Partners"] = 6] = "Partners";
    MenuItem[MenuItem["Notification"] = 7] = "Notification";
})(MenuItem || (exports.MenuItem = MenuItem = {}));
exports.MenuItemGroupMapping = {
    [MenuItem.Hotel]: exports.MenuItemGroup.Hotel,
    [MenuItem.Room]: exports.MenuItemGroup.Hotel,
    [MenuItem.Food]: exports.MenuItemGroup.Hotel,
    [MenuItem.Service]: exports.MenuItemGroup.Hotel,
    [MenuItem.Price]: exports.MenuItemGroup.Price,
    [MenuItem.Partners]: exports.MenuItemGroup.Partners,
    [MenuItem.Notification]: exports.MenuItemGroup.Notification,
};
exports.MenuItemDisplayNames = {
    [MenuItem.Hotel]: 'MenuItem_Hotel',
    [MenuItem.Room]: 'MenuItem_Room',
    [MenuItem.Food]: 'MenuItem_Food',
    [MenuItem.Service]: 'MenuItem_Service',
    [MenuItem.Price]: 'MenuItem_Price',
    [MenuItem.Partners]: 'MenuItem_Partners',
    [MenuItem.Notification]: 'MenuItem_Notifications',
};
//# sourceMappingURL=menu-item.enum.js.map