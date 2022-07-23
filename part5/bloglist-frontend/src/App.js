import Home from "./components/Home";
import Users from "./components/Users";

//react router imports
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />}/>
      </Routes>
    </Router>
  )
}

export default App;
