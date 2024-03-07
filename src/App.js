import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import NewMember from 'pages/NewMember';
import GradeCal from 'pages/GradeCal';
import ByteCount from 'pages/ByteCount';
// import Layout from './components/Layout';
// import useAxiosInterceptor from 'hooks/useAxiosInterceptor';

function App() {
  // useAxiosInterceptor();

  return (
    <Routes>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/newmember" element={<NewMember />} />
        <Route path="/gradecal" element={<GradeCal />} />
        <Route path="/bytecount" element={<ByteCount />} />
      </Route>
    </Routes>
  );
}

export default App;
