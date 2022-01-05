import { setUpTransactionsTable } from "./transactions.js";
import { setUpModal } from "./modal.js";
import { setUpColorScheme } from "./color-scheme.js"
import { setMockData } from "./mock-data.js";
import { setStatsOnUi } from "./stats.js";

// INITIAL PAGE SETUP
setUpColorScheme();
setUpTransactionsTable();
setUpModal();
setMockData();
setStatsOnUi();