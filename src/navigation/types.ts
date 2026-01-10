export type TabsParamList ={
    Dashboard: undefined;
  Inventory: undefined;
  Orders: undefined;
  Customers: undefined;
  Settings: undefined;
}

export type RootStackParamList={
    Tabs: {
    screen?: keyof TabsParamList;
  };
  CustomerDetails: { id: string };
  AddCustomerScreen: undefined;
  CustomerEditScreen: { id: string };
  AddProductScreen: undefined;
  ProductEditScreen: { id: string };
  CreateOrderScreen: undefined;
  OrderDetailScreen: { id: string };
}
