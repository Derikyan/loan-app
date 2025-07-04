import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import FormWrapper from "./FormWrapper";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";

function App() {
  return (
    <BrowserRouter>
      <FormWrapper>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Step1 />} />
            <Route path="loan-app" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
            <Route path="step3" element={<Step3 />} />
          </Route>
        </Routes>
      </FormWrapper>
    </BrowserRouter>
  );
}

export default App;
