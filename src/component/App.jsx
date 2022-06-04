import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "page/HomePage";
import { useTheme } from "provider/theme";
import { Toaster } from "react-hot-toast";
import Page from "page/Page";
import ListPage from "page/ListPage";
import AnonymousRoute from "router/AnonymousRoute";
import ProtectedRoute from "router/ProtectedRoute";
import NewListPage from "page/NewListPage";
import ListDetailPage from "page/ListDetailPage";
import NoneListSelectedPage from "page/NoneListSelectedPage";
import "component/App.sass";

export default function App() {
  const { theme } = useTheme();
  return (
    <div className={`theme-${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route element={<AnonymousRoute />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="list" element={<ProtectedRoute />}>
              <Route element={<ListPage />}>
                <Route index element={<NoneListSelectedPage />} />
                <Route path="new" element={<NewListPage />} />
                <Route path=":id" element={<ListDetailPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
