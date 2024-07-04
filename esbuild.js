import * as esb from 'esbuild';
import fs       from 'fs';

let caughtE = [];

let output = esb.build({
  entryPoints: [
    'scripts/main.js',
    'scripts/participants.js',
    'scripts/main.css',
  ],
  minify: true,
  bundle: true,
  outdir: 'build',
});

caughtE = output.errors ? [ ...caughtE, ...output.errors ] : caughtE;

fs.copyFile('index.html','build/index.html', (err) => {
  if (err)
    caughtE.push(`copy file index.html failed: ${err}`);
});

if (!fs.existsSync('build/data'))
  fs.mkdirSync('build/data');

fs.copyFile('data/participants.json', 'build/data/participants.json', (err) => {
  if (err)
    caughtE.push(`copy file participants.json failed: ${err}`);
});


if (caughtE.length)
  throw new Error(`build has errors: ${JSON.stringify(caughtE)}`);