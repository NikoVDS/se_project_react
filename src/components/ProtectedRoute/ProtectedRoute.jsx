import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

<Route
  path="/profile"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Profile />
    </ProtectedRoute>
  }
/>;
