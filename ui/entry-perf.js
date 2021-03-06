// Webpack entry point for perf.html

// Vendor Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'metrics-graphics/dist/metricsgraphics.css';

// Vendor JS
import 'bootstrap';
// The official 'flot' NPM package is out of date, so we're using 'jquery.flot'
// instead, which is identical to https://github.com/flot/flot
import 'jquery.flot';
import 'jquery.flot/jquery.flot.time';
import 'jquery.flot/jquery.flot.selection';

// Perf Styles
import './css/treeherder-global.css';
import './css/treeherder-navbar.css';
import './css/perf.css';
import './css/treeherder-loading-overlay.css';

// Bootstrap the Angular modules against which everything will be registered
import './js/perf';

// Perf JS
import './js/filters';
import './js/controllers/perf/compare';
import './js/controllers/perf/graphs';
import './js/controllers/perf/alerts';
import './js/components/perf/compare';
import './js/components/loading';
import './js/perfapp';
import './perfherder/CompareSelectorView';
import './perfherder/RevisionInformation';
