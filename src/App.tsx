import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./components/Global/Project/Projects";
import DeviceGroups from "./components/Global/DeviceGroup/DeviceGroups";
import Vendors from "./components/Global/Vendor/Vendors";
import ProjectDetails from "./components/Global/Project/ProjectDetails";
import DeviceGroupDetails from "./components/Global/DeviceGroup/DeviceGroupDetails";
import VendorDetails from "./components/Global/Vendor/VendorDetails";
import NewProject from "./components/Global/Project/NewProject";
import NewDeviceGroup from "./components/Global/DeviceGroup/NewDeviceGroup";
import NewVendor from "./components/Global/Vendor/NewVendor";
import EditProject from "./components/Global/Project/EditProject";
import EditDeviceGroup from "./components/Global/DeviceGroup/EditDeviceGroup";
import EditVendor from "./components/Global/Vendor/EditVendor";
import Devices from "./components/Global/Device/Devices";
import DeviceDetails from "./components/Global/Device/DeviceDetails";
import Reports from "./components/Global/Report/Reports";
import ReportDetails from "./components/Global/Report/ReportDetails";
import HomePage from "./components/Global/Home/Home";
import NotFound from "./components/Global/NotFound/NotFound";
import Main from "./components/Global/Layout/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="projects/edit/:projectId" element={<EditProject />} />

          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/new" element={<NewVendor />} />
          <Route path="vendors/:vendorId" element={<VendorDetails />} />
          <Route path="vendors/edit/:vendorId" element={<EditVendor />} />

          <Route path="deviceGroups" element={<DeviceGroups />} />
          <Route path="deviceGroups/new" element={<NewDeviceGroup />} />
          <Route
            path="deviceGroups/:deviceGroupId"
            element={<DeviceGroupDetails />}
          />
          <Route
            path="deviceGroups/edit/:deviceGroupId"
            element={<EditDeviceGroup />}
          />

          <Route path="devices" element={<Devices />} />
          <Route path="devices/:deviceId" element={<DeviceDetails />} />

          <Route path="reports" element={<Reports />} />
          <Route path="reports/:reportId" element={<ReportDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
