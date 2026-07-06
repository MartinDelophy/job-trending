import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconArrowRight,
  IconAdjustmentsHorizontal,
  IconBook2,
  IconChartRadar,
  IconChevronDown,
  IconCode,
  IconDatabase,
  IconExternalLink,
  IconFlag,
  IconHeartbeat,
  IconLeaf,
  IconLoader2,
  IconMenu2,
  IconRobot,
  IconScale,
  IconSearch,
  IconShieldCheck,
  IconSparkles,
  IconTargetArrow,
  IconTimelineEvent,
  IconX,
} from "@tabler/icons-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { languages, translate } from "./locales.js";
import { buildRoleCatalog, getDomainName, getRoleTitle } from "./roleCatalog.js";

const sourceLinks = {
  openaiJobs:
    "https://cdn.openai.com/pdf/the-ai-jobs-transition-framework_report.pdf",
  openaiBlueprint:
    "https://cdn.openai.com/global-affairs/f319686f-cf21-4b8e-b8bc-84dd9bbfb999/oai-workforce-blueprint-oct-2025.pdf",
  openaiCareersDeployment: "https://openai.com/careers/search/?q=deployment",
  openaiCareersForwardDeployed:
    "https://openai.com/careers/search/?q=forward%20deployed",
  anthropicIndex:
    "https://www.anthropic.com/research/economic-index-june-2026-report",
  anthropicCode: "https://www.anthropic.com/research/claude-code-expertise",
  anthropicCareers: "https://www.anthropic.com/careers",
  wef: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
  bls:
    "https://www.bls.gov/opub/ted/2025/employment-for-wind-turbine-service-technicians-expected-to-increase-49-9-percent-by-2034.htm",
  blsOoh: "https://www.bls.gov/ooh/",
  blsSoc: "https://www.bls.gov/soc/",
  blsSports:
    "https://www.bls.gov/ooh/entertainment-and-sports/athletes-and-sports-competitors.htm",
  blsProgrammers:
    "https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm",
  blsSoftware:
    "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  blsWeb:
    "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm",
  onet: "https://www.onetcenter.org/taxonomy.html",
  onetAll: "https://www.onetonline.org/find/all",
  qianmuCareers: "http://www.qianmu.org/%E8%81%8C%E4%B8%9A%E5%88%97%E8%A1%A8",
  chinaOccupationPdf:
    "https://zchweb.oss-cn-beijing.aliyuncs.com/contract/temp/2021122116541363304.pdf",
  pwc: "https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html",
  blsDeclining:
    "https://www.bls.gov/emp/tables/fastest-declining-occupations.htm",
  wefDeclining:
    "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-the-fastest-growing-and-declining-jobs/",
};

const timeline = [
  {
    year: "2025",
    title: "Foundation & Adoption",
    text: "AI moves from pilot projects into daily workflows. Skill pivots begin and early value shows up inside teams.",
  },
  {
    year: "2026",
    title: "Scaling & Expansion",
    text: "Automation broadens, agentic coding matures, and more roles are redesigned around human review and judgment.",
  },
  {
    year: "2027",
    title: "Integration & Reimagination",
    text: "AI becomes embedded in products, operations, healthcare, security, and energy infrastructure.",
  },
  {
    year: "2028",
    title: "Transformation & Leadership",
    text: "Organizations compete on responsible AI, resilient talent systems, and faster career mobility.",
  },
];

const forces = [
  {
    source: "OpenAI",
    metric: "18 / 24 / 12 / 46",
    label: "Jobs transition archetypes",
    detail:
      "Automation pressure, reorganization, AI-amplified growth, and less immediate change form the core map.",
    href: sourceLinks.openaiJobs,
  },
  {
    source: "Anthropic",
    metric: "Augmentation signal",
    label: "Claude usage is task-level evidence",
    detail:
      "Recent Economic Index work shows people use AI through both delegation and human-in-the-loop collaboration.",
    href: sourceLinks.anthropicIndex,
  },
  {
    source: "WEF",
    metric: "+78M net roles",
    label: "Global shift by 2030",
    detail:
      "Employers expect 170M roles created and 92M displaced as technology, green transition, and demographics collide.",
    href: sourceLinks.wef,
  },
  {
    source: "BLS",
    metric: "Fast growth fields",
    label: "Healthcare, data, cyber, clean energy",
    detail:
      "US projections point to rapid growth in wind, solar, nurse practitioner, data, and security roles.",
    href: sourceLinks.bls,
  },
  {
    source: "PwC",
    metric: "Two-track labor market",
    label: "AI skills reshape pay and demand",
    detail:
      "AI-exposed companies and AI-skilled workers show stronger productivity and wage signals.",
    href: sourceLinks.pwc,
  },
];

const changeModes = [
  {
    title: "Grow with AI",
    value: "12%",
    text: "Demand expands when AI lowers cost, improves quality, or makes a service easier to access.",
  },
  {
    title: "Reorganize",
    value: "24%",
    text: "Workers remain necessary, but the task mix shifts toward judgment, relationship, and accountability.",
  },
  {
    title: "Automation Pressure",
    value: "18%",
    text: "Tasks are exposed, human necessity is weaker, and demand may not absorb the productivity gain.",
  },
  {
    title: "Human-Anchored",
    value: "46%",
    text: "Physical execution, trust, care, regulation, or weak AI fit delays near-term change.",
  },
];

const roles = [
  {
    title: "AI Product Manager",
    mode: "Grow with AI",
    outlook: "High growth",
    icon: IconTargetArrow,
    image: "/assets/role-ai-product-manager.png",
    summary:
      "Turns product strategy into AI-assisted workflows, copilots, and measurable customer outcomes.",
    changes:
      "Owns AI product strategy, evaluation loops, model risk, and user trust instead of only feature delivery.",
    why:
      "As more products embed AI, teams need leaders who can translate technical capability into useful, governed products.",
    skills: ["AI product discovery", "Evaluation design", "Workflow mapping"],
    from: ["Product manager", "Business analyst", "UX researcher"],
    source: "OpenAI workforce blueprint and PwC AI skills signals.",
  },
  {
    title: "AI Governance Lead",
    mode: "Reorganize",
    outlook: "High growth",
    icon: IconScale,
    image: "/assets/role-ai-governance-lead.png",
    summary:
      "Builds the rules, reviews, and operating model that let organizations deploy AI responsibly.",
    changes:
      "Connects legal, security, product, data, and leadership around AI risk decisions and evidence trails.",
    why:
      "Regulation, customer trust, and brand risk make governance a mission-critical layer in AI adoption.",
    skills: ["Risk frameworks", "Policy design", "Model accountability"],
    from: ["Compliance manager", "Legal ops", "Security analyst"],
    source: "OpenAI human-necessity framing and industry governance demand.",
  },
  {
    title: "Cybersecurity Analyst",
    mode: "Grow with AI",
    outlook: "High growth",
    icon: IconShieldCheck,
    image: "/assets/role-cybersecurity-analyst.png",
    summary:
      "Defends organizations as automated attacks, identity risk, and AI-enabled fraud scale.",
    changes:
      "More routine detection is assisted by AI, while humans focus on triage, adversary thinking, and response.",
    why:
      "Every AI-enabled business expands its attack surface, keeping demand high for security operators.",
    skills: ["Incident response", "Threat modeling", "Identity security"],
    from: ["IT support", "Network admin", "Risk analyst"],
    source: "BLS growth projections and Anthropic task-exposure signals.",
  },
  {
    title: "Healthcare AI Specialist",
    mode: "Reorganize",
    outlook: "High growth",
    icon: IconHeartbeat,
    image: "/assets/role-healthcare-ai-specialist.png",
    summary:
      "Validates AI tools for clinical workflows while protecting patient safety and clinician trust.",
    changes:
      "Combines clinical context, data quality, documentation automation, and responsible deployment.",
    why:
      "Healthcare faces aging populations, staffing pressure, and a need for reliable AI-supported care.",
    skills: ["Clinical workflow", "AI validation", "Health data privacy"],
    from: ["Nurse", "Clinical analyst", "Health informatics specialist"],
    source: "OpenAI human necessity categories and BLS healthcare growth.",
  },
  {
    title: "Renewable Energy Technician",
    mode: "Human-Anchored",
    outlook: "High growth",
    icon: IconLeaf,
    image: "/assets/role-renewable-energy-technician.png",
    summary:
      "Installs, repairs, and maintains the clean-energy infrastructure behind the next decade.",
    changes:
      "AI improves scheduling and diagnostics, but field work, safety, and physical maintenance stay human-led.",
    why:
      "Clean power, electrification, and AI data infrastructure keep pressure on energy buildout.",
    skills: ["Electrical systems", "Field diagnostics", "Safety protocols"],
    from: ["Electrician", "Maintenance tech", "Industrial mechanic"],
    source: "BLS fastest-growing occupation projections.",
  },
  {
    title: "Robotics Technician",
    mode: "Grow with AI",
    outlook: "Rising demand",
    icon: IconRobot,
    image: "/assets/role-robotics-technician.png",
    summary:
      "Keeps automated factories, warehouses, labs, and service environments working safely.",
    changes:
      "Work shifts from single-machine maintenance to robot fleets, sensors, calibration, and AI diagnostics.",
    why:
      "Automation expands across manufacturing, logistics, healthcare support, and infrastructure operations.",
    skills: ["Mechatronics", "PLC basics", "Robot calibration"],
    from: ["Manufacturing tech", "Field service tech", "Mechanic"],
    source: "WEF technology adoption signals and BLS technical-growth fields.",
  },
  {
    title: "Climate Risk Analyst",
    mode: "Grow with AI",
    outlook: "High growth",
    icon: IconSparkles,
    image: "/assets/role-climate-risk-analyst.png",
    summary:
      "Turns physical and transition risk into decisions for finance, supply chains, cities, and insurance.",
    changes:
      "AI accelerates scenario analysis, but judgment is needed to interpret uncertainty and trade-offs.",
    why:
      "Climate exposure is moving from ESG reporting into enterprise planning and capital allocation.",
    skills: ["Scenario modeling", "Geospatial analysis", "Risk communication"],
    from: ["Financial analyst", "Sustainability analyst", "Urban planner"],
    source: "WEF green transition signals and enterprise climate demand.",
  },
  {
    title: "Data Steward",
    mode: "Reorganize",
    outlook: "High growth",
    icon: IconDatabase,
    image: "/assets/role-data-steward.png",
    summary:
      "Makes enterprise data usable, traceable, private, and trustworthy enough for AI systems.",
    changes:
      "The role becomes less about manual cleanup and more about lineage, governance, and AI readiness.",
    why:
      "Better data is the bottleneck for valuable, compliant, and reliable AI deployment.",
    skills: ["Data lineage", "Quality rules", "Privacy operations"],
    from: ["Data analyst", "Operations analyst", "BI developer"],
    source: "OpenAI workforce blueprint and Anthropic work-task usage trends.",
  },
  {
    title: "Agentic Software Developer",
    mode: "Reorganize",
    outlook: "Selective growth",
    icon: IconCode,
    image: "/assets/role-software-developer.png",
    summary:
      "Directs coding agents, reviews architecture, and turns intent into reliable shipped systems.",
    changes:
      "More execution moves to agents; humans keep the planning, architecture, verification, and product judgment.",
    why:
      "Anthropic's Claude Code research shows expertise still matters as AI handles more implementation detail.",
    skills: ["Architecture review", "Test strategy", "Agent orchestration"],
    from: ["Software engineer", "QA engineer", "Technical lead"],
    source: "Anthropic agentic coding research and OpenAI exposure framework.",
  },
  {
    title: "Legal Operations Analyst",
    mode: "Reorganize",
    outlook: "Stable to growing",
    icon: IconBook2,
    image: "/assets/role-legal-operations-analyst.png",
    summary:
      "Redesigns legal workflows as AI accelerates contracts, research, intake, and matter management.",
    changes:
      "AI handles drafts and retrieval; humans preserve accountability, review quality, and process design.",
    why:
      "Legal work has high AI exposure but strong regulatory and accountability constraints.",
    skills: ["Contract ops", "Process automation", "Review governance"],
    from: ["Paralegal", "Operations analyst", "Compliance specialist"],
    source: "OpenAI human-necessity examples and Anthropic task evidence.",
  },
];

const roleModels = {
  "AI Product Manager": {
    industry: "Product & Business",
    aliases: ["ai pm", "product manager", "business analyst", "ux strategy"],
    opportunity: 86,
    automationRisk: 38,
    aiExposure: 88,
    demandGrowth: 90,
    humanNecessity: 72,
    skillMobility: 82,
    sourceConfidence: 78,
    prediction:
      "Strong upside when product leaders can connect AI capability, customer value, evaluation, and governance.",
    signal:
      "OpenAI workforce recommendations and PwC's AI-skills premium both point to product roles becoming more AI-native.",
    yearly: [66, 74, 82, 88],
  },
  "AI Governance Lead": {
    industry: "Risk & Governance",
    aliases: ["governance", "compliance", "risk", "policy", "responsible ai"],
    opportunity: 88,
    automationRisk: 24,
    aiExposure: 76,
    demandGrowth: 86,
    humanNecessity: 90,
    skillMobility: 68,
    sourceConfidence: 82,
    prediction:
      "Demand rises as companies need accountable AI review, policy, evidence trails, and cross-functional approval.",
    signal:
      "OpenAI's human-necessity lens makes governance resilient: regulation and accountability keep people central.",
    yearly: [62, 72, 83, 90],
  },
  "Cybersecurity Analyst": {
    industry: "Cybersecurity",
    aliases: ["cyber", "security", "soc", "threat", "incident", "information security analyst", "信息安全分析师", "网络安全分析师", "信息安全", "网络安全"],
    opportunity: 91,
    automationRisk: 31,
    aiExposure: 82,
    demandGrowth: 92,
    humanNecessity: 84,
    skillMobility: 75,
    sourceConfidence: 84,
    prediction:
      "High growth as automated attacks, identity risk, and AI-enabled fraud expand the security workload.",
    signal:
      "BLS growth fields and Anthropic task evidence support strong human-in-the-loop security demand.",
    yearly: [70, 78, 86, 92],
  },
  "Healthcare AI Specialist": {
    industry: "Healthcare",
    aliases: ["health", "clinical", "nurse", "hospital", "informatics"],
    opportunity: 84,
    automationRisk: 26,
    aiExposure: 74,
    demandGrowth: 82,
    humanNecessity: 92,
    skillMobility: 66,
    sourceConfidence: 78,
    prediction:
      "Work grows around validation, workflow design, documentation automation, privacy, and clinical trust.",
    signal:
      "OpenAI highlights care and accountability as human anchors; BLS points to healthcare growth pressure.",
    yearly: [61, 69, 78, 85],
  },
  "Renewable Energy Technician": {
    industry: "Climate & Energy",
    aliases: ["renewable", "energy", "solar", "wind", "technician"],
    opportunity: 89,
    automationRisk: 18,
    aiExposure: 34,
    demandGrowth: 94,
    humanNecessity: 88,
    skillMobility: 70,
    sourceConfidence: 82,
    prediction:
      "Growth is driven by physical infrastructure buildout; AI helps diagnostics but does not remove field work.",
    signal:
      "BLS clean-energy projections show unusually strong growth for wind and related energy occupations.",
    yearly: [68, 77, 85, 91],
  },
  "Robotics Technician": {
    industry: "Automation & Manufacturing",
    aliases: ["robotics", "manufacturing", "factory", "automation", "mechatronics"],
    opportunity: 78,
    automationRisk: 29,
    aiExposure: 63,
    demandGrowth: 78,
    humanNecessity: 80,
    skillMobility: 72,
    sourceConfidence: 70,
    prediction:
      "Demand rises as automation expands, with humans needed for calibration, safety, maintenance, and troubleshooting.",
    signal:
      "WEF technology adoption signals support robotics expansion across logistics, manufacturing, and operations.",
    yearly: [58, 66, 74, 81],
  },
  "Climate Risk Analyst": {
    industry: "Climate & Energy",
    aliases: ["climate", "risk", "insurance", "finance", "sustainability"],
    opportunity: 80,
    automationRisk: 35,
    aiExposure: 78,
    demandGrowth: 76,
    humanNecessity: 74,
    skillMobility: 73,
    sourceConfidence: 68,
    prediction:
      "AI accelerates climate modeling, but decisions still depend on risk judgment, stakeholder trade-offs, and regulation.",
    signal:
      "WEF green transition signals and enterprise climate exposure point to increased demand for interpretable analysis.",
    yearly: [57, 66, 75, 82],
  },
  "Data Steward": {
    industry: "Data & AI Infrastructure",
    aliases: ["data", "steward", "governance", "lineage", "privacy", "quality"],
    opportunity: 83,
    automationRisk: 33,
    aiExposure: 82,
    demandGrowth: 80,
    humanNecessity: 76,
    skillMobility: 80,
    sourceConfidence: 76,
    prediction:
      "Stronger AI adoption makes data lineage, consent, quality, and governance visible bottlenecks.",
    signal:
      "OpenAI workforce guidance and Anthropic work-task data both suggest AI value depends on better operational data.",
    yearly: [60, 70, 79, 85],
  },
  "Agentic Software Developer": {
    industry: "Software & Engineering",
    aliases: ["software", "developer", "coding", "engineer", "agentic", "claude code", "software developer", "software engineer", "软件开发师", "软件工程师", "软件开发工程师"],
    opportunity: 77,
    automationRisk: 56,
    aiExposure: 94,
    demandGrowth: 74,
    humanNecessity: 66,
    skillMobility: 86,
    sourceConfidence: 82,
    prediction:
      "The role reorganizes fast: developers who can plan systems, review agents, and verify outputs retain leverage.",
    signal:
      "Anthropic's agentic coding research points to persistent returns to expertise as coding agents improve.",
    yearly: [64, 70, 75, 79],
  },
  "Legal Operations Analyst": {
    industry: "Legal & Operations",
    aliases: ["legal", "contract", "paralegal", "operations", "compliance"],
    opportunity: 70,
    automationRisk: 52,
    aiExposure: 87,
    demandGrowth: 62,
    humanNecessity: 79,
    skillMobility: 73,
    sourceConfidence: 74,
    prediction:
      "Legal support work reorganizes around AI-assisted retrieval, drafting, review governance, and accountable workflows.",
    signal:
      "OpenAI explicitly notes high legal exposure with strong regulatory and accountability constraints.",
    yearly: [56, 62, 67, 71],
  },
};

const enhancedRoles = roles.map((role) => ({
  ...role,
  ...roleModels[role.title],
}));

const defaultResultLimit = 18;
const searchResultLimit = 18;
const roleCatalog = buildRoleCatalog(enhancedRoles);
const roleByTitle = new Map(roleCatalog.map((role) => [role.title, role]));

function balancedDefaultTitles(roles, limit = 18) {
  const addUnique = (items, target, take) => {
    for (const item of items) {
      if (target.length >= take) break;
      if (!target.some((role) => role.title === item.title)) target.push(item);
    }
  };
  const growth = [...roles]
    .filter((role) => role.opportunity >= 78 && role.automationRisk < 70)
    .sort((a, b) => b.opportunity - a.opportunity);
  const pressure = [...roles]
    .filter((role) => role.automationRisk >= 70 && role.opportunity < 62)
    .sort((a, b) => b.automationRisk - a.automationRisk || a.opportunity - b.opportunity);
  const traditional = [...roles]
    .filter((role) => role.mode === "Human-Anchored" || (role.aiExposure < 55 && role.humanNecessity >= 75))
    .sort((a, b) => b.humanNecessity - a.humanNecessity || b.opportunity - a.opportunity);
  const reorganized = [...roles]
    .filter((role) => role.mode === "Reorganize")
    .sort((a, b) => b.aiExposure - a.aiExposure || b.skillMobility - a.skillMobility);
  const fallback = [...roles].sort((a, b) => b.opportunity - a.opportunity);

  const mixed = [];
  addUnique(growth, mixed, 5);
  addUnique(pressure, mixed, 10);
  addUnique(traditional, mixed, 15);
  addUnique(reorganized, mixed, limit);
  addUnique(fallback, mixed, limit);
  return mixed.slice(0, limit).map((role) => role.title);
}

const defaultRoleTitles = balancedDefaultTitles(roleCatalog, defaultResultLimit);
const workerRoleIndex = roleCatalog.map((role) => ({
  title: role.title,
  generated: role.generated,
  localizedTitle: role.localizedTitle,
  levelPart: role.levelPart,
  scopePart: role.scopePart,
  typePart: role.typePart,
  domain: role.domain,
  industry: role.industry,
  mode: role.mode,
  summary: role.summary,
  changes: role.changes,
  why: role.why,
  skills: role.skills,
  from: role.from,
  aliases: role.aliases,
  opportunity: role.opportunity,
  automationRisk: role.automationRisk,
  humanNecessity: role.humanNecessity,
  aiExposure: role.aiExposure,
  skillMobility: role.skillMobility,
}));

const yearlyChart = (values) =>
  ["2025", "2026", "2027", "2028"].map((year, index) => ({
    year,
    opportunity: values[index],
  }));

const navItems = [
  ["nav.overview", "overview"],
  ["nav.explorer", "explorer"],
  ["nav.timeline", "timeline"],
  ["nav.forces", "forces"],
  ["nav.roles", "roles"],
  ["nav.sources", "sources"],
];

const forecastLenses = [
  ["Grow with AI", "lens.growth", "lens.growth.copy"],
  ["Reorganize", "lens.reorganize", "lens.reorganize.copy"],
  ["Automation Pressure", "lens.pressure", "lens.pressure.copy"],
  ["Human-Anchored", "lens.traditional", "lens.traditional.copy"],
];

const labelMaps = {
  industry: {
    zh: {
      "Product & Business": "产品与商业",
      "Risk & Governance": "风险与治理",
      Cybersecurity: "网络安全",
      Healthcare: "医疗健康",
      Education: "教育",
      "Finance & Admin": "财务与行政",
      "Retail & Service": "零售与服务",
      "Transportation & Logistics": "交通与物流",
      "Creative & Media": "创意与媒体",
      "Sports & Physical Performance": "体育与身体表现",
      "Food & Hospitality": "餐饮与服务",
      "Hospitality & Tourism": "酒店与旅游",
      "Skilled Trades & Construction": "技工与建筑",
      "Public Safety & Government": "公共安全与政府",
      "Social & Community Services": "社会与社区服务",
      "Science & Lab": "科学与实验室",
      "Agriculture & Environment": "农业与环境",
      "Real Estate & Insurance": "房地产与保险",
      "Beauty & Personal Care": "美容与个人护理",
      "Climate & Energy": "气候与能源",
      "Automation & Manufacturing": "自动化与制造",
      "Data & AI Infrastructure": "数据与 AI 基础设施",
      "AI Deployment & Solutions": "AI 部署与解决方案",
      "Software & Engineering": "软件与工程",
      "Legal & Operations": "法律与运营",
    },
    ja: {
      "Product & Business": "プロダクト・ビジネス",
      "Risk & Governance": "リスク・ガバナンス",
      Cybersecurity: "サイバーセキュリティ",
      Healthcare: "ヘルスケア",
      Education: "教育",
      "Finance & Admin": "財務・事務",
      "Retail & Service": "小売・サービス",
      "Transportation & Logistics": "交通・物流",
      "Creative & Media": "クリエイティブ・メディア",
      "Sports & Physical Performance": "スポーツ・身体パフォーマンス",
      "Food & Hospitality": "飲食・サービス",
      "Hospitality & Tourism": "ホテル・観光",
      "Skilled Trades & Construction": "技能職・建設",
      "Public Safety & Government": "公共安全・行政",
      "Social & Community Services": "社会・地域サービス",
      "Science & Lab": "科学・ラボ",
      "Agriculture & Environment": "農業・環境",
      "Real Estate & Insurance": "不動産・保険",
      "Beauty & Personal Care": "美容・パーソナルケア",
      "Climate & Energy": "気候・エネルギー",
      "Automation & Manufacturing": "自動化・製造",
      "Data & AI Infrastructure": "データ・AI基盤",
      "AI Deployment & Solutions": "AI展開・ソリューション",
      "Software & Engineering": "ソフトウェア・エンジニアリング",
      "Legal & Operations": "法務・オペレーション",
    },
    ko: {
      "Product & Business": "제품·비즈니스",
      "Risk & Governance": "리스크·거버넌스",
      Cybersecurity: "사이버보안",
      Healthcare: "헬스케어",
      Education: "교육",
      "Finance & Admin": "재무·행정",
      "Retail & Service": "리테일·서비스",
      "Transportation & Logistics": "운송·물류",
      "Creative & Media": "크리에이티브·미디어",
      "Sports & Physical Performance": "스포츠·신체 퍼포먼스",
      "Food & Hospitality": "외식·서비스",
      "Hospitality & Tourism": "호텔·관광",
      "Skilled Trades & Construction": "기능직·건설",
      "Public Safety & Government": "공공안전·정부",
      "Social & Community Services": "사회·커뮤니티 서비스",
      "Science & Lab": "과학·실험실",
      "Agriculture & Environment": "농업·환경",
      "Real Estate & Insurance": "부동산·보험",
      "Beauty & Personal Care": "미용·개인관리",
      "Climate & Energy": "기후·에너지",
      "Automation & Manufacturing": "자동화·제조",
      "Data & AI Infrastructure": "데이터·AI 인프라",
      "AI Deployment & Solutions": "AI 배포·솔루션",
      "Software & Engineering": "소프트웨어·엔지니어링",
      "Legal & Operations": "법무·운영",
    },
  },
  mode: {
    zh: {
      "Grow with AI": "随 AI 增长",
      Reorganize: "重组",
      "Automation Pressure": "自动化压力",
      "Human-Anchored": "人类锚定",
    },
    ja: {
      "Grow with AI": "AIと成長",
      Reorganize: "再編",
      "Automation Pressure": "自動化圧力",
      "Human-Anchored": "人間中心",
    },
    ko: {
      "Grow with AI": "AI와 성장",
      Reorganize: "재편",
      "Automation Pressure": "자동화 압력",
      "Human-Anchored": "인간 중심",
    },
  },
};

function assessmentProfile(role) {
  if (role.opportunity <= 45 && role.automationRisk >= 70) return "decline";
  if (role.automationRisk >= 70 && role.opportunity < 68) return "pressure";
  if (role.opportunity < 62 && role.humanNecessity >= 82) return "niche";
  if (role.humanNecessity >= 88 && role.automationRisk <= 48) return "human";
  if (role.opportunity >= 76 && role.demandGrowth >= 68) return "growth";
  if (role.aiExposure >= 85 || role.mode === "Reorganize") return "reorganize";
  return "mixed";
}

function directionProfile(role) {
  if (role.guidance) return "custom";
  if (role.opportunity >= 78 && role.automationRisk < 62) return "build";
  if (role.opportunity <= 45 && role.automationRisk >= 70) return "exit";
  if (role.automationRisk >= 72 && role.opportunity < 68) return "pivot";
  if (role.opportunity < 62 && role.humanNecessity >= 82) return "parallel";
  if (role.aiExposure >= 85 || role.mode === "Reorganize") return "specialize";
  if (role.sourceConfidence < 68) return "test";
  return "enterWithPlan";
}

const assessmentCopy = {
  en: {
    verdicts: {
      decline: "Downhill by 2028; the routine version is shrinking.",
      growth: "Favorable by 2028, with higher skill standards.",
      human: "Resilient by 2028 because human trust stays central.",
      pressure: "Under clear automation pressure; routine work needs an exit path.",
      reorganize: "Likely to remain, but the work shape changes materially.",
      niche: "Human-led, but narrow, volatile, and hard to rely on alone.",
      mixed: "Mixed outlook; specialization decides the outcome.",
    },
    directions: {
      exit: "Do not treat the routine version as a long-term home. Use current experience to move into exceptions, operations, quality, customer escalation, or a physical/technical adjacent path.",
      build: "Reasonable to build toward this path if you are willing to keep upgrading tools, judgment, and proof of work.",
      pivot: "Do not rely on the routine version of this role. Use it as a bridge while moving toward higher-judgment adjacent work.",
      parallel: "Pursue it only with a parallel income or second-career plan; the work may be meaningful, but the market is narrow.",
      specialize: "Stay on the path only if you move toward specialization, ownership, or AI-supervised workflows.",
      test: "Test demand locally before committing: talk to employers, inspect job posts, and build a small portfolio signal.",
      enterWithPlan: "Viable with a plan: choose a niche, build evidence of skill, and keep one adjacent transfer path open.",
    },
    summary: ({ role, title }) =>
      `${title} scores ${role.opportunity}/100 on 2028 opportunity, with ${role.automationRisk}/100 automation pressure and ${role.humanNecessity}/100 human necessity. Treat this as a directional forecast: the key question is which tasks move to AI and which human responsibilities become more valuable.`,
    upside: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "The upside is not in staying with the routine task. It is in using domain familiarity to move into exception handling, quality control, operations, or customer escalation.";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "AI is not the main threat; the upside is in human performance, audience trust, coaching, and scarce real-world skill.";
      if (role.demandGrowth >= 70) return "Demand is a tailwind, so AI adoption is more likely to raise output expectations than erase the role outright.";
      if (role.humanNecessity >= 85) return "Trust, accountability, physical context, or care work protects the core of the role.";
      if (role.skillMobility >= 80) return "The skill base transfers well into adjacent AI-enabled roles, which improves career resilience.";
      return "The upside comes from using AI to compress routine work and spend more time on judgment, exceptions, and communication.";
    },
    watch: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "This is a real downside signal: self-service, software, outsourcing, and AI can reduce openings, bargaining power, or entry-level stability.";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "The risk is not automation; it is selection pressure, unstable earnings, injury or burnout, and a short window to convert skill into income.";
      if (role.automationRisk >= 70) return "Routine, repeatable tasks are exposed; low-complexity versions of the role may face wage or headcount pressure.";
      if (role.aiExposure >= 85) return "AI will change the daily task mix quickly, so shallow execution becomes less differentiated.";
      if (role.sourceConfidence < 68) return "The signal is useful but less certain; treat it as a planning hypothesis and watch industry-specific adoption.";
      return "The main risk is slower adaptation: teams that do not redesign workflows may lose productivity ground.";
    },
    move: ({ skills, from }) =>
      `Prioritize ${skills}. Strong transfer paths include ${from}.`,
    basis: ({ role }) =>
      role.source || "OpenAI task-exposure and human-necessity framing, Anthropic task evidence, and WEF/BLS/PwC demand signals.",
    transition: ({ targets, effort }) =>
      `Closest bridges: ${targets}. Transition effort: ${effort}. Use the current role as evidence, then add one missing skill layer before moving.`,
  },
  zh: {
    verdicts: {
      decline: "到 2028 年偏下坡，常规版本正在收缩。",
      growth: "到 2028 年偏正向，但技能门槛会上升。",
      human: "到 2028 年相对稳健，因为信任、照护或责任仍依赖人。",
      pressure: "自动化压力明确，重复性任务需要尽快找到转型出口。",
      reorganize: "岗位大概率不会消失，但工作内容会明显重组。",
      niche: "人类表现仍然核心，但赛道窄、波动大，不能轻易当成唯一稳定押注。",
      mixed: "前景中性偏分化，结果取决于细分方向和技能深度。",
    },
    directions: {
      exit: "不要把常规重复型版本当成长期归宿。把当前经验迁移到例外处理、运营、质检、客户升级处理，或相邻的实体/技术岗位。",
      build: "可以认真投入，但前提是持续升级工具能力、判断力和可验证作品。",
      pivot: "不要把低复杂度、重复型版本当作长期依靠；更适合作为过渡，转向更高判断含量的相邻岗位。",
      parallel: "可以追，但必须同时准备副收入或第二职业路径；它可能很有意义，但市场容量和稳定性都有限。",
      specialize: "继续走这条路可以，但要尽快走向专业化、负责制或 AI 协作流程管理。",
      test: "先验证本地需求再重投入：看招聘、访谈从业者，做一个小作品或技能证明。",
      enterWithPlan: "可以进入，但要带计划：选细分方向、积累证据，并保留一条相邻迁移路径。",
    },
    summary: ({ role, title }) =>
      `${title}的 2028 机会指数为 ${role.opportunity}/100，自动化压力为 ${role.automationRisk}/100，人类必要性为 ${role.humanNecessity}/100。这个判断不是“会不会消失”的二选一，而是看哪些任务会交给 AI，哪些人类责任会变得更重要。`,
    upside: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "机会不在继续守住重复任务，而在利用行业熟悉度转向例外处理、质量控制、运营或客户升级处理。";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "AI 不是最大威胁；真正的机会在身体表现、观众信任、训练经验和稀缺的真实技能。";
      if (role.demandGrowth >= 70) return "需求增长是主要顺风，AI 更可能提高产出要求，而不是简单替代整个岗位。";
      if (role.humanNecessity >= 85) return "信任、责任、实体场景或照护关系会保护岗位的核心价值。";
      if (role.skillMobility >= 80) return "技能迁移性较强，转向相邻的 AI 增强岗位会更容易。";
      return "机会主要来自用 AI 压缩低价值重复劳动，把时间转向判断、例外处理和沟通。";
    },
    watch: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "这是明确的下行信号：自助化、软件、外包和 AI 可能压缩岗位数量、议价能力或入门稳定性。";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "风险不是被 AI 替代，而是竞争筛选极强、收入不稳定、伤病或消耗，以及把能力变现的窗口期短。";
      if (role.automationRisk >= 70) return "重复、结构化任务暴露度高，低复杂度岗位可能面临薪资或人数压力。";
      if (role.aiExposure >= 85) return "AI 会很快改变日常任务组合，只做浅层执行的竞争力会下降。";
      if (role.sourceConfidence < 68) return "信号有参考价值但不算稳定，需要持续观察具体行业的采用速度。";
      return "主要风险不是立刻被替代，而是团队没有及时重组流程，导致生产率落后。";
    },
    move: ({ skills, from }) =>
      `优先补强：${skills}。较好的转入来源包括：${from}。`,
    basis: ({ role }) =>
      role.source || "OpenAI 的任务暴露与人类必要性框架、Anthropic 任务证据，以及 WEF/BLS/PwC 的需求信号。",
    transition: ({ targets, effort }) =>
      `最近的桥梁岗位：${targets}。转换成本：${effort}。先把当前岗位经验变成证据，再补一层缺失技能。`,
  },
  ja: {
    verdicts: {
      decline: "2028 年に向けて下り坂で、定型的な部分は縮小しています。",
      growth: "2028 年に向けて有利だが、求められるスキル水準は上がります。",
      human: "信頼や責任が中心に残るため、2028 年でも比較的強い職種です。",
      pressure: "自動化圧力が明確で、定型業務からの移行が必要です。",
      reorganize: "職種は残りやすい一方、仕事内容は大きく再編されます。",
      niche: "人間の実演が中心ですが、市場は狭く不安定で、単独の収入源としては慎重さが必要です。",
      mixed: "見通しは中立的で、専門性によって結果が分かれます。",
    },
    directions: {
      exit: "定型的な仕事を長期の居場所にしないでください。例外処理、運用、品質、顧客エスカレーション、または隣接する現場・技術職へ移るのが現実的です。",
      build: "本気で目指せる道ですが、ツール、判断力、実績証明を更新し続ける必要があります。",
      pivot: "定型的な部分だけに依存せず、より判断が必要な隣接領域へ移る前提で考えるべきです。",
      parallel: "追求するなら副収入や第二キャリアを並行して準備してください。意義はありますが市場は狭いです。",
      specialize: "続けるなら専門化、責任範囲の拡大、AI 支援ワークフローへ寄せる必要があります。",
      test: "大きく投資する前に、求人、現場の声、小さな実績で需要を検証してください。",
      enterWithPlan: "参入可能ですが、ニッチを選び、実績を作り、隣接する移行先を残すことが重要です。",
    },
    summary: ({ role, title }) =>
      `${title} の 2028 年機会指数は ${role.opportunity}/100、自動化圧力は ${role.automationRisk}/100、人間の必要性は ${role.humanNecessity}/100 です。消えるかどうかではなく、AI に移るタスクと人間の価値が増す責任を分けて見る予測です。`,
    upside: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "機会は定型作業に残ることではなく、業界理解を例外処理、品質管理、運用、顧客対応へ移すことにあります。";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "AI ではなく、身体能力、観客の信頼、指導経験、希少な実技スキルが機会になります。";
      if (role.demandGrowth >= 70) return "需要成長が追い風で、AI は役割全体の代替よりも生産性期待を高める可能性があります。";
      if (role.humanNecessity >= 85) return "信頼、説明責任、現場性、ケアの要素が中核価値を守ります。";
      if (role.skillMobility >= 80) return "スキル移転性が高く、隣接する AI 活用職種へ移りやすいです。";
      return "AI で定型作業を圧縮し、判断、例外対応、コミュニケーションに時間を移せる点が機会です。";
    },
    watch: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "明確な下方シグナルです。セルフサービス、ソフトウェア、外注、AI が求人、交渉力、 entry-level の安定性を削る可能性があります。";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "リスクは AI 代替ではなく、競争の激しさ、収入の不安定さ、怪我や消耗、収益化できる期間の短さです。";
      if (role.automationRisk >= 70) return "定型・反復タスクは露出が高く、低複雑度の仕事は圧力を受けます。";
      if (role.aiExposure >= 85) return "AI が日々のタスク構成を急速に変え、浅い実行だけでは差別化しにくくなります。";
      if (role.sourceConfidence < 68) return "シグナルは有用ですが不確実性もあり、業界別の導入速度を観察する必要があります。";
      return "主なリスクは適応の遅れで、ワークフローを再設計しない組織は生産性で劣後します。";
    },
    move: ({ skills, from }) =>
      `優先スキル: ${skills}。移行元候補: ${from}。`,
    basis: ({ role }) =>
      role.source || "OpenAI のタスク露出・人間必要性フレーム、Anthropic のタスク証拠、WEF/BLS/PwC の需要シグナル。",
    transition: ({ targets, effort }) =>
      `近い移行先: ${targets}。移行難度: ${effort}。今の経験を証拠にし、不足スキルを一層追加してください。`,
  },
  ko: {
    verdicts: {
      decline: "2028년까지 하락 경로이며 반복형 버전은 줄어들고 있습니다.",
      growth: "2028년까지 우호적이지만 요구 역량은 높아집니다.",
      human: "신뢰와 책임이 중심에 남아 2028년에도 비교적 견고합니다.",
      pressure: "자동화 압력이 뚜렷하며 반복 업무에서 벗어날 경로가 필요합니다.",
      reorganize: "직업은 남을 가능성이 높지만 업무 형태는 크게 재편됩니다.",
      niche: "인간 퍼포먼스가 핵심이지만 시장은 좁고 변동성이 커서 단일 수입원으로는 신중해야 합니다.",
      mixed: "전망은 혼합적이며 전문화 수준에 따라 결과가 갈립니다.",
    },
    directions: {
      exit: "반복형 버전을 장기 거처로 보지 마세요. 현재 경험을 예외 처리, 운영, 품질, 고객 에스컬레이션, 또는 인접한 현장·기술 직무로 옮기는 것이 현실적입니다.",
      build: "진지하게 구축할 수 있는 경로지만 도구, 판단력, 성과 증명을 계속 업데이트해야 합니다.",
      pivot: "반복적인 버전에 의존하지 말고 더 높은 판단이 필요한 인접 업무로 이동하는 전제로 보세요.",
      parallel: "추구하되 부수입이나 두 번째 커리어를 병행 준비하세요. 의미는 크지만 시장은 좁습니다.",
      specialize: "계속하려면 전문화, 책임 범위 확대, AI 협업 워크플로로 이동해야 합니다.",
      test: "크게 투자하기 전에 채용 공고, 현업 인터뷰, 작은 포트폴리오로 수요를 검증하세요.",
      enterWithPlan: "진입 가능하지만 세부 분야 선택, 실력 증거, 인접 전환 경로 확보가 필요합니다.",
    },
    summary: ({ role, title }) =>
      `${title}의 2028 기회 점수는 ${role.opportunity}/100, 자동화 압력은 ${role.automationRisk}/100, 인간 필요성은 ${role.humanNecessity}/100입니다. 사라지는지 여부보다 어떤 과업이 AI로 이동하고 어떤 인간 책임이 더 중요해지는지를 보는 예측입니다.`,
    upside: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "기회는 반복 업무에 남는 것이 아니라 업계 이해를 예외 처리, 품질 관리, 운영, 고객 에스컬레이션으로 옮기는 데 있습니다.";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "AI가 주된 위협은 아닙니다. 기회는 신체 퍼포먼스, 관객 신뢰, 코칭 경험, 희소한 현장 기술에 있습니다.";
      if (role.demandGrowth >= 70) return "수요 성장이 강해 AI는 역할을 없애기보다 산출 기대치를 높일 가능성이 큽니다.";
      if (role.humanNecessity >= 85) return "신뢰, 책임, 물리적 맥락, 돌봄 요소가 핵심 가치를 보호합니다.";
      if (role.skillMobility >= 80) return "기술 이동성이 높아 인접한 AI 활용 직무로 이동하기 좋습니다.";
      return "AI로 반복 업무를 줄이고 판단, 예외 처리, 커뮤니케이션에 집중할 수 있다는 점이 기회입니다.";
    },
    watch: ({ role }) => {
      if (role.opportunity <= 45 && role.automationRisk >= 70) return "명확한 하락 신호입니다. 셀프서비스, 소프트웨어, 외주, AI가 채용 기회, 협상력, 초급 안정성을 줄일 수 있습니다.";
      if (role.opportunity < 62 && role.humanNecessity >= 82) return "위험은 AI 대체가 아니라 강한 선발 압력, 불안정한 소득, 부상이나 소진, 짧은 수익화 창구입니다.";
      if (role.automationRisk >= 70) return "반복적이고 구조화된 과업은 노출도가 높아 낮은 복잡도의 역할은 압박을 받을 수 있습니다.";
      if (role.aiExposure >= 85) return "AI가 일상 과업 구성을 빠르게 바꾸므로 얕은 실행만으로는 차별화가 어렵습니다.";
      if (role.sourceConfidence < 68) return "신호는 유용하지만 불확실성이 있어 업계별 도입 속도를 지켜봐야 합니다.";
      return "주요 위험은 적응 지연이며, 워크플로를 재설계하지 않는 팀은 생산성에서 뒤처질 수 있습니다.";
    },
    move: ({ skills, from }) =>
      `우선 강화할 기술: ${skills}. 좋은 전환 경로: ${from}.`,
    basis: ({ role }) =>
      role.source || "OpenAI의 과업 노출·인간 필요성 프레임, Anthropic 과업 증거, WEF/BLS/PwC 수요 신호.",
    transition: ({ targets, effort }) =>
      `가까운 전환 경로: ${targets}. 전환 난이도: ${effort}. 현재 경험을 증거로 만들고 부족한 기술을 한 층 더하세요.`,
  },
};

const transitionTargetTranslations = {
  zh: {
    "Instructional Designer": "教学设计师",
    "Learning Experience Designer": "学习体验设计师",
    "Education Program Manager": "教育项目经理",
    "Agentic Software Developer": "智能体软件开发者",
    "Cybersecurity Analyst": "网络安全分析师",
    "AI Product Manager": "AI 产品经理",
    "Data Steward": "数据治理专员",
    "Financial Analyst": "财务分析师",
    Auditor: "审计员",
    "Compliance Analyst": "合规分析师",
    "Care Coordinator": "照护协调员",
    "Healthcare AI Specialist": "医疗 AI 专家",
    "Clinical Documentation Specialist": "临床文档专家",
    Coach: "教练",
    "Fitness Trainer": "健身教练",
    "Sports Data Analyst": "体育数据分析师",
    "Athletic Trainer": "运动防护师",
    "Customer Success": "客户成功",
    "Sales Representative": "销售代表",
    "AI Workflow Coordinator": "AI 工作流协调员",
    "Quality Analyst": "质量分析师",
    "Logistics Coordinator": "物流协调员",
    "Robotics Technician": "机器人技术员",
    "Energy Technician": "能源技术员",
    "Content Strategist": "内容策略师",
    "AI Creative Producer": "AI 创意制作人",
    "Brand Systems Designer": "品牌系统设计师",
    "Public Safety Analyst": "公共安全分析师",
    "Emergency Management": "应急管理",
    "Policy Operations Analyst": "政策运营分析师",
    "Public Service Data Coordinator": "公共服务数据协调员",
    "Digital Government Coordinator": "数字政务协调员",
    "Government Data Analyst": "政府数据分析师",
    "Compliance Operations": "合规运营",
    "Care coordinator": "照护协调员",
    "Nursing Assistant": "护理助理",
    "Restaurant operations": "餐饮运营",
    "Food business owner": "餐饮创业者",
    "Building systems technician": "建筑系统技术员",
    "Renewable energy technician": "可再生能源技术员",
    "Electrical inspector": "电气检查员",
    "Warehouse automation operator": "仓储自动化操作员",
    "Personal brand owner": "个人品牌经营者",
    "Culinary operations manager": "餐饮运营经理",
    "Nutrition coach": "营养教练",
    "Food service supervisor": "餐饮主管",
    "Kitchen operations": "厨房运营",
    "Restaurant supervisor": "餐厅主管",
    "Hospitality manager": "酒店服务经理",
    "Beverage brand ambassador": "饮品品牌代表",
    "Event operations": "活动运营",
    "Guest experience manager": "宾客体验经理",
    "Travel operations": "旅行运营",
    "Facilities coordinator": "设施协调员",
    "Hospitality supervisor": "酒店服务主管",
    "Building inspector": "建筑检查员",
    "Construction supervisor": "施工主管",
    "Interior project manager": "室内项目经理",
    "EV technician": "电动车技术员",
    "Fleet technician": "车队技术员",
    "Diagnostics specialist": "诊断专家",
    "Safety trainer": "安全培训师",
    "Disaster response coordinator": "灾害响应协调员",
    "Emergency dispatcher": "急救调度员",
    "Operations coordinator": "运营协调员",
    "Program manager": "项目经理",
    "Mental health support": "心理健康支持",
    "Teaching assistant": "助教",
    "Early childhood educator": "幼教老师",
    "Family support worker": "家庭支持工作者",
    "Home health aide": "居家护理员",
    "Nursing assistant": "护理助理",
    "Healthcare support": "医疗支持",
    "Medication safety analyst": "用药安全分析师",
    "Clinical informatics": "临床信息化",
    "Healthcare operations": "医疗运营",
    "Medication coordinator": "用药协调员",
    "Dental office manager": "牙科诊所经理",
    "Patient educator": "患者教育专员",
    "Animal care manager": "动物护理经理",
    "Veterinary practice operations": "兽医诊所运营",
    "Research operations": "研究运营",
    "Data scientist": "数据科学家",
    "AI lab analyst": "AI 实验室分析师",
    "Sustainability analyst": "可持续发展分析师",
    "Field research coordinator": "野外研究协调员",
    "Inventory coordinator": "库存协调员",
    "Machine operator": "机器操作员",
    "Manufacturing supervisor": "制造主管",
    "Financial planner": "财务规划师",
    "Property manager": "物业经理",
    "Risk analyst": "风险分析师",
    "Facilities manager": "设施经理",
    "Real estate operations": "房地产运营",
    "Beauty brand owner": "美业品牌主理人",
    "Salon manager": "美发店经理",
    "Personal care educator": "个人护理培训师",
    "Salon owner": "门店经营者",
    "Grooming educator": "修容培训师",
    "Beauty content creator": "美妆内容创作者",
    "Brand educator": "品牌培训师",
    "Event stylist": "活动造型师",
    "Wellness coach": "健康教练",
    "Physical therapy aide": "物理治疗助理",
    "Personal care business": "个人护理创业",
    Editor: "编辑",
    "Research analyst": "研究分析师",
    "Creative director": "创意总监",
    "Brand content producer": "品牌内容制作人",
    "Video editor": "视频剪辑师",
    "Motion designer": "动态设计师",
    "Music teacher": "音乐老师",
    "Content creator": "内容创作者",
    "Audio producer": "音频制作人",
    Presenter: "主持人",
    "Voice actor": "配音演员",
    "Information specialist": "信息专员",
    "Supply Chain Coordinator": "供应链协调员",
    "Inventory Analyst": "库存分析师",
    "Guest Experience Manager": "宾客体验经理",
    "Travel Operations": "旅行运营",
    "Research Operations": "研究运营",
    "Wellness Services": "健康服务",
    "Customer Experience": "客户体验",
    "QA Automation Engineer": "自动化测试工程师",
    SDET: "测试开发工程师",
    "DevOps Engineer": "DevOps 工程师",
    "Product Analyst": "产品分析师",
    "Game Producer": "游戏制作人",
    "User Researcher": "用户研究员",
    "AI Deployment Engineer": "AI 部署工程师",
    "Forward Deployed Engineer": "前沿部署工程师",
    "Forward Deployed Software Engineer": "前沿部署软件工程师",
    "Technical Deployment Lead": "技术部署负责人",
    "AI Deployment Manager": "AI 部署经理",
    "Partner AI Deployment Engineer": "合作伙伴 AI 部署工程师",
    "Codex Deployment Engineer": "Codex 部署工程师",
    "Cyber AI Deployment Engineer": "网络安全 AI 部署工程师",
    "Public Sector AI Deployment Engineer": "公共部门 AI 部署工程师",
    "Applied AI Architect": "应用 AI 架构师",
    "Applied AI Engineer": "应用 AI 工程师",
    "Applied AI Security Architect": "应用 AI 安全架构师",
    "AI Solutions Architect": "AI 解决方案架构师",
    "AI Solutions Engineer": "AI 解决方案工程师",
    "Partner Solutions Architect": "合作伙伴解决方案架构师",
    "Inference Deployment Engineer": "推理部署工程师",
    "LLMOps Engineer": "LLMOps 工程师",
    "AI Reliability Engineer": "AI 可靠性工程师",
    "Model Evals Engineer": "模型评测工程师",
    "Prompt and Evals Engineer": "提示词与评测工程师",
    "MCP Integration Engineer": "MCP 集成工程师",
    "Agentic Workflow Consultant": "智能体工作流顾问",
    "AI Customer Success Engineer": "AI 客户成功工程师",
    "AI Technical Account Manager": "AI 技术客户经理",
    "Deployed AI Product Manager": "部署型 AI 产品经理",
    "Customer Success Manager": "客户成功经理",
    "Developer Advocate": "开发者布道师",
    "AI Platform Engineer": "AI 平台工程师",
    "Security Architect": "安全架构师",
    "ML Platform Engineer": "机器学习平台工程师",
    "AI Infrastructure Engineer": "AI 基础设施工程师",
    "Site Reliability Engineer": "站点可靠性工程师",
    "Customer Success Engineer": "客户成功工程师",
    "Technical Account Manager": "技术客户经理",
    "Sales Development Representative": "销售开发代表",
    "Marketing Coordinator": "市场协调员",
    "Administrative Coordinator": "行政协调员",
    "Records Specialist": "档案与记录专员",
    "Compliance Assistant": "合规助理",
    "Payroll Specialist": "薪资专员",
    "Warehouse Automation Operator": "仓储自动化操作员",
    "Route Supervisor": "路线主管",
    "Digital Print Technician": "数字印刷技术员",
    "Packaging Technician": "包装技术员",
    "Apparel Production Supervisor": "服装生产主管",
    "Costume Designer": "服装造型设计师",
    "Utility Technician": "公用事业技术员",
    "Precision Agriculture Technician": "精准农业技术员",
    "Farm Supervisor": "农场主管",
    "Food Processing Technician": "食品加工技术员",
    "Marine Operations": "海事运营",
    "Aquaculture Technician": "水产养殖技术员",
    "Heavy Equipment Operator": "重型设备操作员",
    "Safety Inspector": "安全检查员",
    "CNC Operator": "CNC 操作员",
    "CNC Programmer": "CNC 编程员",
    "Maintenance Technician": "维修技术员",
    "Quality Technician": "质量技术员",
    "Site Safety Coordinator": "工地安全协调员",
    "Fleet Operations": "车队运营",
    "Food Safety Inspector": "食品安全检查员",
    "Small Business Owner": "小企业主",
    "Equipment Operator": "设备操作员",
    "Sustainability Technician": "可持续发展技术员",
    "Data Quality Analyst": "数据质量分析师",
  },
};

const industryTransitionTargets = {
  Education: ["Instructional Designer", "Learning Experience Designer", "Education Program Manager"],
  "Software & Engineering": ["Agentic Software Developer", "Cybersecurity Analyst", "AI Product Manager"],
  "AI Deployment & Solutions": ["AI Deployment Engineer", "Applied AI Architect", "AI Solutions Architect"],
  "Data & AI Infrastructure": ["Inference Deployment Engineer", "AI Reliability Engineer", "Data Steward"],
  Healthcare: ["Healthcare AI Specialist", "Clinical Documentation Specialist", "Care Coordinator"],
  "Sports & Physical Performance": ["Coach", "Fitness Trainer", "Sports Data Analyst", "Athletic Trainer"],
  "Finance & Admin": ["Financial Analyst", "Auditor", "Compliance Analyst"],
  "Retail & Service": ["Customer Success", "Sales Representative", "AI Workflow Coordinator"],
  "Food & Hospitality": ["Customer Success", "Restaurant operations", "Food business owner"],
  "Hospitality & Tourism": ["Customer Success", "Travel Operations", "Guest Experience Manager"],
  "Skilled Trades & Construction": ["Building systems technician", "Robotics Technician", "Energy Technician"],
  "Transportation & Logistics": ["Logistics Coordinator", "Inventory Analyst", "Warehouse automation operator"],
  "Automation & Manufacturing": ["Quality Analyst", "Robotics Technician", "Manufacturing Supervisor"],
  "Creative & Media": ["Content Strategist", "AI Creative Producer", "Brand Systems Designer"],
  "Public Safety & Government": ["Emergency Management", "Public Safety Analyst", "Compliance Analyst"],
  "Social & Community Services": ["Care Coordinator", "Program Manager", "Healthcare AI Specialist"],
  "Science & Lab": ["Data Steward", "Quality Analyst", "Research Operations"],
  "Agriculture & Environment": ["Environmental Technician", "Climate Risk Analyst", "Supply Chain Coordinator"],
  "Beauty & Personal Care": ["Personal brand owner", "Wellness Services", "Customer Experience"],
  "Real Estate & Insurance": ["Property Manager", "Risk Analyst", "Customer Success"],
};

const effortLabels = {
  en: { low: "low", medium: "medium", high: "high" },
  zh: { low: "低", medium: "中", high: "高" },
  ja: { low: "低", medium: "中", high: "高" },
  ko: { low: "낮음", medium: "중간", high: "높음" },
};

function transitionEffort(role) {
  if (role.skillMobility >= 78) return "low";
  if (role.skillMobility >= 58) return "medium";
  return "high";
}

function localizeTransitionTarget(target, locale) {
  return transitionTargetTranslations[locale]?.[target] || target;
}

function buildTransitionAdvice(role, locale) {
  const copy = assessmentCopy[locale] || assessmentCopy.en;
  const rawTargets =
    role.transitionTargets ||
    industryTransitionTargets[role.industry] ||
    (role.automationRisk >= 70
      ? ["AI Workflow Coordinator", "Data Steward", "Customer Success"]
      : ["AI Workflow Coordinator", "Operations Coordinator", "Data Steward"]);
  const targets = rawTargets
    .slice(0, 3)
    .map((target) => localizeTransitionTarget(target, locale))
    .join(locale === "en" ? ", " : "、");
  const effort = (effortLabels[locale] || effortLabels.en)[transitionEffort(role)];

  return copy.transition({ role, targets, effort });
}

function buildRoleAssessment(role, locale, title) {
  const copy = assessmentCopy[locale] || assessmentCopy.en;
  const profile = assessmentProfile(role);
  const direction = directionProfile(role);
  const skills = role.skills.slice(0, 3).join(", ");
  const from = role.from.slice(0, 3).join(", ");

  return {
    verdict: copy.verdicts[profile],
    summary: copy.summary({ role, title }),
    direction:
      role.guidance?.[locale] ||
      role.guidance?.en ||
      copy.directions[direction],
    transition: buildTransitionAdvice(role, locale),
    upside: copy.upside({ role }),
    watch: copy.watch({ role }),
    move: copy.move({ role, skills, from }),
    basis: copy.basis({ role }),
  };
}

export function App() {
  const [locale, setLocale] = useState("en");
  const [activeYear, setActiveYear] = useState("2026");
  const [expandedRole, setExpandedRole] = useState("AI Governance Lead");
  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeModeFilter, setActiveModeFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchResult, setSearchResult] = useState({
    total: roleCatalog.length,
    visibleTitles: defaultRoleTitles.slice(0, defaultResultLimit),
    comparisonTitles: defaultRoleTitles.slice(0, 6),
    includesExpanded: true,
    firstTitle: defaultRoleTitles[0],
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [workerReady, setWorkerReady] = useState(false);
  const workerRef = useRef(null);
  const requestIdRef = useRef(0);
  const expandedRoleRef = useRef(expandedRole);
  const searchTimeoutRef = useRef(null);
  const t = (key, vars) => translate(locale, key, vars);
  const labelIndustry = (value) =>
    value === "All" ? t("filter.all") : labelMaps.industry[locale]?.[value] || value;
  const labelMode = (value) =>
    value === "All" ? t("filter.all") : labelMaps.mode[locale]?.[value] || value;

  useEffect(() => {
    const onScroll = () => {
      const height =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.min(1, window.scrollY / height));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    expandedRoleRef.current = expandedRole;
  }, [expandedRole]);

  useEffect(() => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (event) => {
      const payload = event.data;
      if (payload.type === "ready") {
        setWorkerReady(true);
        return;
      }
      if (payload.type === "results" && payload.id === requestIdRef.current) {
        if (searchTimeoutRef.current) {
          window.clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        setSearchResult({
          total: payload.total,
          visibleTitles: payload.visibleTitles,
          comparisonTitles: payload.comparisonTitles,
          includesExpanded: payload.includesExpanded,
          firstTitle: payload.firstTitle,
        });
        setSearchLoading(false);
        return;
      }
      if (payload.type === "error" && payload.id === requestIdRef.current) {
        if (searchTimeoutRef.current) {
          window.clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        setSearchLoading(false);
      }
    };

    worker.onerror = () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      setWorkerReady(false);
      setSearchLoading(false);
    };

    worker.onmessageerror = () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      setSearchLoading(false);
    };

    worker.postMessage({ type: "init", roles: workerRoleIndex });
    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      worker.terminate();
    };
  }, []);

  const activeTimeline = useMemo(
    () => timeline.find((item) => item.year === activeYear) ?? timeline[1],
    [activeYear],
  );

  const expanded = useMemo(
    () => roleByTitle.get(expandedRole) ?? roleCatalog[1],
    [expandedRole],
  );

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(roleCatalog.map((role) => role.industry)))],
    [],
  );

  const modeFilters = useMemo(
    () => ["All", ...Array.from(new Set(roleCatalog.map((role) => role.mode)))],
    [],
  );

  const visibleResultLimit = query.trim() ? searchResultLimit : defaultResultLimit;

  useEffect(() => {
    if (!workerReady || !workerRef.current) return;

    const id = requestIdRef.current + 1;
    requestIdRef.current = id;
    setSearchLoading(true);
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = window.setTimeout(() => {
      if (requestIdRef.current === id) {
        setSearchLoading(false);
      }
    }, 1600);
    workerRef.current.postMessage({
      type: "search",
      id,
      query,
      locale,
      activeIndustry,
      activeModeFilter,
      visibleLimit: visibleResultLimit,
      expandedTitle: expandedRoleRef.current,
      labels: {
        industry: Object.fromEntries(
          industries.map((industry) => [industry, labelIndustry(industry)]),
        ),
        mode: Object.fromEntries(modeFilters.map((mode) => [mode, labelMode(mode)])),
      },
    });
  }, [
    activeIndustry,
    activeModeFilter,
    industries,
    locale,
    modeFilters,
    query,
    visibleResultLimit,
    workerReady,
  ]);

  const visibleResults = useMemo(
    () => searchResult.visibleTitles.map((title) => roleByTitle.get(title)).filter(Boolean),
    [searchResult.visibleTitles],
  );

  const comparisonRoles = useMemo(
    () => searchResult.comparisonTitles.map((title) => roleByTitle.get(title)).filter(Boolean),
    [searchResult.comparisonTitles],
  );

  useEffect(() => {
    if (searchResult.total && !searchResult.includesExpanded && searchResult.firstTitle) {
      setExpandedRole(searchResult.firstTitle);
    }
  }, [searchResult]);

  const radarData = useMemo(
    () => [
      { dimension: t("dim.aiExposure"), value: expanded.aiExposure },
      { dimension: t("dim.demand"), value: expanded.demandGrowth },
      { dimension: t("dim.humanNeed"), value: expanded.humanNecessity },
      { dimension: t("dim.skillMobility"), value: expanded.skillMobility },
      { dimension: t("dim.automation"), value: expanded.automationRisk },
      { dimension: t("dim.confidence"), value: expanded.sourceConfidence },
    ],
    [expanded, locale],
  );

  const comparisonData = useMemo(
    () =>
      (comparisonRoles.length ? comparisonRoles : roleCatalog.slice(0, 6)).map((role) => ({
        name: getRoleTitle(role, locale).replace(" ", "\n"),
        opportunity: role.opportunity,
        risk: role.automationRisk,
      })),
    [comparisonRoles, locale],
  );

  const titleOf = (role) => getRoleTitle(role, locale);
  const domainOf = (role) => getDomainName(role, locale);
  const assessment = useMemo(
    () => buildRoleAssessment(expanded, locale, titleOf(expanded)),
    [expanded, locale],
  );
  const localizedRoleText = (role, field) => {
    if (locale === "en" && !role.generated) return role[field];
    if (field === "summary") {
      return t("role.generated.summary", {
        domain: domainOf(role),
      });
    }
    if (field === "changes") return t("role.generated.changes");
    if (field === "why") return t("role.generated.why");
    if (field === "prediction") {
      return t("role.generated.prediction", {
        role: titleOf(role),
        outlook: role.outlook,
      });
    }
    if (field === "signal") return t("role.generated.signal");
    return role[field];
  };

  return (
    <main
      className="site-shell"
      id="overview"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="scroll-meter" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className={scrollProgress > 0.08 ? "topbar on-light" : "topbar"}>
        <a className="brand" href="#overview" aria-label="Future Work Observatory">
          Future Work Observatory
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          {navItems.map(([label, target]) => (
            <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>
              {t(label)}
            </a>
          ))}
        </nav>
        <label className="language-picker">
          <span>Language</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </header>

      <section className="hero">
        <img
          src="/assets/hero-future-work-observatory.png"
          alt="Professionals looking across a sustainable future city from a glass workplace terrace"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1>{t("hero.title")}</h1>
          <p className="hero-copy">
            {t("hero.copy")}
          </p>
          <div className="hero-actions">
            <a className="text-link light" href="#explorer">
              {t("hero.search")} <IconArrowRight size={18} />
            </a>
            <a className="text-link light muted" href="#sources">
              {t("hero.sources")} <IconExternalLink size={17} />
            </a>
          </div>
        </div>
        <aside className="hero-marker" aria-label="Page sections">
          <span />
          <span />
          <span />
          <span />
        </aside>
      </section>

      <section className="explorer-section" id="explorer">
        <div className="explorer-heading">
          <div>
            <div className="section-kicker">{t("explorer.kicker")}</div>
            <h2>{t("explorer.title")}</h2>
          </div>
          <p>{t("explorer.copy")}</p>
        </div>

        <div className="search-panel">
          <label className="search-box">
            <IconSearch size={21} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("explorer.placeholder")}
              type="search"
            />
          </label>
          <div className="filter-row" aria-label="Prediction filters">
            <IconAdjustmentsHorizontal size={18} />
            {industries.map((industry) => (
              <button
                className={industry === activeIndustry ? "filter-chip active" : "filter-chip"}
                key={industry}
                type="button"
                onClick={() => setActiveIndustry(industry)}
              >
                {labelIndustry(industry)}
              </button>
            ))}
          </div>
          <div className="filter-row compact" aria-label="Transition type filters">
            {modeFilters.map((mode) => (
              <button
                className={mode === activeModeFilter ? "filter-chip active" : "filter-chip"}
                key={mode}
                type="button"
                onClick={() => setActiveModeFilter(mode)}
              >
                {labelMode(mode)}
              </button>
            ))}
          </div>
        </div>

        <div className="forecast-lenses" aria-label="Forecast lenses">
          {forecastLenses.map(([mode, titleKey, copyKey]) => (
            <button
              className={mode === activeModeFilter ? "forecast-lens active" : "forecast-lens"}
              key={mode}
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIndustry("All");
                setActiveModeFilter(mode);
              }}
            >
              <strong>{t(titleKey)}</strong>
              <span>{t(copyKey)}</span>
            </button>
          ))}
        </div>

        <div className="prediction-layout">
          <div
            className={searchLoading ? "result-list is-loading" : "result-list"}
            aria-busy={searchLoading}
            aria-label="Search results"
          >
            <div className="result-list-header">
              <strong>{t("explorer.matching", { count: searchResult.total })}</strong>
              <span>
                {t("explorer.ranked")} /{" "}
                {t("explorer.showing", {
                  shown: Math.min(searchResult.total, visibleResultLimit),
                  total: searchResult.total,
                })}
              </span>
              {searchLoading && (
                <span className="search-loading">
                  <IconLoader2 size={14} />
                  {t("explorer.loading")}
                </span>
              )}
            </div>
            {visibleResults.map((role) => {
              const rowTone =
                role.automationRisk >= 70 && role.opportunity < 62
                  ? " pressure"
                  : role.mode === "Human-Anchored"
                    ? " anchored"
                    : "";

              return (
                <button
                  className={`${role.title === expanded.title ? "result-row active" : "result-row"}${rowTone}`}
                  key={role.title}
                  type="button"
                  onClick={() => setExpandedRole(role.title)}
                >
                  <span>
                    <strong>{titleOf(role)}</strong>
                    <small>{labelIndustry(role.industry)} / {labelMode(role.mode)}</small>
                  </span>
                  <mark>{role.opportunity}</mark>
                </button>
              );
            })}
            {!searchLoading && !searchResult.total && (
              <div className="empty-results">
                {t("explorer.noResults")}
              </div>
            )}
          </div>

          <article className="prediction-card">
            <div className="prediction-card-head">
              <div>
                <span className="detail-mode">{labelMode(expanded.mode)}</span>
                <h3>{titleOf(expanded)}</h3>
                <p>{localizedRoleText(expanded, "prediction")}</p>
              </div>
              <div className="score-lockup">
                <span>{expanded.opportunity}</span>
                <small>{t("score.2028")}</small>
              </div>
            </div>

            <section className="assessment-panel" aria-label={t("assessment.kicker")}>
              <div className="assessment-lede">
                <span>
                  <IconFlag size={18} />
                  {t("assessment.kicker")}
                </span>
                <strong>{assessment.verdict}</strong>
              </div>
              <p>{assessment.summary}</p>
              <div className="assessment-metrics">
                <span>{t("dim.aiExposure")} {expanded.aiExposure}</span>
                <span>{t("dim.automation")} {expanded.automationRisk}</span>
                <span>{t("dim.humanNeed")} {expanded.humanNecessity}</span>
                <span>{t("dim.confidence")} {expanded.sourceConfidence}</span>
              </div>
              <div className="assessment-direction">
                <h4>{t("assessment.direction")}</h4>
                <p>{assessment.direction}</p>
              </div>
              <div className="assessment-grid">
                <div>
                  <h4>{t("assessment.upside")}</h4>
                  <p>{assessment.upside}</p>
                </div>
                <div>
                  <h4>{t("assessment.watch")}</h4>
                  <p>{assessment.watch}</p>
                </div>
                <div>
                  <h4>{t("assessment.move")}</h4>
                  <p>{assessment.move}</p>
                </div>
                <div>
                  <h4>{t("assessment.transition")}</h4>
                  <p>{assessment.transition}</p>
                </div>
              </div>
              <p className="assessment-basis">
                <strong>{t("assessment.basis")}:</strong> {assessment.basis}
              </p>
            </section>

            <div className="chart-grid">
              <div className="chart-card radar-card">
                <div className="chart-title">
                  <IconChartRadar size={18} />
                  <strong>{t("chart.radar")}</strong>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData} outerRadius="74%">
                    <PolarGrid stroke="rgba(16,23,21,.16)" />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={{ fill: "#62706b", fontSize: 11, fontWeight: 700 }}
                    />
                    <Radar
                      dataKey="value"
                      fill="#3f9d65"
                      fillOpacity={0.28}
                      stroke="#3f9d65"
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <div className="chart-title">
                  <IconTimelineEvent size={18} />
                  <strong>{t("chart.curve")}</strong>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={yearlyChart(expanded.yearly)} margin={{ top: 16, right: 20, bottom: 8, left: -20 }}>
                    <CartesianGrid stroke="rgba(16,23,21,.1)" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#62706b", fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#62706b", fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="opportunity"
                      stroke="#2460d2"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#d8ef45", stroke: "#101715", strokeWidth: 1 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card wide">
                <div className="chart-title">
                  <IconTargetArrow size={18} />
                  <strong>{t("chart.compare")}</strong>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={comparisonData} margin={{ top: 12, right: 20, bottom: 38, left: -20 }}>
                    <CartesianGrid stroke="rgba(16,23,21,.1)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#62706b", fontSize: 11 }} interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#62706b", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="opportunity" fill="#3f9d65" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="risk" fill="#f0a06f" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="prediction-explain">
              <div>
                <h4>{t("explain.signal")}</h4>
                <p>{localizedRoleText(expanded, "signal")}</p>
              </div>
              <div>
                <h4>{t("explain.skill")}</h4>
                <p>
                  {t("role.generated.skillMove", {
                    from: expanded.from.join(", "),
                    skills: expanded.skills.join(", "),
                  })}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-kicker">{t("timeline.kicker")}</div>
        <div className="timeline-grid">
          <div className="timeline-intro">
            <h2>{t("timeline.title")}</h2>
            <p>{t("timeline.copy")}</p>
            <div className="selected-year">
              <IconTimelineEvent size={20} />
              <span>{activeTimeline.year}</span>
              <strong>{activeTimeline.title}</strong>
            </div>
          </div>
          <div className="year-track" role="list" aria-label="Career shift timeline">
            {timeline.map((item) => (
              <button
                key={item.year}
                className={item.year === activeYear ? "year-node active" : "year-node"}
                type="button"
                onClick={() => setActiveYear(item.year)}
              >
                <span className="year-dot" />
                <span className="year-label">{item.year}</span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="forces-section" id="forces">
        <div className="section-kicker">{t("forces.kicker")}</div>
        <h2>{t("forces.title")}</h2>
        <div className="force-grid">
          {forces.map((force) => {
            const metricClass = /[0-9+]/.test(force.metric) ? "metric-number" : "metric-phrase";

            return (
              <a className="force-card" href={force.href} key={force.source} target="_blank" rel="noreferrer">
                <span className="force-source">{force.source}</span>
                <strong className={metricClass}>{force.metric}</strong>
                <em>{force.label}</em>
                <p>{force.detail}</p>
                <span className="read-more">
                  Read the research <IconArrowRight size={16} />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="modes-section">
        <div className="modes-heading">
          <div>
            <div className="section-kicker">{t("modes.kicker")}</div>
            <h2>{t("modes.title")}</h2>
          </div>
          <p>{t("modes.copy")}</p>
        </div>
        <div className="mode-grid">
          {changeModes.map((mode) => (
            <article className="mode-panel" key={mode.title}>
              <span>{mode.value}</span>
              <h3>{labelMode(mode.title)}</h3>
              <p>{mode.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="roles-section" id="roles">
        <div className="roles-heading">
          <div>
            <div className="section-kicker">{t("roles.kicker")}</div>
            <h2>{t("roles.title")}</h2>
          </div>
          <p>{t("roles.copy")}</p>
        </div>

        <div className="role-layout">
          <article className="featured-role" aria-live="polite">
            <img src={expanded.image} alt={`${expanded.title} detail scene`} />
            <div className="detail-content">
              <span className="detail-mode">{labelMode(expanded.mode)}</span>
              <h3>{titleOf(expanded)}</h3>
              <p>{localizedRoleText(expanded, "summary")}</p>
              <div className="detail-block">
                <h4>{t("detail.changes")}</h4>
                <p>{localizedRoleText(expanded, "changes")}</p>
              </div>
              <div className="detail-block">
                <h4>{t("detail.why")}</h4>
                <p>{localizedRoleText(expanded, "why")}</p>
              </div>
              <div className="detail-columns">
                <div>
                  <h4>{t("detail.skills")}</h4>
                  <ul>
                    {expanded.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{t("detail.transfer")}</h4>
                  <ul>
                    {expanded.from.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="source-note">
                <IconChevronDown size={18} />
                <span>{expanded.source}</span>
              </div>
            </div>
          </article>

          <div className="role-grid">
            {enhancedRoles.map((role) => {
              const Icon = role.icon;
              const isOpen = expandedRole === role.title;
              return (
                <article className={isOpen ? "role-card expanded" : "role-card"} key={role.title}>
                  <button
                    type="button"
                    className="role-trigger"
                    onClick={() => setExpandedRole(role.title)}
                    aria-expanded={isOpen}
                  >
                    <img src={role.image} alt={`${role.title} work scene`} />
                    <span className="role-body">
                      <span className="role-meta">
                        <span className="role-mode">{labelMode(role.mode)}</span>
                        <Icon size={18} />
                      </span>
                      <strong>{titleOf(role)}</strong>
                      <span>{localizedRoleText(role, "summary")}</span>
                      <span className="role-footer">
                        <small>{t("detail.outlook")}</small>
                        <mark>{role.outlook}</mark>
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="outlook-section">
        <div className="outlook-image" aria-hidden="true" />
        <div className="outlook-copy">
          <div className="section-kicker">{t("outlook.kicker")}</div>
          <h2>{t("outlook.title")}</h2>
          <p>{t("outlook.copy")}</p>
          <a className="text-link" href="#sources">
            {t("outlook.link")} <IconArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="sources-section" id="sources">
        <div>
          <div className="section-kicker">{t("sources.kicker")}</div>
          <h2>{t("sources.title")}</h2>
        </div>
        <p>{t("sources.copy")}</p>
        <div className="source-list">
          <a href={sourceLinks.openaiJobs} target="_blank" rel="noreferrer">
            OpenAI AI Jobs Transition Framework <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.openaiBlueprint} target="_blank" rel="noreferrer">
            OpenAI Workforce Blueprint <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.openaiCareersDeployment} target="_blank" rel="noreferrer">
            OpenAI Deployment Hiring Signals <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.openaiCareersForwardDeployed} target="_blank" rel="noreferrer">
            OpenAI Forward-Deployed Hiring Signals <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.anthropicIndex} target="_blank" rel="noreferrer">
            Anthropic Economic Index <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.anthropicCode} target="_blank" rel="noreferrer">
            Anthropic Agentic Coding Research <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.anthropicCareers} target="_blank" rel="noreferrer">
            Anthropic Applied AI Hiring Signals <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.wef} target="_blank" rel="noreferrer">
            WEF Future of Jobs Report 2025 <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.bls} target="_blank" rel="noreferrer">
            BLS Fastest-Growing Occupations <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsOoh} target="_blank" rel="noreferrer">
            BLS Occupational Outlook Handbook <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsSoc} target="_blank" rel="noreferrer">
            BLS Standard Occupational Classification <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsDeclining} target="_blank" rel="noreferrer">
            BLS Fastest-Declining Occupations <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsSports} target="_blank" rel="noreferrer">
            BLS Entertainment & Sports Outlook <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsProgrammers} target="_blank" rel="noreferrer">
            BLS Computer Programmers Outlook <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsSoftware} target="_blank" rel="noreferrer">
            BLS Software Developers & QA Outlook <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.blsWeb} target="_blank" rel="noreferrer">
            BLS Web Developers Outlook <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.wefDeclining} target="_blank" rel="noreferrer">
            WEF Fastest Growing and Declining Jobs <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.onet} target="_blank" rel="noreferrer">
            O*NET Occupation Taxonomy <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.onetAll} target="_blank" rel="noreferrer">
            O*NET See All Occupations <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.qianmuCareers} target="_blank" rel="noreferrer">
            Qianmu Career List <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.chinaOccupationPdf} target="_blank" rel="noreferrer">
            China Occupational Classification PDF <IconExternalLink size={16} />
          </a>
          <a href={sourceLinks.pwc} target="_blank" rel="noreferrer">
            PwC AI Jobs Barometer <IconExternalLink size={16} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>Future Work Observatory</span>
        <span>{t("footer.trust")}</span>
        <a href="#overview" aria-label="Back to top">
          {t("footer.top")} <IconArrowRight size={16} />
        </a>
      </footer>
    </main>
  );
}
