import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {!user ? (
              <Route path="/" element={<Homepage />} />
            ) : (
              <Route path="/" element={<Feed />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Homepage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start items-center text-center">
      {/* Main container */}
      <div className="py-16 px-6 max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-primary mb-6">
          Welcome to CodeMate
        </h1>
        <p className="text-xl mb-10 text-neutral">
          The place where developers connect, learn, and grow together.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body">
              <h2 className="card-title text-2xl font-semibold justify-center">
                Connect
              </h2>
              <p>
                Send connection requests to developers and expand your network.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body">
              <h2 className="card-title text-2xl font-semibold justify-center">
                Chat
              </h2>
              <p>
                Engage in real-time conversations with your new connections.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body">
              <h2 className="card-title text-2xl font-semibold justify-center">
                Learn
              </h2>
              <p>
                Share knowledge and improve your coding skills through
                collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Signup Button */}
        <div className="mt-8">
          <Link
            to="/login"
            className="btn btn-accent text-white py-3 px-10 text-xl font-semibold"
          >
            Join Codemate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
