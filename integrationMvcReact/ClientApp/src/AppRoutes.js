import { AddContact } from "./components/AddContact";
import { FetchData } from "./components/ListContacts";

const AppRoutes = [
  {
    index: true,
    element: <FetchData />
  },
  {
    path: '/add', 
      element: <AddContact />
  }
];

export default AppRoutes;
