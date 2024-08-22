/**
 * @file Baseline values for the configuration options of the application.
 */

import { type Config } from 'config';

import { LayerType } from '~/model/layers';

const skybrushIcon =
  "data:image/png;base64,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";

const baseline: Config = {
  branding: {
    splashIcon: {
      srcSet: {
        default: skybrushIcon,
        twoX: skybrushIcon,
      },
      width: 96,
      height: 96,
    },
    splashTitle: 'Drone Intelligence',
  },

  ephemeral: false,

  examples: {
    shows: [],
  },

  features: {
    loadShowFromCloud: false,
    missionEditor: false,
  },

  headerComponents: [
    ['uav-status-summary'],
    [
      'battery-status-header-button',
      'distance-summary-header-button',
      'altitude-summary-header-button',
      'velocity-summary-header-button',
      'rtk-status-header-button',
    ],
    ['weather-header-button'],
    ['connection-status-button'],
    [
      'server-connection-settings-button',
      'safety-button',
      'authentication-button',
    ],
    [
      'broadcast-button',
      'toolbox-button',
      'app-settings-button',
      'alert-button',
      'help-button',
      'full-screen-button',
      'session-expiry-box',
    ],
  ],

  language: {
    default: 'en',
    enabled: new Set(['de', 'en', 'hu', 'it', 'ja', 'zh-Hans']),
    fallback: 'en',
  },

  map: {
    drawingTools: [
      ['select', 'zoom'],
      [
        'add-marker',
        'draw-path',
        'draw-circle',
        'draw-rectangle',
        'draw-polygon',
        'cut-hole',
        'edit-feature',
      ],
    ],

    features: {
      onCreate() {
        /* do nothing */
      },
    },

    layers: [
      { id: 'base', type: LayerType.BASE, label: 'Base map' },
      { id: 'graticule', type: LayerType.GRATICULE, label: 'Graticule' },
      { id: 'beacons', type: LayerType.BEACONS, label: 'Beacons' },
      { id: 'features', type: LayerType.FEATURES, label: 'Features' },
      { id: 'home', type: LayerType.MISSION_INFO, label: 'Mission info' },
      { id: 'uavs', type: LayerType.UAVS, label: 'UAVs' },
    ],

    locations: [
      {
        id: 'budapest',
        name: 'Budapest',
        center: { lon: 19, lat: 47.5 },
        rotation: 0,
        zoom: 11,
        notes: 'The capital of Hungary',
      },
      {
        id: 'elte',
        name: 'ELTE Garden',
        center: { lon: 19.0622, lat: 47.4733 },
        rotation: 348,
        zoom: 17,
        notes: '',
      },
    ],

    origin: {
      position: [19.0622, 47.4733],
      angle: '348',
    },

    view: {
      position: [19, 47.5],
      angle: '0',
      zoom: 11,
    },
  },

  optimizeForSingleUAV: {
    default: false,
    force: false,
  },

  optimizeUIForTouch: {
    default: null,
    force: false,
  },

  perspectives: ['default'],

  ribbon: {
    label: null,
    position: 'bottomRight',
  },

  server: {
    connectAutomatically: true,
    preventAutodetection: false,
    preventManualSetup: false,
    hostName: 'localhost',
    port: null,
    isSecure: null,
    warnClockSkew: true,
  },

  session: {
    maxLengthInSeconds: null,
  },

  toastPlacement: 'top-center',
  tour: null,

  urls: {
    help: 'https://doc.collmot.com/public/skybrush-live-doc/latest',
    exit: null,
  },
};

export default baseline;
