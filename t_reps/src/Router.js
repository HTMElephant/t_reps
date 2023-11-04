import { Route, Routes } from 'react-router-dom';
import Workouts from './components/Workouts';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Workouts />} />
    </Routes>
  );
};

export default Router;
