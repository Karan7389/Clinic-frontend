import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import ChangePassword from "./ChangePassword";

import Dashboard from "./Dashboard";

import Home from "./Home";
import Doctors from "./Doctors";
import TreatmentsHub from "./TreatmentsHub";
import SingleTreatment from "./SingleTreatment";
import PublicGallery from "./Gallery";

import TreatmentsList from "./TreatmentsList";
import TreatmentForm from "./TreatmentForm";
import Gallery from "./AdminGallery";
import Appointments from "./Appointments";
import Leads from "./Leads";
import Subscribers from "./Subscribers";
import Contact from "./Contact";
import About from "./About";
import FAQ from "./Faq";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import RefundWarranty from "./RefundWarranty";

import Layout from "./Layout";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* -------- PUBLIC PAGES WITH LAYOUT -------- */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<TreatmentsHub />} />
        <Route path="/treatments/:slug" element={<SingleTreatment />} />
        <Route path="/gallery" element={<PublicGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/policies/privacy" element={<PrivacyPolicy />} />
        <Route path="/policies/terms" element={<TermsOfUse />} />
        <Route path="/policies/refund-warranty" element={<RefundWarranty />} />
      </Route>

      {/* -------- LOGIN WITHOUT LAYOUT -------- */}
      <Route path="/login" element={<Login />} />

      {/* -------- ADMIN DASHBOARD ROUTES -------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard /> {/* SIDEBAR + OUTLET */}
          </ProtectedRoute>
        }
      >
        <Route index element={<Leads />} />
        <Route path="treatments" element={<TreatmentsList />} />
        <Route path="treatments/add" element={<TreatmentForm />} />
        <Route path="treatments/edit/:id" element={<TreatmentForm />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="/dashboard/subscribers" element={<Subscribers />} />
      </Route>

      {/* -------- CHANGE PASSWORD OUTSIDE ADMIN -------- */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* -------- 404 FALLBACK -------- */}
      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
}
