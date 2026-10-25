const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return entities[character]
  })

const entryDetails = {
  默认应用: {
    category: 'CORE WORKSPACE',
    description: '从登录到工作台，体验完整的后台应用与常见业务流程。',
    mark: 'PA',
  },
  企业演示: {
    category: 'ENTERPRISE',
    description: '浏览围绕企业管理场景组织的独立演示应用。',
    mark: 'EN',
  },
  projectA: {
    category: 'STANDALONE PROJECT',
    description: '作为独立项目运行，也可以作为 Remote 接入微前端。',
    mark: 'A',
  },
  projectB: {
    category: 'STANDALONE PROJECT',
    description: '查看独立路由、共享状态，以及它与 Shell 的组合方式。',
    mark: 'B',
  },
  微前端: {
    category: 'MODULE FEDERATION',
    description: '进入 Shell，体验 Remote 加载、独立路由与跨应用通信。',
    mark: 'MF',
  },
  Storybook: {
    category: 'DESIGN SYSTEM',
    description: '浏览组件文档、交互示例与可复用的界面能力。',
    mark: 'UI',
  },
}

const arrowIcon = `
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <path d="M4.5 10h10m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`

function renderEntryCard([label, href]) {
  const details = entryDetails[label] || {
    category: 'APPLICATION',
    description: '打开应用体验。',
    mark: label.slice(0, 2).toUpperCase(),
  }

  return `
    <a class="entry-card" href="${escapeHtml(href)}">
      <span class="entry-card__mark" aria-hidden="true">${escapeHtml(details.mark)}</span>
      <span class="entry-card__content">
        <span class="entry-card__category">${escapeHtml(details.category)}</span>
        <span class="entry-card__title">${escapeHtml(label)}</span>
        <span class="entry-card__description">${escapeHtml(details.description)}</span>
      </span>
      <span class="entry-card__arrow" aria-hidden="true">${arrowIcon}</span>
    </a>`
}

export function renderPortalHtml(version, links, repository = 'wkylin/pro-react-admin') {
  const featuredEntry = links.find(([label]) => label === '默认应用') || links.find(([label]) => label === '微前端') || links[0]
  const [featuredLabel, featuredHref] = featuredEntry || ['Storybook', './storybook/']
  const [owner, repo] = repository.split('/')
  const repositoryUrl = `https://github.com/${encodeURIComponent(owner || 'wkylin')}/${encodeURIComponent(repo || 'pro-react-admin')}`

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#edf3f8">
    <meta name="description" content="探索 Pro React Admin ${escapeHtml(version)}：从独立后台到 Module Federation 微前端，了解一套工程底座如何承载多种应用形态。">
    <title>Pro React Admin ${escapeHtml(version)} · Platform Explorer</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #142238;
        --muted: #66778f;
        --line: #dce5ef;
        --canvas: #edf3f8;
        --night: #091321;
        --night-raised: #101e30;
        --cyan: #77e4ed;
        --blue: #789eff;
        --mint: #c1edaa;
        --page-width: 1180px;
      }
      * { box-sizing: border-box; }
      html { min-width: 320px; background: var(--canvas); }
      body {
        margin: 0;
        color: var(--ink);
        font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", sans-serif;
        -webkit-font-smoothing: antialiased;
        background:
          radial-gradient(ellipse at 84% 4%, rgba(157, 202, 238, .22), transparent 31rem),
          linear-gradient(180deg, #f3f7fb 0%, var(--canvas) 48rem);
      }
      a { color: inherit; }
      a:focus-visible { outline: 3px solid #168aac; outline-offset: 4px; }
      .page { width: min(calc(100% - 64px), var(--page-width)); margin: 0 auto; }
      .masthead {
        min-height: 82px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      .brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; }
      .brand__symbol {
        width: 34px; height: 34px; display: grid; place-items: center;
        color: var(--cyan); border: 1px solid #b7cad9; border-radius: 11px;
        background: #122238; box-shadow: 0 5px 14px rgba(22, 48, 73, .1);
      }
      .brand__symbol svg { width: 21px; height: 21px; }
      .brand__name { font-size: 13px; font-weight: 760; letter-spacing: .105em; }
      .brand__sub { margin-left: 9px; color: #8190a4; font: 10px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .14em; }
      .masthead__links { display: flex; align-items: center; gap: 22px; }
      .masthead__version, .masthead__source {
        color: #52657e; font-size: 12px; font-weight: 650; text-decoration: none;
      }
      .masthead__version { padding: 7px 10px; border: 1px solid #d5e0eb; border-radius: 999px; background: rgba(255,255,255,.56); }
      .masthead__source:hover { color: #137c91; }
      .hero {
        position: relative;
        overflow: hidden;
        display: grid;
        grid-template-columns: minmax(0, .93fr) minmax(430px, 1.07fr);
        align-items: center;
        gap: 34px;
        min-height: 400px;
        padding: 46px 52px 42px;
        border: 1px solid rgba(156, 185, 213, .34);
        border-radius: 24px;
        color: #f4f7fc;
        background:
          radial-gradient(ellipse at 88% 18%, rgba(47, 116, 169, .21), transparent 34%),
          radial-gradient(ellipse at 17% 110%, rgba(35, 74, 110, .24), transparent 45%),
          linear-gradient(132deg, #0a1421 0%, #0c1828 53%, #101d30 100%);
        box-shadow: 0 22px 54px rgba(28, 55, 82, .13), inset 0 1px rgba(255,255,255,.045);
      }
      .hero::after {
        content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .14;
        background-image: linear-gradient(rgba(172,203,229,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(172,203,229,.1) 1px, transparent 1px);
        background-size: 46px 46px; mask-image: linear-gradient(100deg, transparent 8%, #000 100%);
      }
      .hero__copy, .topology { position: relative; z-index: 1; }
      .eyebrow {
        display: inline-flex; align-items: center; gap: 9px; margin: 0 0 22px;
        color: var(--cyan); font: 650 10px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
        letter-spacing: .17em; text-transform: uppercase;
      }
      .eyebrow__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--mint); box-shadow: 0 0 12px rgba(193,237,170,.75); }
      h1 { max-width: 520px; margin: 0; font-size: clamp(36px, 4.2vw, 54px); font-weight: 680; letter-spacing: -.055em; line-height: 1.14; }
      h1 span { color: var(--cyan); }
      .hero__description { max-width: 510px; margin: 19px 0 0; color: #b1bfd1; font-size: 14px; line-height: 1.9; }
      .hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 29px; }
      .primary-link {
        display: inline-flex; min-height: 43px; align-items: center; gap: 10px; padding: 0 16px;
        border: 1px solid rgba(119,228,237,.58); border-radius: 9px; color: #07131e;
        background: linear-gradient(110deg, #a7f1e9, #87d9f5); font-size: 12px; font-weight: 760;
        text-decoration: none; box-shadow: 0 8px 24px rgba(57, 178, 199, .16); transition: transform .2s ease, box-shadow .2s ease;
      }
      .primary-link:hover { transform: translateY(-2px); box-shadow: 0 11px 28px rgba(57,178,199,.26); }
      .primary-link svg { width: 17px; height: 17px; }
      .hero__hint { color: #8c9db2; font-size: 11px; }
      .topology {
        min-height: 294px; padding: 17px 18px 15px;
        border: 1px solid rgba(160,187,212,.17); border-radius: 17px;
        background: linear-gradient(145deg, rgba(19,35,54,.92), rgba(12,25,41,.78));
        box-shadow: inset 0 1px rgba(255,255,255,.045), 0 18px 42px rgba(0,0,0,.12);
      }
      .topology__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #9eafc4; font: 600 9px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .15em; }
      .topology__state { display: inline-flex; align-items: center; gap: 7px; color: #a9d9c9; letter-spacing: .08em; }
      .topology__state::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #9be8c4; }
      .topology__diagram { display: block; width: 100%; margin: 10px auto 0; overflow: visible; }
      .topology__diagram text { font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif; }
      .topology__node { fill: #12243a; stroke: #39546c; stroke-width: 1; }
      .topology__node--host { fill: #18334a; stroke: #5abfc9; }
      .topology__node-title { fill: #edf7fc; font-size: 15px; font-weight: 680; }
      .topology__node-subtitle { fill: #8da5ba; font-size: 9px; letter-spacing: .08em; }
      .topology__connector { fill: none; stroke: url(#routeGlow); stroke-width: 1.5; }
      .topology__junction { fill: #7fe2e8; filter: url(#softGlow); }
      .topology__protocols { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 3px; }
      .protocol-chip { padding: 6px 9px; border: 1px solid rgba(143,174,199,.2); border-radius: 6px; color: #a8b9cb; background: rgba(5,15,26,.3); font: 9px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .025em; }
      .protocol-chip strong { color: #d9f4f1; font-weight: 650; }
      .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin: 42px 0 17px; }
      .section-heading__eyebrow { margin: 0 0 7px; color: #71829a; font: 650 9px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .16em; }
      h2 { margin: 0; font-size: 21px; font-weight: 720; letter-spacing: -.035em; }
      .section-heading__note { margin: 0; color: #718099; font-size: 12px; }
      .entry-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .entry-card {
        position: relative; display: flex; min-height: 139px; align-items: flex-start; gap: 14px; padding: 17px;
        border: 1px solid var(--line); border-radius: 13px; background: rgba(255,255,255,.78);
        box-shadow: 0 4px 12px rgba(30,55,80,.025); text-decoration: none;
        transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
      }
      .entry-card:hover { transform: translateY(-3px); border-color: #a9c9d8; background: #fff; box-shadow: 0 13px 28px rgba(30,55,80,.085); }
      .entry-card__mark { flex: 0 0 37px; display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid #d7e5ec; border-radius: 10px; color: #28798b; background: #eaf5f7; font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: -.02em; }
      .entry-card:nth-child(3n + 2) .entry-card__mark { color: #536fba; border-color: #dce3f4; background: #edf1fa; }
      .entry-card:nth-child(3n) .entry-card__mark { color: #617b4b; border-color: #e1e9d9; background: #f1f5eb; }
      .entry-card__content { display: flex; min-width: 0; flex: 1; flex-direction: column; padding-top: 1px; }
      .entry-card__category { color: #8090a4; font: 600 8px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .09em; }
      .entry-card__title { margin-top: 6px; color: #1b2b40; font-size: 16px; font-weight: 720; letter-spacing: -.025em; }
      .entry-card__description { margin-top: 6px; color: #718096; font-size: 11px; line-height: 1.7; }
      .entry-card__arrow { display: grid; width: 25px; height: 25px; flex: 0 0 25px; place-items: center; margin: -2px -2px 0 0; border: 1px solid transparent; border-radius: 50%; color: #8293a7; transition: color .18s ease, border-color .18s ease, transform .18s ease; }
      .entry-card__arrow svg { width: 16px; height: 16px; }
      .entry-card:hover .entry-card__arrow { transform: translateX(2px); border-color: #d3e4eb; color: #137c91; }
      .architecture-note {
        display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 25px;
        margin-top: 17px; padding: 20px 22px; border: 1px solid #d9e4ed; border-radius: 13px;
        background: rgba(231,239,246,.64);
      }
      .architecture-note__eyebrow { margin: 0 0 7px; color: #6d8298; font: 650 9px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .14em; }
      .architecture-note h3 { margin: 0; color: #203249; font-size: 14px; font-weight: 720; letter-spacing: -.02em; }
      .architecture-note p { max-width: 740px; margin: 6px 0 0; color: #697b91; font-size: 11px; line-height: 1.7; }
      .architecture-tags { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
      .architecture-tags span { padding: 7px 9px; border: 1px solid #d4e0e9; border-radius: 6px; color: #536981; background: rgba(255,255,255,.56); font: 9px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: nowrap; }
      .footer { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 25px 2px 30px; color: #7d8ba0; font-size: 11px; }
      .footer__links { display: flex; gap: 16px; }
      .footer a { color: #65778d; text-decoration: none; }
      .footer a:hover { color: #137c91; }
      @media (max-width: 900px) {
        .hero { grid-template-columns: minmax(0, 1fr) minmax(340px, .95fr); gap: 24px; padding: 36px 34px; }
        .topology { min-height: auto; padding: 14px; }
        .entry-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 700px) {
        .page { width: min(calc(100% - 32px), var(--page-width)); }
        .masthead { min-height: 68px; }
        .brand__sub { display: none; }
        .masthead__links { gap: 11px; }
        .masthead__source { font-size: 11px; }
        .hero { grid-template-columns: minmax(0, 1fr); gap: 25px; padding: 29px 23px 22px; border-radius: 18px; }
        .eyebrow { margin-bottom: 16px; }
        h1 { max-width: 500px; font-size: clamp(32px, 8.7vw, 42px); }
        .topology__node-title { font-size: 17px; }
        .topology__node-subtitle { font-size: 10px; }
        .hero__description { margin-top: 14px; font-size: 13px; }
        .hero__actions { margin-top: 21px; }
        .topology { max-width: 520px; width: 100%; justify-self: center; }
        .section-heading { align-items: start; flex-direction: column; gap: 7px; margin-top: 32px; }
        .entry-grid { grid-template-columns: minmax(0, 1fr); gap: 9px; }
        .entry-card { min-height: 112px; padding: 15px; }
        .architecture-note { grid-template-columns: minmax(0, 1fr); gap: 14px; padding: 17px; }
        .architecture-tags { justify-content: flex-start; }
        .footer { align-items: flex-start; flex-direction: column; padding-bottom: 24px; }
      }
      @media (max-width: 390px) {
        .brand__name { font-size: 11px; }
        .masthead__source { display: none; }
        .topology { padding: 12px 8px; }
        .topology__header { font-size: 8px; }
        .protocol-chip { font-size: 8px; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="masthead">
        <a class="brand" href="./" aria-label="Pro React Admin 首页">
          <span class="brand__symbol" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 7h8M5 12h14M5 17h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="17" cy="7" r="2" fill="#c1edaa"/><circle cx="9" cy="17" r="2" fill="#789eff"/></svg>
          </span>
          <span><span class="brand__name">PRO REACT ADMIN</span><span class="brand__sub">PLATFORM EXPLORER</span></span>
        </a>
        <nav class="masthead__links" aria-label="辅助导航">
          <span class="masthead__version">VERSION ${escapeHtml(version)}</span>
          <a class="masthead__source" href="${escapeHtml(repositoryUrl)}" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <main>
        <section class="hero" aria-labelledby="page-title">
          <div class="hero__copy">
            <p class="eyebrow"><span class="eyebrow__dot"></span>ENGINEERING PLATFORM · 5.1</p>
            <h1 id="page-title">统一工程底座，<br><span>承载多种应用。</span></h1>
            <p class="hero__description">从独立后台、业务项目到 Module Federation 微前端，这里把它们放进同一套可复用、可演进的工程体系。选择一个入口，开始体验。</p>
            <div class="hero__actions">
              <a class="primary-link" href="${escapeHtml(featuredHref)}">从「${escapeHtml(featuredLabel)}」开始${arrowIcon}</a>
              <span class="hero__hint">可独立运行，也可组合扩展</span>
            </div>
          </div>

          <figure class="topology" aria-label="微前端架构：Shell 主应用在运行时加载 Project A 与 Project B 两个 Remote。">
            <div class="topology__header"><span>RUNTIME TOPOLOGY</span><span class="topology__state">FEDERATION READY</span></div>
            <svg class="topology__diagram" viewBox="0 0 580 226" role="img" aria-labelledby="topology-title topology-desc">
              <title id="topology-title">Shell 与 Remote 的运行时拓扑</title>
              <desc id="topology-desc">Shell 主应用连接 Project A Remote 和 Project B Remote；跨应用消息通过显式 Bridge 传递。</desc>
              <defs>
                <linearGradient id="routeGlow" x1=".1" y1="0" x2=".9" y2="1"><stop stop-color="#79e4ed"/><stop offset="1" stop-color="#829fff"/></linearGradient>
                <filter id="softGlow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path class="topology__connector" d="M290 72v22H145v35m145-35h145v35"/>
              <circle class="topology__junction" cx="290" cy="94" r="3"/>
              <circle class="topology__junction" cx="145" cy="94" r="2.2"/>
              <circle class="topology__junction" cx="435" cy="94" r="2.2"/>
              <rect class="topology__node topology__node--host" x="205" y="16" width="170" height="56" rx="10"/>
              <circle cx="225" cy="39" r="4" fill="#77e4ed"/>
              <text class="topology__node-title" x="240" y="42">主应用 · Shell</text>
              <text class="topology__node-subtitle" x="225" y="58">HOST / ROUTING / LAYOUT</text>
              <rect class="topology__node" x="50" y="129" width="190" height="58" rx="10"/>
              <rect x="65" y="146" width="5" height="22" rx="2.5" fill="#789eff"/>
              <text class="topology__node-title" x="81" y="153">Project A</text>
              <text class="topology__node-subtitle" x="81" y="169">REMOTE · INDEPENDENT BUILD</text>
              <rect class="topology__node" x="340" y="129" width="190" height="58" rx="10"/>
              <rect x="355" y="146" width="5" height="22" rx="2.5" fill="#c1edaa"/>
              <text class="topology__node-title" x="371" y="153">Project B</text>
              <text class="topology__node-subtitle" x="371" y="169">REMOTE · INDEPENDENT BUILD</text>
              <text class="topology__node-subtitle" x="290" y="211" text-anchor="middle">EXPLICIT EVENT BRIDGE · VERSIONED CONTRACT</text>
            </svg>
            <div class="topology__protocols" aria-label="架构特性">
              <span class="protocol-chip"><strong>Federation</strong> · runtime loading</span>
              <span class="protocol-chip"><strong>Bridge</strong> · explicit communication</span>
            </div>
          </figure>
        </section>

        <section aria-labelledby="entry-title">
          <div class="section-heading">
            <div><p class="section-heading__eyebrow">EXPLORE THE PLATFORM</p><h2 id="entry-title">选择一个入口</h2></div>
            <p class="section-heading__note">每个入口都对应独立构建与真实运行路径</p>
          </div>
          <nav class="entry-grid" aria-label="应用体验入口">${links.map(renderEntryCard).join('')}
          </nav>
        </section>

        <aside class="architecture-note" aria-label="微前端架构说明">
          <div>
            <p class="architecture-note__eyebrow">HOW THE PARTS FIT</p>
            <h3>Host 负责装配，Remote 保持独立。</h3>
            <p>Shell 在运行时加载 Project A 与 Project B；Remote 保留自己的路由、入口和构建边界。跨应用消息由经过版本与来源校验的 Bridge 显式传递。</p>
          </div>
          <div class="architecture-tags" aria-label="关键能力">
            <span>独立开发与构建</span><span>运行时组合</span><span>显式跨应用通信</span>
          </div>
        </aside>
      </main>

      <footer class="footer">
        <span>Pro React Admin · 用一套工程规范连接更多业务。</span>
        <nav class="footer__links" aria-label="页脚导航">
          <a href="${escapeHtml(repositoryUrl)}" target="_blank" rel="noreferrer">查看源码</a>
          <a href="${escapeHtml(`${repositoryUrl}/blob/main/docs/deployment/MFE_DEPLOYMENT.md`)}" target="_blank" rel="noreferrer">微前端架构说明</a>
        </nav>
      </footer>
    </div>
  </body>
</html>
`
}
