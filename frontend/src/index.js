import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import ItemsView from './Components/ItemsView';
import { loader as itemsLoader } from './Components/ItemsView';

//import ItemInfo from './Components/ItemInfo';
import ItemInfo from './Components/ItemInfo';
import { loader as itemInfoLoader } from './Components/ItemInfo';

import { Provider } from 'react-redux';
import store from './store';

import SigninScreen from './Components/SigninScreen';
import SignupScreen from './Components/SignupScreen';
import DeliveryScreen from './Components/DeliveryScreen';
import OrdersScreen from './Components/OrdersScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ItemsView />,
        loader: itemsLoader
      },
      {
        element: <ItemInfo />,
        loader: itemInfoLoader,
        path: "items/:itemId"
      },
      {
        element: <SigninScreen />,
        path: "signin"
      },
      {
        element: <SignupScreen />,
        path: "signup"
      },
      {
        element: <DeliveryScreen />,
        path: "delivery"
      },
      {
        element: <OrdersScreen />,
        path: "orders"
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
 
);

