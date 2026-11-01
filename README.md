# FriesGo Interactive 3D Showroom

Live customer entry: https://2395300049-sys.github.io/friesgo-valve-showroom/?product=dp&lang=en

This existing repository is published from `main` through GitHub Pages. Preserve the account, repository name, public access and URL: the customer QR encodes this entry directly. Publishing changes to the same repository updates the existing entry.

Edit `product.css` and `customer-ui.js` for the product interface. `src/product-viewer.js` owns rendering; `src/photo-products.js` owns the two photographic exterior reconstructions. `src/solutions.js` owns the retained four building scenes and service workbench. `src/render-loop.js` schedules rendering. The original flow-valve CAD meshes are retained in `assets/flow-cad`.

Run `python3 build.py /path/to/esbuild` after source changes. This creates repeatable content-based cache tags, minifies the shared Three.js engine and the two viewer entries, and retains the old application entry as a compatibility loader. `customer.css` is retained only for old cached pages; the current product page uses `product.css`.

The two photo-based models are exterior reconstructions with inferred proportions, not measured manufacturing CAD. The differential-pressure valve rear extension follows the marked side-view photograph; its six control-cover fasteners avoid the central brass ends. The flow-valve section retains the supplied CAD geometry. Building scenes and service steps are illustrative and require the actual product/project procedure for field work. There is no operating-economics module.

No open-source license is granted for the product assets. Three.js remains under its included MIT license in `assets/THREE-LICENSE.txt`.
