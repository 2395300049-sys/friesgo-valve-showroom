"""Build the existing static customer site; keep its published URL unchanged.
Usage: python3 build.py /path/to/esbuild
"""
from pathlib import Path
import hashlib,json,re,subprocess,sys
root=Path(__file__).resolve().parent
esbuild=sys.argv[1] if len(sys.argv)>1 else 'esbuild'
files=['index.html','solutions.html','product.css','customer-ui.js','solutions-i18n.js','solutions-mobile.css','workbench.css','src/product-viewer.js','src/photo-products.js','src/solutions.js','src/render-loop.js','assets/OrbitControls.js']
pattern=re.compile(r'v=(?:20261102-r\d+|release-[a-f0-9]{12})')
normalized=[f+'\n'+pattern.sub('v=__VERSION__',(root/f).read_text()) for f in files]
version='release-'+hashlib.sha256('\n'.join(normalized).encode()).hexdigest()[:12]
for f in files:
 p=root/f;p.write_text(pattern.sub('v='+version,p.read_text()))
for source,target in [('assets/three.module.js','assets/three.r160.min.js'),('src/product-viewer.js','src/product-viewer.min.js'),('src/solutions.js','src/solutions.min.js')]:
 subprocess.run([esbuild,str(root/source),'--minify','--charset=utf8','--target=es2020','--format=esm','--legal-comments=inline','--outfile='+str(root/target)],check=True)
# Existing application bookmarks keep working without a second Three.js bundle.
(root/'viewer.bundle.js').write_text("/* Legacy entry; shared engine and current application. */\nimport('./src/solutions.min.js?v="+version+"').catch(()=>{const e=document.getElementById('scene-error');if(e)e.hidden=false;});\n")
meta={'version':version,'public_entry':'https://2395300049-sys.github.io/friesgo-valve-showroom/','cad_geometry_unchanged':True,'photo_geometry':'exterior reconstruction; no certified dimensions','economic_module':False,'initial_product_js_bytes':sum((root/f).stat().st_size for f in ['assets/three.r160.min.js','assets/OrbitControls.js','src/product-viewer.min.js','src/photo-products.js','src/render-loop.js','customer-ui.js'])}
(root/'build-meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(meta,ensure_ascii=False))
