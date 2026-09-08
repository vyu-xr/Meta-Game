const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const deps = path.join(process.env.TEMP, 'meta-game-browser-check/node_modules');
const JSZip = require(path.join(deps, 'jszip'));
const { chromium } = require(path.join(deps, 'playwright'));
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'submission', process.argv[2] || 'v1');

(async () => {
    const zip = await JSZip.loadAsync(fs.readFileSync(path.join(output, 'game.zip')));
    assert(zip.file('index.html'), 'index.html must be at ZIP root');
    const extraction = fs.mkdtempSync(path.join(process.env.TEMP, 'grandmas-veil-verify-'));
    for (const [name, entry] of Object.entries(zip.files)) {
        if (entry.dir) continue;
        const target = path.resolve(extraction, name);
        assert(target.startsWith(extraction + path.sep));
        assert(!/\.(fbx|psd|blend|cjs)$/i.test(name), 'Editor/build file included');
        assert(!name.endsWith('.js') || name.startsWith('vendor/'), 'Own game JS outside index.html');
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, await entry.async('nodebuffer'));
    }
    const server = http.createServer((req, res) => {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const target = path.resolve(extraction, '.' + (pathname === '/' ? '/index.html' : pathname));
        if (!target.startsWith(extraction + path.sep)) { res.writeHead(403); res.end(); return; }
        fs.readFile(target, (error, data) => {
            const types = { '.html': 'text/html', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
            res.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
            res.end(error ? 'Missing' : data);
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    let browser;
    const results = [];
    try {
        browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader'] });
        for (const mode of ['file-mobile', 'file-desktop', 'server-mobile']) {
            const direct = mode.startsWith('file');
            const desktop = mode.endsWith('desktop');
            const context = await browser.newContext({
                viewport: desktop ? { width: 1280, height: 800 } : { width: 390, height: 844 },
                isMobile: !desktop, hasTouch: !desktop, offline: direct
            });
            const page = await context.newPage();
            const errors = [], failed = [], external = [];
            page.on('pageerror', e => errors.push(e.message));
            page.on('requestfailed', r => failed.push(r.url().slice(0, 140)));
            page.on('request', r => {
                if (/^https?:/.test(r.url()) && !r.url().startsWith('http://127.0.0.1:')) external.push(r.url());
            });
            await page.goto(direct ? pathToFileURL(path.join(extraction, 'index.html')).href : 'http://127.0.0.1:' + server.address().port, { waitUntil: 'load' });
            await page.waitForFunction(() => lobbyReady && shopReady && circusReady && circusTentReady);
            await page.locator('#story-intro-overlay').click({ position: { x: 80, y: 80 } });
            await page.waitForFunction(() => !gameMusic.paused);
            await page.waitForFunction(() => storyIntroMode === 'slates');
            assert.equal(await page.evaluate(() => gameMusic.volume), 0.25);
            assert.equal(await page.evaluate(() => gameMusic.loop), true);
            assert.deepEqual(await page.evaluate(() => [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.id)), []);
            const counts = await page.evaluate(() => [basementGroup, lobbyGroup, shopGroup, circusGroup, circusTentGroup].map(g => g.children.length));
            await page.evaluate(() => {
                isStoryIntroActive = false;
                storyIntroOverlay.classList.add('hidden');
                isIntroCinematic = false;
                isTransitioning = false;
                setFade(false);
                wavePauseTimer = 1000;
            });
            // State-driven checks isolate win/retry/UI transitions without changing the packaged code.
            await page.evaluate(() => { soulCoins = 20; nightCoinsEarned = 10; connectionHealth = 0; });
            await page.waitForFunction(() => nightFailHandled);
            assert.equal(await page.evaluate(() => soulCoins), 15);
            await page.waitForFunction(() => connectionHealth === 100 && !nightFailHandled);
            await page.evaluate(() => {
                clearEnemies();
                currentWaveSpawnIndex = getCurrentWave().ghosts.length;
                wavePauseTimer = 0;
            });
            await page.waitForFunction(() => nightInstructions.active);
            await page.locator('#night-instructions-next').click();
            await page.locator('#night-instructions-next').click();
            assert.equal(await page.evaluate(() => gameTime.phase), 'day');
            await page.evaluate(() => { switchArea('shop'); openShopStarterPurchase(); });
            await page.waitForTimeout(700);
            await page.evaluate(() => { shopStarterCard.dialogueSeen = true; showShopStage('offer'); });
            await page.locator('#shop-purchase-buy').click();
            await page.waitForFunction(() => shopStarterCard.stage === 'catalogue');
            assert.equal(await page.evaluate(() => humanFormUnlocked), true);
            await page.evaluate(() => closeShopStarterPurchase());
            await page.evaluate(() => {
                switchArea('circusTent');
                tentTrial.ownerDeparted = true;
                document.getElementById('circus-story-screen').hidden = true;
                document.body.classList.remove('tent-briefing');
                startTentGameplay();
            });
            await page.waitForTimeout(300);
            await page.evaluate(() => {
                clearTentTrialRuntime();
                tentTrial.state = 'play';
                tentTrial.activeCollectible = 3;
                tentTrial.nextCollectibleTimer = 0;
                tentTrial.nextObstacleTimer = 100;
                const part = tentTrial.collectibles[3];
                part.visible = true;
                part.position.copy(characterGroup.position);
            });
            await page.waitForFunction(() => tentTrial.completed);
            assert.equal(await page.evaluate(() => tentTrial.state), 'complete');
            await page.evaluate(() => {
                document.getElementById('circus-story-screen').hidden = true;
                document.getElementById('tent-briefing').hidden = true;
                document.body.classList.remove('tent-briefing');
                nightInstructions.completed = true;
                gameTime.dayPartTimer = 0;
                gameTime.dayPartDuration = 10000;
                tentTrial.ownerDeparted = true;
            });
            const pixels = [];
            for (const area of ['basement', 'lobby', 'shop', 'circus', 'circusTent']) {
                await page.evaluate(a => switchArea(a), area);
                await page.waitForTimeout(750);
                pixels.push(await page.evaluate(area => {
                    renderer.render(scene, camera);
                    const gl = renderer.getContext();
                    const data = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
                    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);
                    let colored = 0;
                    for (let i = 0; i < data.length; i += 4) if (data[i] + data[i + 1] + data[i + 2] > 60) colored++;
                    return { area, colored, error: gl.getError() };
                }, area));
                await page.screenshot({ path: path.join(output, mode + '-' + area + '.png') });
            }
            assert(pixels.every(x => x.colored > 1000 && x.error === 0));
            assert.deepEqual(errors, []);
            assert.deepEqual(failed, []);
            assert.deepEqual(external, []);
            results.push({ mode, counts, pixels, javascriptErrors: errors, failedRequests: failed, externalRequests: external, stateChecks: ['night failure/retry', 'night clear/instructions/day', 'human form gift/catalogue', 'circus success'] });
            console.log(mode, 'passed');
            await context.close();
        }
        assert.deepEqual(results[0].counts, results[2].counts);
        const docx = await JSZip.loadAsync(fs.readFileSync(path.join(output, 'DESIGN_INTENT.docx')));
        assert.equal(Object.keys(docx.files).filter(n => n.startsWith('word/media/')).length, 0);
        const xml = await docx.file('word/document.xml').async('string');
        const page = await browser.newPage();
        const docCheck = await page.evaluate(xml => {
            const doc = new DOMParser().parseFromString(xml, 'application/xml');
            const ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
            return { words: [...doc.getElementsByTagNameNS(ns, 't')].map(n => n.textContent).join(' ').split(/\s+/).length, tables: doc.getElementsByTagNameNS(ns, 'tbl').length, drawings: doc.getElementsByTagNameNS(ns, 'drawing').length, paragraphs: [...doc.getElementsByTagNameNS(ns, 'p')].map(n => n.textContent) };
        }, xml);
        assert(docCheck.words <= 500 && docCheck.tables === 0 && docCheck.drawings === 0);
        assert.equal(docCheck.paragraphs.filter(t => /^[1-7]\. /.test(t)).length, 7);
        const report = { extraction, zipBytes: fs.statSync(path.join(output, 'game.zip')).size, docCheck, results };
        fs.writeFileSync(path.join(output, 'validation.json'), JSON.stringify(report, null, 2));
        console.log('Validated ZIP and DOCX:', report.zipBytes, docCheck.words, 'words');
    } finally {
        if (browser) await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
})().catch(error => { console.error(error); process.exitCode = 1; });

