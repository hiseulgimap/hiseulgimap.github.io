import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Episodes from './page/Episodes';
import EpisodeDetail from './page/EpisodeDetail';
import Feedback from './page/Feedback';
import Home from './page/Home';
import ImagePreview from './page/ImagePreview';
import LocationDetail from './page/LocationDetail';
import Locations from './page/Locations';
import MyMaps from './page/MyMaps';
import UsageGuide from './page/UsageGuide';
import YouTube from './page/YouTube';

import Geocode from './page/Geocode';

import AppLayout from './UI/layout/AppLayout';
import HomeLayout from './UI/layout/HomeLayout';

import { MAP_STORAGE_KEY, MEMO_STORAGE_KEY } from './util/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const CustomRouter = () => {
  const location = useLocation();

  useEffect(() => {
    const initialData = [];

    const appData = localStorage.getItem(MAP_STORAGE_KEY);
    const memoData = localStorage.getItem(MEMO_STORAGE_KEY);

    if (!appData) localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(initialData));
    if (!memoData) localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(initialData));
  }, []);

  return (
    <Routes location={location}>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path=":category" element={<Locations />} />
        <Route path=":category/:locationId" element={<LocationDetail />} />
        <Route path="episode" element={<Episodes />} />
        <Route path="episode/:episodeId" element={<EpisodeDetail />} />
        <Route path="my-map" element={<MyMaps />} />
        <Route path="youtube/:youtubeId" element={<YouTube />} />
        <Route path="preview/:folderId" element={<ImagePreview />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="guide" element={<UsageGuide />} />
        <Route path="geo" element={<Geocode />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-center"
        gutter={8}
        containerStyle={{ margin: '1.5rem' }}
        toastOptions={{
          duration: 2100,
          removeDelay: 700,
          style: {
            color: 'var(--color-font)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            padding: '0.75rem 1rem',
            border: 'var(--border-solid)',
            boxShadow: 'var(--shadow)',
            backgroundColor: 'var(--color-toast-content)',
            transition: 'color var(--transition), border-color var(--transition), box-shadow var(--transition), background-color var(--transition)',
          },
        }}
      />
      <BrowserRouter basename="/">
        <CustomRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
