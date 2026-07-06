**Source Visual Truth**
- Path: `/Users/yanghaixin/.codex/generated_images/019f35fa-43b8-71e0-8548-4452fb8aaf6e/ig_0363af69b97da6e2016a4b4b04f358819bb9d58b687a824d03.png`

**Implementation Evidence**
- Local URL: `http://127.0.0.1:5173/`
- Desktop screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-full.png`
- Desktop viewport: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-viewport.png`
- Prediction explorer screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-explorer.png`
- Search state screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-search-cyber.png`
- Large catalog screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-large-catalog-en.png`
- Chinese i18n search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-i18n-zh-search.png`
- Common role English search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-common-teacher.png`
- Common programmer search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-common-programmer.png`
- Common role Chinese search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-common-zh-teacher.png`
- Common programmer Chinese search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-common-zh-programmer.png`
- Compact result-list screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-compact-results.png`
- Compact search-result screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-compact-results-search.png`
- English 2028 assessment screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-assessment-teacher.png`
- Chinese 2028 assessment screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-assessment-zh-programmer.png`
- Chinese athlete search and assessment screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-sports-athlete-zh.png`
- Chinese boxer search and assessment screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-sports-boxer-zh.png`
- Chinese chef transition screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-transition-chef-zh.png`
- Chinese programmer transition screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-transition-programmer-zh.png`
- Chinese civil-servant search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-worker-civil-servant-zh.png`
- Chinese testing search screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-worker-testing-zh.png`
- Desktop 18-result list screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-results-18.png`
- Mobile 18-result list screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/mobile-results-18.png`
- Mobile screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/mobile-full.png`
- Mobile explorer screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/mobile-explorer.png`
- Mobile i18n explorer screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/mobile-i18n-explorer.png`
- Role interaction screenshot: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/desktop-role-interaction.png`
- Viewport: desktop `1440x1024`, mobile `390x844`
- State: default page load, prediction explorer, searched `cyber`, plus clicked role-card state
- Full-view comparison evidence: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/comparison-full.png`
- Focused region comparison evidence: `/Users/yanghaixin/Desktop/job-converter/future-work-observatory/qa-screenshots/comparison-hero.png`

**Findings**
- No actionable P0/P1/P2 findings remain.

**Required Fidelity Surfaces**
- Fonts and typography: Implementation uses Playfair Display plus Inter to match the editorial report direction. Headline hierarchy, body sizes, and card labels are readable on desktop and mobile. No text clipping was observed.
- Spacing and layout rhythm: Sections follow the source order: immersive hero, timeline, force cards, transition frame, role showcase, outlook CTA, and sources. The first QA pass found the role section too tool-like; it was changed to a featured editorial story plus role-card field guide.
- Interaction and usefulness: The page now includes a first-class Prediction Explorer with search, industry/type filters, ranked results, radar chart, 2025-2028 opportunity curve, comparison bars, and interpretation text. Search filtering and ranking now run in `src/worker.js`, with a visible loading state while results update. The default explorer is now a balanced forecast mix across growth, automation pressure/downhill, traditional anchors, and reorganized roles instead of a pure opportunity leaderboard. Search for `cyber`, `公务员`, `测试`, `前沿部署工程师`, `AI落地`, `LLMOps`, `电话销售`, `邮政文员`, `打字员`, `农民`, `矿工`, `软件开发师`, `网站开发师`, `数据库管理员`, `预算分析师`, `法官`, `全媒体运营师`, `无人机装调工`, `石油工程师`, `语音语言病理学家`, and `电力工程内线安装工` correctly updates the prediction panel.
- Result density: The Prediction Explorer now shows the top 18 roles from the full catalog, giving the page more browse depth while keeping the searchable catalog separate from the visible result count.
- Prediction clarity: Each role now has a 2028 assessment panel above the charts. The panel translates the research-derived scores into a plain-language verdict, career direction, opportunity read, risk warning, practical skill move, transition bridge, and research basis.
- Internationalization: Default language is English. The language picker supports English, Chinese, Japanese, Korean, Spanish, French, German, Portuguese, Arabic, Hindi, Indonesian, and Vietnamese. Chinese, Japanese, Korean, and Arabic states were spot-checked in browser automation. Chinese search for `网络安全` returns localized cybersecurity roles and updates the selected prediction.
- Catalog size: The searchable role catalog now contains 3,186 roles. The catalog uses 1,016 official O*NET occupation titles, 1,836 extracted Chinese occupational-classification rows from the supplied PDF, 108 non-duplicate Qianmu career-list entries, and the existing curated common/emerging/downhill roles. Synthetic seniority variants such as mass-generated Principal/Enterprise/AI-Assisted roles were removed from the result set.
- Colors and visual tokens: Implementation keeps the source's off-white, dark green-black, lime, teal, coral, and muted professional palette. Contrast is sufficient in inspected views.
- Image quality and asset fidelity: Hero and role imagery are generated bitmap assets placed in the page, not placeholders or CSS drawings. Crops are stable across desktop and mobile.
- Copy and content: Page defaults to English, supports localized UI states, is source-backed, and includes OpenAI, Anthropic, OpenAI current deployment/forward-deployed career signals, Anthropic Applied AI hiring signals, WEF growth/decline signals, BLS fastest-declining-occupation evidence, BLS/O*NET occupational coverage, Qianmu career-list coverage, Chinese occupational-classification PDF coverage, and PwC references. Role cards include concrete explanations, skills, transfer-in roles, downside warnings, and 2025-2028 outlook labels.

**Patches Made Since Previous QA Pass**
- Replaced the right sticky role detail panel with a more editorial featured role story.
- Changed role cards into a showcase grid so the section reads as a public field guide instead of a backend/detail inspector.
- Added the Prediction Explorer so the page supports searchable role forecasts, radar charts, opportunity trends, and role comparison.
- Added i18n support with language selector and localized UI for English, Chinese, Japanese, Korean, and additional smaller-language surfaces.
- Rebuilt the searchable catalog from a synthetic 80,858-role matrix into 3,186 higher-trust roles using 1,016 official O*NET occupation titles, 1,836 extracted Chinese occupational-classification rows, 108 non-duplicate Qianmu career-list entries, conventional-role entries, public-sector entries, software-testing entries, frontier AI deployment entries, applied-AI architecture entries, model-deployment entries, explicit downhill entries, traditional industry entries, sports and physical-performance entries, requested vocational roles, and shared prediction scoring.
- Fixed search state synchronization so filtered results update the selected prediction automatically.
- Added a conventional-role entry layer so common searches such as `teacher`, `老师`, `programmer`, `程序员`, `accountant`, `nurse`, `cashier`, and `customer service` map into the 2025-2028 prediction model.
- Added search-relevance ranking so exact role-name matches appear before related but higher-scoring adjacent occupations.
- Adjusted the result list from a compact 6-role preview to a richer 18-role preview across default and search states.
- Added objective 2028 assessment copy for every role using the same score-based rules across opportunity, automation pressure, AI exposure, demand growth, human necessity, skill mobility, and source confidence.
- Added a direct career-direction layer so each role can say whether to build, specialize, pivot, test demand, or pursue with a parallel fallback path.
- Added a transition-bridge layer so each role can suggest similar next roles and a low/medium/high transition effort.
- Added sports and physical-performance roles including Athlete, Boxer, Coach, Fitness Trainer, Athletic Trainer, Referee, Sports Agent, Sports Data Analyst, and Dancer.
- Added broad-audience common roles including Chef, Electrician, Police Officer, Firefighter, Social Worker, Hairdresser, Warehouse Worker, Journalist, Lab Technician, and more.
- Added a requested occupation-coverage pass across engineering, finance/management, design/media, healthcare, education/research, legal/public service, and emerging vocational roles, including Software Developer, Network and Computer Systems Administrator, Database Administrator, Electronics Engineer, Operations Research Analyst, Budget Analyst, Market Research Analyst, Actuary, Industrial Designer, Editor, Announcer, Dentist, Registered Nurse, Audiologist, Special Education Teacher, Judge, Court Reporter, AI Trainer, Omnimedia Operator, Drone Technician, High-Speed Rail Maintenance Worker, and On-Demand Delivery Courier.
- Recalibrated software, web, frontend, QA, writing, translation, visual design, editing, announcing, comics, omnimedia, and content-production roles so commodity execution shows automation pressure instead of over-optimistic growth.
- Replaced mass-generated seniority/scope/title combinations with official O*NET occupation rows so searches show real occupations such as Cashiers, Software Developers, and Librarians and Media Collections Specialists instead of synthetic roles such as Principal AI-Assisted Library Services Manager.
- Added Qianmu career-list entries and Chinese occupational-classification PDF rows so Chinese searches such as `制图师`, `石油工程师`, `轮机工程师与造船师`, `语音语言病理学家`, `配镜师`, `石油开采工程技术人员`, and `电力工程内线安装工` resolve directly.
- Added public-sector roles including Civil Servant, Government Clerk, Policy Analyst, and Tax Officer with localized Chinese search aliases such as `公务员`, `公职人员`, and `政府办事员`.
- Added software-testing roles including QA Tester, Manual Tester, QA Automation Engineer, SDET, and Game Tester with Chinese search aliases such as `测试`, `测试工程师`, `软件测试`, and `自动化测试`.
- Added frontier AI deployment roles including AI Deployment Engineer, Forward Deployed Engineer, Forward Deployed Software Engineer, Technical Deployment Lead, AI Deployment Manager, Partner AI Deployment Engineer, Codex Deployment Engineer, Cyber AI Deployment Engineer, and Public Sector AI Deployment Engineer.
- Added Anthropic-style applied-AI and infrastructure roles including Applied AI Architect, Applied AI Engineer, Applied AI Security Architect, Inference Deployment Engineer, LLMOps Engineer, AI Reliability Engineer, Model Evals Engineer, Prompt and Evals Engineer, MCP Integration Engineer, and Agentic Workflow Consultant.
- Added localized aliases for emerging terms such as `前沿部署工程师`, `AI落地`, `AI实施`, `大模型应用工程师`, `推理部署`, `大模型运维`, `模型评测`, and `MCP集成`.
- Added source links for OpenAI deployment hiring, OpenAI forward-deployed hiring, and Anthropic Applied AI hiring signals.
- Added explicit downhill roles including Telemarketer, Telephone Operator, Switchboard Operator, Typist, File Clerk, Postal Service Clerk, Accounting Clerk, Inventory Clerk, Ticket Agent, Travel Agent, Printing Press Operator, Print Binding Worker, Sewing Machine Operator, Textile Machine Operator, Fast Food Cook, Toll Collector, Meter Reader, and Parking Lot Attendant.
- Added traditional non-AI-centered roles including Farmer, Farmworker, Fisher, Logger, Miner, Coal Miner, Oil and Gas Field Worker, Machinist, CNC Operator, Maintenance Technician, Heavy Equipment Operator, Bus Driver, Taxi Driver, Baker, Butcher, Janitor, and Landscaper.
- Added forecast lens cards for Growth paths, Reorganized work, Downhill watchlist, and Traditional anchors.
- Updated the default worker result mix so first-load results include growth, pressure/downhill, traditional, and reorganized roles instead of only top opportunity scores.
- Added decline-specific assessment verdicts and career guidance, plus descending 2025-2028 curves for high-pressure downhill roles.
- Added BLS fastest-declining occupations and WEF fastest growing/declining jobs sources.
- Moved search filtering and ranking into `src/worker.js` so large-catalog searches no longer block the main rendering path.
- Added an async result-list loading badge and dimmed in-flight rows while worker results are recalculated.
- Tuned search relevance so exact localized aliases such as `测试` beat longer prefix matches such as `测试开发工程师`.
- Added light-section navigation styling and anchor scroll offset so fixed navigation does not cover section headings.
- Re-captured desktop, mobile, and role interaction screenshots after the layout change.

**Open Questions**
- None blocking. The hero is slightly darker and more dramatic than the source mock, but this improves headline readability and remains consistent with the selected "Future Work Observatory" direction.

**Implementation Checklist**
- Build passes with `npm run build`.
- Local server is running at `http://127.0.0.1:5173/`.
- Desktop and mobile screenshots captured.
- Reference and implementation compared side by side.
- Role-card interaction verified.
- Search and chart update verified with `cyber`, which selected Cybersecurity Analyst.
- Official-backbone catalog verified with `3186 matching roles`.
- Chinese search verified with `网络安全`, which selected `网络安全工程师`.
- Common English search verified with `teacher`, which selected `Teacher`.
- Common English search verified with `programmer`, which selected `Programmer`.
- Common Chinese search verified with `老师`, which selected `老师`.
- Common Chinese search verified with `程序员`, which selected `程序员`.
- Result list verified with default balanced top 18 of `3186`.
- Mobile result list verified with 18 rendered rows.
- English 2028 assessment verified with `teacher`, showing verdict, opportunity/risk/action points, and research basis.
- Chinese 2028 assessment verified with `程序员`, showing localized verdict and summary.
- Chinese sports search verified with `运动员`, which selected `运动员` and showed a narrow/volatile career-direction warning.
- Chinese sports search verified with `拳击手`, which selected `拳击手` and recommended a coaching, audience, and post-competition fallback path.
- Chinese transition bridge verified with `厨师`, suggesting culinary operations, food business, and nutrition coaching paths.
- Chinese transition bridge verified with `电工`, suggesting building systems, renewable energy, and electrical inspection paths.
- Chinese transition bridge verified with `程序员`, suggesting agentic software, cybersecurity, and AI product paths with low transition effort.
- Chinese public-sector search verified with `公务员`, loading state, selected `公务员`, and showed policy operations, compliance, and public-service data transition paths.
- Chinese testing search verified with `测试`, loading state, selected `测试工程师`, rendered 18 rows, and showed QA automation, SDET, and cybersecurity transition paths.
- Frontier deployment search verified in the catalog with `前沿部署工程师`, selecting Forward Deployed Engineer.
- Frontier deployment English alias verified with `frontier deployment`, returning AI Deployment Engineer and Forward Deployed Engineer.
- Applied-AI search verified with `应用AI架构师`, selecting Applied AI Architect.
- Model-deployment searches verified with `推理部署`, `LLMOps`, and `MCP`, selecting Inference Deployment Engineer, LLMOps Engineer, and MCP Integration Engineer respectively.
- Downhill searches verified with `电话销售`, `邮政文员`, `打字员`, `印刷工`, `缝纫机操作员`, and `收银员`, selecting explicit pressure roles with descending or low-opportunity curves.
- Traditional searches verified with `农民`, `渔民`, `矿工`, `煤矿工`, and `维修技术员`, selecting explicit non-AI-centered roles.
- Worker bundle verified in `npm run build` output as a generated Vite worker asset.
- Japanese, Korean, and Arabic language switching verified at the navigation/explorer level.

**Follow-up Polish**
- P3: If desired, brighten the hero image overlay slightly to reveal more of the city and workplace background.
- P3: If desired, reduce the source-card copy density by one line each for a more spacious report feel.

final result: passed
