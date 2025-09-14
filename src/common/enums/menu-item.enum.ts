export const MenuItemGroup = {
  Hotel: 'Hotel',
  Price: 'Price',
  Partners: 'Partners',
  Notification: 'Notification',
} as const;

export const MenuItemIcons = {
  [MenuItemGroup.Hotel]: 'fa fa-th-large',
  [MenuItemGroup.Price]: 'fa fa-book',
  [MenuItemGroup.Partners]: 'fa fa-envelope-open',
  [MenuItemGroup.Notification]: 'fa fa-envelope-open',
} as const;

export enum MenuItem {
  Hotel = 1,
  Room = 2,
  Food = 3,
  Service = 4,
  Price = 5,
  Partners = 6,
  Notification = 7,
}

export const MenuItemGroupMapping = {
  [MenuItem.Hotel]: MenuItemGroup.Hotel,
  [MenuItem.Room]: MenuItemGroup.Hotel,
  [MenuItem.Food]: MenuItemGroup.Hotel,
  [MenuItem.Service]: MenuItemGroup.Hotel,
  [MenuItem.Price]: MenuItemGroup.Price,
  [MenuItem.Partners]: MenuItemGroup.Partners,
  [MenuItem.Notification]: MenuItemGroup.Notification,
} as const;

export const MenuItemDisplayNames = {
  [MenuItem.Hotel]: 'MenuItem_Hotel',
  [MenuItem.Room]: 'MenuItem_Room',
  [MenuItem.Food]: 'MenuItem_Food',
  [MenuItem.Service]: 'MenuItem_Service',
  [MenuItem.Price]: 'MenuItem_Price',
  [MenuItem.Partners]: 'MenuItem_Partners',
  [MenuItem.Notification]: 'MenuItem_Notifications',
} as const;
