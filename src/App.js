import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/book/Detail';
import BookList from './pages/book/BookList';
import SaveForm from './pages/book/SaveForm';
import UpdateForm from './pages/book/UpdateForm';
import JoinForm from './pages/user/JoinForm';
import LoginForm from './pages/user/LoginForm';
import About from './pages/user/About';
import Header3 from './components/layouts/Header3';
import Home from './components/layouts/Home';
import DataTable from './pages/book/Table';
import EnhancedTable from './pages/book/Table2';
import SimpleBarChart from './pages/book/Chart';
import BasicExampleDataGridPro from './pages/book/Table3';
import Expense from './pages/book/Expense';
// import Category from './pages/settings/category/Category';
import CategoryWritePage from './pages/settings/category/CategoryWritePage';
import CategoryListPage from './pages/settings/category/CategoryListPage';
import CategoryReadPage from './pages/settings/category/CategoryReadPage';
import CategoryEditPage from './pages/settings/category/CategoryEditPage';
// import debug from 'debug';
// const authLogger = debug('auth');
var debug = require('debug')('http'),
  // http = require('http'),
  name = 'My App';

debug('booting %o', name);
// fake app

// debug('booting %o', name);

function App() {
  // authLogger('Application Start');

  return (
    <Container className="mt-5" fluid="xxl">
      {/* 로그인이 되면 Header/Footer가 보이도록 세팅 */}
      <Header3 />
      <Routes>
        {/* <Route path="/" exact={true} component={Home} />
          <Route path="/saveForm" exact={true} component={SaveForm} />
          <Route path="/book/:id" exact={true} component={Detail} />
          <Route path="/loginForm" exact={true} component={LoginForm} />
          <Route path="/joinForm" exact={true} component={JoinForm} />
          <Route path="/updateForm/:id" exact={true} component={UpdateForm} /> */}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/expense" exact={true} element={<Expense />} />

        <Route path="/table" exact={true} element={<DataTable />} />
        <Route path="/table2" exact={true} element={<EnhancedTable />} />
        <Route
          path="/table3"
          exact={true}
          element={<BasicExampleDataGridPro />}
        />
        <Route path="/chart" exact={true} element={<SimpleBarChart />} />
        {/* <Route path="/settings/category">
          <Route index element={<Category />} />
          <Route path="/enroll" element={<CategoryEnroll />} />
          <Route path=":id" element={<CategoryRead />} />
        </Route> */}
        <Route
          path="/settings/category"
          exact={true}
          element={<CategoryListPage />}
        />
        <Route
          path="/settings/category/write"
          exact={true}
          element={<CategoryWritePage />}
        />
        <Route
          path="/settings/category/:categoryId"
          exact={true}
          element={<CategoryReadPage />}
        />
        <Route
          path="/settings/category/edit"
          exact={true}
          element={<CategoryEditPage />}
        />
        <Route path="/booklist" exact={true} element={<BookList />} />
        <Route path="/saveForm" exact={true} element={<SaveForm />} />
        <Route path="/book/:id" exact={true} element={<Detail />} />
        <Route path="/loginForm" exact={true} element={<LoginForm />} />
        <Route path="/about" exact={true} element={<About />} />
        <Route path="/joinForm" exact={true} element={<JoinForm />} />
        <Route path="/updateForm/:id" exact={true} element={<UpdateForm />} />
      </Routes>
      {/* <Footer /> */}
    </Container>
  );
}

export default App;
