/* System Modules' imports */
import React, { lazy, Suspense, useEffect } from "react";

/* Dependencies' imports */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/ui/Loader";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
const ExplorationSamples = lazy(() => import("@/pages/explorationSamples/index.jsx"));
const DestructiveTests = lazy(() => import("@/pages/destructiveTests/index.jsx"));
const MiningGeoSamples = lazy(() => import("@/pages/miningGeoSamples/index.jsx"));
const IcbaWaterSamples = lazy(() => import("@/pages/icbaWaterSamples/index.jsx"));
const IcbaOtherSamples = lazy(() => import("@/pages/icbaOtherSamples/index.jsx"));
const ExperimentType = lazy(() => import("@/pages/experimentType/index.jsx"));
const ResearchType = lazy(() => import("@/pages/researchType/index.jsx"));
const Statistics = lazy(() => import("@/pages/statistics/index.jsx"));

const Error404 = lazy(() => import("@/pages/errors/Error404.jsx"));

const AppRoutes = () => {
  const { userModules, loading } = useAuth();

  if (loading) return <Loader />;

  const routeComponentMap = {
    "": <Statistics />,
    "exploration-type": <ExplorationSamples />,
    "destructive-test": <DestructiveTests />,
    "mining-geology-example": <MiningGeoSamples />,
    "icba-water-example": <IcbaWaterSamples />,
    "icba-other-example": <IcbaOtherSamples />,
    "experiment-type":<ExperimentType/>,
    "research-type":<ResearchType/>
  };

  const dynamicRoutes = userModules?.map((mod) => {
    const path = mod.key;
    const element = routeComponentMap[path];
    if (!element) return null;
    const permission = mod.right_key==='full'?true:false
    const elementWithProps = React.cloneElement(element, { permission: permission });
    return <Route key={path} path={path} element={elementWithProps} />;
  });


  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
       {dynamicRoutes}
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

const Index = () => {
  return (
    <BrowserRouter basename="/lab">
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Index;
