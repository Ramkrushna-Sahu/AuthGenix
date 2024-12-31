import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import RequireAuth from "./components/RequireAuth.jsx";
import PersistenLogin from "./components/PersistentLogin.jsx";
import Topbar from "./components/Topbar.jsx"; // Import the Topbar component
import UserProfile from "./components/UserProfile.jsx";
import PageNotFound from "./components/PageNotFound.jsx"
import Verify from "./components/Verify.jsx";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
};

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public route */}
          <Route element={<PersistenLogin />}>
            <Route caseSensitive={true} path="/login" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Topbar message="/login"/>
              </Suspense>
            } />
            <Route caseSensitive={true} path="/signup" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Topbar message="/signup"/>
              </Suspense>
            } />
            <Route caseSensitive={true} path="/verifyEmail" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Verify/>
              </Suspense>
            } />
            
            {/* Protected route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              {/* Add protected routes here */}
              <Route path="/userprofile" element={<UserProfile/>} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
