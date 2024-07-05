import * as esb from 'esbuild';
import fs from 'fs';


let caughtE = [];

let output = await esb.build({
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


output = await esb.build({
    entryPoints: [
      'scripts/components/**/*.js'
    ],
    minify: true,
    bundle: true,
    outdir: 'build/components',
});
caughtE = output.errors ? [ ...caughtE, ...output.errors ] : caughtE;

fs.copyFile('index.html','build/index.html', (err) => {
  if (err)
    caughtE.push(`copy file index.html failed: ${err}`);
});

if (!fs.existsSync('build/data'))
  fs.mkdirSync('build/data');

// we do not have a database at this time so data is local
fs.copyFile('data/participants.json', 'build/data/participants.json', (err) => {
  if (err)
    caughtE.push(`copy file participants.json failed: ${err}`);
});

// we do not have a cdn at this time so resources are local
let participantData = fs.readFileSync('./data/participants.json', {encoding: 'utf-8'});
participantData = JSON.parse(participantData);
// move participant content to build
participantData.participants.forEach((participant) => {
    const key = participant.developerKey;
    if (key) {
        // move scripts
        // scripts are specific projects a participant would like to showcase in the gallery
        

        // move profile images
        if (fs.existsSync(`data/${key}/${participant.profileImage}`)) {
            if (!fs.existsSync(`build/data/${key}`))
                fs.mkdirSync(`build/data/${key}`);

            fs.copyFile(`data/${key}/${participant.profileImage}`, `build/data/${key}/${participant.profileImage}`, (err) => {
                if (err)
                  caughtE.push(`copy file data/${key}/${participant.profileImage} failed: ${err}`);
              });
        }
    }

});


if (caughtE.length)
  throw new Error(`build has errors: ${JSON.stringify(caughtE)}`);