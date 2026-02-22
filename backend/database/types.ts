export type Service = {
  title: string;
  category: string;

  // identità / UI
  slug: string;
  brandName?: string;
  website?: string;
  logoUrl?: string;

  // disponibilità
  countries: string[];
  uiLanguages?: string[];
  audioLanguages?: string[];
  subtitleLanguages?: string[];
  availabilityNotes?: string[];

  // ads
  hasAds: boolean;
  hasAdTier?: boolean;
  avgAdsPerHour?: number;

  // piani
  planNames?: string[];
  pricesMonthly?: number[];
  currency?: string;
  billingPeriods?: string[];
  includesAdsByPlan?: boolean[];

  // streaming specs
  streamingQuality: string[];
  hdrSupport?: string[];
  audioSupport?: string[];

  // limiti / feature
  supportedDevices?: string[];
  simultaneousStreamsMax?: number;
  offlineDownloads?: boolean;
  maxDownloadDevices?: number;

  // catalogo
  contentTypes?: string[];
  topGenres?: string[];
  catalogSize?: number;
  originalContents?: boolean;
  parentalControls?: boolean;
  watchParty?: boolean;

  // popularity
  subCount?: number;
  monthlyWatchers?: number;
  dailyWatchers?: number;

  // meta
  tags?: string[];
  score?: number;
  lastUpdated?: string;
  sources?: string[];
};
