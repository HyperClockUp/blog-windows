import React from 'react';
import { RouterConfig } from '../types/Route';
import LoginPage from '../pages/login';
import MainPage from '../pages/main';
import TestPage from '../pages/test';

export enum ROUTES {
  LOGIN = 'LOGIN',
  MAIN = 'MAIN',
  TEST = 'TEST',
}

const RouteList: Record<ROUTES, RouterConfig> = {
  [ROUTES.LOGIN]: {
    path: '/login',
    element: <LoginPage />,
    auth: false,
  },
  [ROUTES.MAIN]: {
    path: '/',
    element: <MainPage />,
    index: true,
    auth: true,
  },
  [ROUTES.TEST]: {
    path: '/test',
    element: <TestPage />,
    auth: false,
  }
};

export default RouteList;