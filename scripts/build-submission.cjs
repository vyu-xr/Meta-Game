const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const dependencies = process.env.SUBMISSION_NODE_MODULES || path.join(process.env.TEMP, 'meta-game-browser-check', 'node_modules');
const JSZip = require(path.join(dependencies, 'jszip'));
const { Document, Packer, Paragraph, TextRun } = require(path.join(dependencies, 'docx'));
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'submission', process.argv[2] || 'v1');
if (!output.startsWith(path.join(root, 'submission') + path.sep)) throw new Error('Invalid output folder');
if (fs.existsSync(output)) throw new Error('Output already exists; choose a new version name.');
const game = path.join(output, 'game');
fs.mkdirSync(game, { recursive: true });

execFileSync(process.execPath, [path.join(__dirname, 'build-offline.cjs')], { stdio: 'inherit' });
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/offline-data.js'), 'utf8'), sandbox);
const assets = sandbox.window.offlineGameAssets;
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const loader = "    <script>\n        if (location.protocol === 'file:') {\n            document.write('<script src=\"assets/offline-data.js\"><\\/script>');\n        }\n    </script>";
if (!html.includes(loader)) throw new Error('Offline loader changed; update packaging integration.');
const json = JSON.stringify(assets, null, 2).replace(/</g, '\\u003c');
html = html.replace(loader,
    '    <!-- Asset data for direct-file playback; all game logic remains readable below. -->\n' +
    '    <script id="offline-asset-data" type="application/json">\n' + json + '\n    </script>\n' +
    "    <script>\n        if (location.protocol === 'file:') {\n" +
    "            window.offlineGameAssets = JSON.parse(document.getElementById('offline-asset-data').textContent);\n" +
    "        }\n    </script>");
html = html.replace(/<title>[^<]*<\/title>/, "<title>Grandma's Veil</title>");
if (/src=["'](?:https?:)?\/\//i.test(html)) throw new Error('External runtime script or asset');
const files = new Map([['index.html', Buffer.from(html)]]);
for (const name of Object.keys(assets)) files.set(name, fs.readFileSync(path.join(root, name)));
files.set('assets/audio/Rite_of_the_Hollow_Glade.mp3', fs.readFileSync(path.join(root, 'assets/audio/Rite_of_the_Hollow_Glade.mp3')));
for (const name of ['three.min.js', 'GLTFLoader.js', 'nipplejs.min.js', 'three-LICENSE.txt', 'nipplejs-LICENSE.txt']) {
    files.set('vendor/' + name, fs.readFileSync(path.join(root, 'vendor', name)));
}
const zip = new JSZip();
for (const [name, buffer] of files) {
    const target = path.join(game, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buffer);
    zip.file(name, buffer);
}

const sections = [
    ['1. Game title and genre', "Grandma's Veil - Survival & Resource Management."],
    ['2. Target player and pitch', 'For mobile players who enjoy supernatural mysteries, short survival sessions, and timing challenges. A young person is separated from their body; Grandma helps protect their connection while they search for a way back. The tone is magical and eerie, without gore.'],
    ['3. How to play (controls)', 'Use the touch joystick to move and SLASH to attack in the direction you face. Opening panels advance automatically or by tapping. Clear the opening night, then select NEXT and BEGIN on the instructions. Walk to Exit markers to travel; tap map destinations. Approach the shop platform for dialogue and the free Human Form Card. In the circus tent, follow the story, press START, and use JUMP while moving to collect four stone parts.'],
    ['4. Core loop', 'Defend the ritual at night, earn Soul Coins, and use daytime to travel and attempt the circus challenge before the next night. Both the soul and ritual share one Body Connection meter. Enemy telegraphs, slash effects, health feedback, and coin rewards communicate results. Clearing every scheduled ghost wins the night; losing all connection triggers a retry and forfeits half the coins earned during that attempt. Earlier savings remain. Connection resets between nights and retries. The circus ends on one collision or succeeds after four collected parts. Repeating the loop tests positioning, timing, and daytime choices.'],
    ['5. What is in this prototype', 'Five connected areas: basement arena, home lobby, travel map destinations at the shop and circus, and the circus tent interior. Includes opening and ringmaster stories, temporary human-form sprites, timed daytime, two-wave later nights, directional combat, and a four-part jump challenge. Current waves use Drifter and Skitter ghosts; Stalker and Warden behaviors exist but are not scheduled. Three shop upgrade cards are displayed and locked. Crafting, trading for the remaining stones, and the full ritual ending are not implemented.'],
    ['6. Progression and signature twist', 'The first night has one wave; subsequent nights add a mixed second wave. The Human Form Card unlocks circus travel. Each circus attempt consumes a daytime part, including failures; at most two attempts fit each day. Obstacles expand from one approach direction to several. The shared Body Connection makes defending the body and protecting yourself the same survival problem.'],
    ['7. Future-state vision', 'Expand the three-stone journey: earn one through the circus challenge, craft another from a shop recipe using gathered plants, rocks, and soul energy, and trade coins or specific soul energy with a greedy owner for the third. Completing three stones and three candles restores the spirit-body connection.']
];
const words = sections.flat().join(' ').trim().split(/\s+/).length;
if (words > 500) throw new Error('Design document exceeds 500 words: ' + words);
const paragraphs = [];
for (const [heading, text] of sections) {
    paragraphs.push(new Paragraph({ keepNext: true, spacing: { before: 140, after: 60 }, children: [new TextRun({ text: heading, bold: true })] }));
    paragraphs.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun(text)] }));
}
const document = new Document({
    creator: '', lastModifiedBy: '', title: "Grandma's Veil - Design-Intent Document",
    styles: { default: { document: { run: { font: 'Arial', size: 22 }, paragraph: { spacing: { line: 260 } } } } },
    sections: [{ properties: { page: { margin: { top: 850, bottom: 850, left: 850, right: 850 } } }, children: paragraphs }]
});
(async () => {
    const zipped = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    if (zipped.length > 35000000) throw new Error('ZIP exceeds 35 MB');
    fs.writeFileSync(path.join(output, 'game.zip'), zipped);
    fs.writeFileSync(path.join(output, 'DESIGN_INTENT.docx'), await Packer.toBuffer(document));
    fs.copyFileSync(path.join(root, 'BUILD_LOG.md'), path.join(output, 'buildlog.md'));
    const manifest = { zipBytes: zipped.length, zipMB: zipped.length / 1000000, designWords: words, files: [...files.keys()] };
    fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log(JSON.stringify({ output, zipBytes: zipped.length, zipMB: zipped.length / 1000000, designWords: words, runtimeFiles: files.size }));
})().catch(error => { console.error(error); process.exitCode = 1; });

