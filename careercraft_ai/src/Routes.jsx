import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SkillGapAnalysis from './pages/skill-gap-analysis';
import JobMatching from './pages/job-matching';
import LearningRoadmap from './pages/learning-roadmap';
import ResumeTailoringPage from './pages/resume-tailoring';
import CareerPathRecommendations from './pages/career-path-recommendations';
import ResumeUpload from './pages/resume-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CareerPathRecommendations />} />
        <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
        <Route path="/job-matching" element={<JobMatching />} />
        <Route path="/learning-roadmap" element={<LearningRoadmap />} />
        <Route path="/resume-tailoring" element={<ResumeTailoringPage />} />
        <Route path="/career-path-recommendations" element={<CareerPathRecommendations />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
