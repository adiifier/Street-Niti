import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './Pages/VednorPages/SignInPage';
import AdminSignupPage from './Pages/AdminPages/AdminSignupPage';
import VendorSignupPage from './Pages/VednorPages/VendorSignupPage';
import LandingPage from './Pages/LandingPage';
import VendorHomePage from './Pages/VednorPages/VendorHomePage';
import VendorApplicationsFormPage from './Pages/VednorPages/VendorApplicationsFormPage';
import VendorApplicationPage from './Pages/VednorPages/VendorApplicationPage';
import VendorAllApplications from './Pages/VednorPages/VendorAllApplications';
import AdminApplicationsPage from './Pages/AdminPages/AdminApplicationsPage';
import AdminSingleApplicationPage from './Pages/AdminPages/AdminSingleApplicationPage';
import VendorStalls from './Pages/VednorPages/VendorStallsPage';
import VendorSingleStallPage from './Pages/VednorPages/VendorSingleStallPage';
import AboutUs from './Pages/AboutUs';
import AdminLogInPage from './Pages/AdminPages/AdminLoginPage';
import AdminHomePage from './Pages/AdminPages/AdminHomePage';
import AdminStalls from './Pages/AdminPages/AdminStalls';
import AdminAboutUs from './Pages/AdminPages/AdminAboutUs';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route> //Landing Page For Both
          <Route path="/sign-in" element={<SignInPage />}></Route> //Signin Page for Vendor
          <Route path="/vendor/sign-up" element={<VendorSignupPage />}></Route> //Vendor Signup Page
          <Route path="/vendor/home" element={<VendorHomePage />}></Route> //Vendor Home Page
          <Route path="/vendor/apply" element={<VendorApplicationsFormPage />}></Route> //Vendor Application applly page
          <Route path="/vendor/application" element={<VendorApplicationPage />}></Route> //Vendor Single appl. view page
          <Route path="/vendor/applications" element={<VendorAllApplications />}></Route> // Vendor All Applications
          Page Page
          <Route path="/aboutUs" element={<AboutUs />}></Route> //Vendor Single Stall Page
          <Route path="/vendor/stalls" element={<VendorStalls />}></Route> //Vendor Stalls Page
          <Route path="/vendor/stall" element={<VendorSingleStallPage />}></Route> //Vendor Single Stall Page //Admin
          Routes
          <Route path="/admin/stalls" element={<AdminStalls />}></Route> //Admin stalls
          <Route path="/admin/application" element={<AdminSingleApplicationPage />}></Route> //Admin SIngle Application
          <Route path="/admin/applications" element={<AdminApplicationsPage />}></Route> //Admin All Application Page
          <Route path="/sign-in/admin" element={<AdminLogInPage />}></Route> //Signin Page for Admin
          <Route path="/admin/sign-up" element={<AdminSignupPage />}></Route> //Admin Signup Page
          <Route path="/admin/home" element={<AdminHomePage />}></Route> //Admin Signup Page
          <Route path="/admin/aboutUs" element={<AdminAboutUs />}></Route> //Admin AboutUs Page
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
