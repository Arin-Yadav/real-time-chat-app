import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Layout from './Layout/Layout'
import ChatHome from './components/ChatHome'
import { RouteIndex } from './Helper/RouteName'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<ChatHome />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App