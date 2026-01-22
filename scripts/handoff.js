/**
 * Handoff Snapshot Generator
 *
 * Generates /handoff/status.json for cross-AI collaboration.
 * Run with: npm run handoff
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'handoff', 'status.json');

// Helper: safe file read
function readFile(relativePath) {
  try {
    return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8');
  } catch {
    return null;
  }
}

// Helper: safe JSON parse
function parseJSON(content) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// Helper: run git command
function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: ROOT, encoding: 'utf-8' }).trim();
  } catch {
    return '';
  }
}

// Helper: grep for pattern in files
function grepFiles(pattern, extensions = ['.ts', '.tsx', '.js']) {
  const results = [];

  function walk(dir, depth = 0) {
    if (depth > 5) return; // Limit depth
    if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist')) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath, depth + 1);
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (pattern.test(line)) {
                results.push({
                  file: path.relative(ROOT, fullPath).replace(/\\/g, '/'),
                  line: idx + 1,
                  match: line.trim()
                });
              }
            });
          } catch {}
        }
      }
    } catch {}
  }

  walk(ROOT);
  return results;
}

// Helper: check if file/dir exists
function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

// Extract env variable names (not values!)
function extractEnvNames() {
  const required = new Set();
  const optional = new Set();

  // Backend env usage
  const backendEnv = grepFiles(/process\.env\.(\w+)/);
  backendEnv.forEach(r => {
    const match = r.match.match(/process\.env\.(\w+)/);
    if (match) required.add(match[1]);
  });

  // Frontend env usage (EXPO_PUBLIC_*)
  const frontendEnv = grepFiles(/EXPO_PUBLIC_\w+/);
  frontendEnv.forEach(r => {
    const match = r.match.match(/EXPO_PUBLIC_(\w+)/);
    if (match) required.add(`EXPO_PUBLIC_${match[1]}`);
  });

  // Known required
  ['DATABASE_URL', 'OAUTH_SERVER_URL', 'OPENAI_API_KEY', 'FORGEAPIKEY'].forEach(k => required.add(k));

  // Known optional
  ['LLM_MODEL', 'LLM_BASE_URL', 'NODE_ENV'].forEach(k => {
    required.delete(k);
    optional.add(k);
  });

  return {
    required_names: [...required].sort(),
    optional_names: [...optional].sort()
  };
}

// Extract key UI strings
function extractKeyStrings() {
  const keyLabels = [];

  const patterns = [
    { pattern: /["']家長攻略["']/, key: 'parent_guide' },
    { pattern: /["']篩選["']/, key: 'filter' },
    { pattern: /["']找學校["']/, key: 'find_school' },
    { pattern: /["']推薦結果["']/, key: 'recommendation_results' },
    { pattern: /["']深度报告和攻略["']/, key: 'pro_report_button' },
    { pattern: /["']升級至 Pro["']/, key: 'upgrade_to_pro' },
    { pattern: /["']學校詳情["']/, key: 'school_detail' },
    { pattern: /["']加入對比["']/, key: 'add_to_compare' },
    { pattern: /["']申請連結["']/, key: 'apply_link' },
    { pattern: /["']重新篩選["']/, key: 'restart_filter' },
  ];

  patterns.forEach(({ pattern, key }) => {
    const matches = grepFiles(pattern);
    if (matches.length > 0) {
      const m = matches[0];
      const zhMatch = m.match.match(/["']([^"']+)["']/);
      keyLabels.push({
        key,
        zh_hant: zhMatch ? zhMatch[1] : '',
        location: `${m.file}:${m.line}`
      });
    }
  });

  return keyLabels;
}

// Detect modules
function detectModules() {
  return {
    qa: {
      enabled: exists('app/quiz.tsx') || exists('components/quiz-flow.tsx'),
      notes: 'Quiz flow for school recommendations'
    },
    filters: {
      enabled: exists('components/filter-sheet.tsx'),
      notes: 'Filter sheet for school search'
    },
    guides: {
      enabled: exists('app/articles/index.tsx'),
      notes: 'Educational articles and guides',
      has_parent_letter_gate: false,
      parent_letter_button_text: ''
    },
    map: {
      enabled: exists('app/school-map.tsx'),
      notes: 'School map view',
      uses_filters: true
    },
    compare: {
      enabled: exists('app/school-compare.tsx'),
      notes: 'Compare up to 3 schools'
    },
    timeline: {
      enabled: exists('app/deadlines.tsx'),
      notes: 'Application deadlines tracker',
      is_generic_checklist_only: false
    },
    membership: {
      enabled: exists('components/upgrade-modal.tsx'),
      notes: 'Pro membership with AI reports',
      plan: 'B-manual-pro'
    }
  };
}

// Detect navigation tabs
function detectNavigation() {
  const tabs = [];
  const entryPoints = [];

  // Check tabs layout
  if (exists('app/(tabs)')) {
    const tabFiles = ['index.tsx', 'search.tsx', 'explore.tsx'];
    const tabLabels = {
      'index.tsx': { id: 'home', label: '首頁', route: '/' },
      'search.tsx': { id: 'search', label: '找學校', route: '/search' },
      'explore.tsx': { id: 'explore', label: '探索', route: '/explore' }
    };

    tabFiles.forEach(f => {
      if (exists(`app/(tabs)/${f}`)) {
        const info = tabLabels[f];
        tabs.push({
          id: info.id,
          label_zh_hant: info.label,
          route: info.route
        });
      }
    });
  }

  // Entry points
  const routes = [
    { name: 'Quiz', route: '/quiz', notes: 'School recommendation quiz' },
    { name: 'Recommendation', route: '/recommendation', notes: 'Quiz results' },
    { name: 'Report', route: '/report', notes: 'Simple report (free)' },
    { name: 'Pro Report', route: '/report-pro', notes: 'AI pro report (paid)' },
    { name: 'School Detail', route: '/school/[id]', notes: 'School detail page' },
    { name: 'School Map', route: '/school-map', notes: 'Map view' },
    { name: 'Compare', route: '/school-compare', notes: 'School comparison' },
    { name: 'Articles', route: '/articles', notes: 'Guides and articles' },
    { name: 'Deadlines', route: '/deadlines', notes: 'Application deadlines' },
  ];

  routes.forEach(r => {
    const routePath = `app${r.route.replace('[id]', '[id]')}.tsx`;
    if (exists(routePath) || exists(routePath.replace('.tsx', '/index.tsx'))) {
      entryPoints.push(r);
    }
  });

  return { tabs, entry_points: entryPoints };
}

// Main generator
function generate() {
  const pkg = parseJSON(readFile('package.json')) || { name: 'unknown', version: '0.0.0' };

  const status = {
    meta: {
      generated_at_utc: new Date().toISOString(),
      git: {
        branch: git('rev-parse --abbrev-ref HEAD'),
        commit: git('rev-parse --short HEAD')
      },
      app: {
        name: pkg.name || 'offer-app',
        version: pkg.version || '1.0.0'
      }
    },
    navigation: detectNavigation(),
    modules: detectModules(),
    strings: {
      key_labels: extractKeyStrings()
    },
    env: extractEnvNames(),
    backend: {
      railway_url: 'https://<project>.up.railway.app',
      oauth: {
        provider: 'manus',
        base_url_env: 'OAUTH_SERVER_URL'
      }
    },
    frontend: {
      web_preview: {
        provider: 'railway',
        base_url: 'https://<project>.up.railway.app'
      },
      api_base_url_env: 'EXPO_PUBLIC_API_BASE_URL'
    },
    todo: {
      p0: [
        'Test AI Pro report generation end-to-end',
        'Verify membership upgrade flow'
      ],
      p1: [
        'Implement actual payment integration',
        'Add report sharing feature'
      ],
      p2: [
        'Analytics for report generation',
        'Cache optimization'
      ]
    }
  };

  // Ensure handoff directory exists
  const handoffDir = path.join(ROOT, 'handoff');
  if (!fs.existsSync(handoffDir)) {
    fs.mkdirSync(handoffDir, { recursive: true });
  }

  // Write with stable formatting
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(status, null, 2) + '\n');

  console.log(`✓ Generated ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`  Branch: ${status.meta.git.branch}`);
  console.log(`  Commit: ${status.meta.git.commit}`);
  console.log(`  Modules: ${Object.entries(status.modules).filter(([,v]) => v.enabled).map(([k]) => k).join(', ')}`);

  // Security check
  const content = fs.readFileSync(OUTPUT_PATH, 'utf-8');
  const sensitivePatterns = [/sk-[a-zA-Z0-9]+/, /mysql:\/\//, /mongodb:\/\//, /postgres:\/\//, /Bearer\s+[a-zA-Z0-9]+/];
  const hasSecrets = sensitivePatterns.some(p => p.test(content));
  if (hasSecrets) {
    console.error('⚠️  WARNING: Potential secrets detected in output!');
    process.exit(1);
  } else {
    console.log('  Security: No secrets detected ✓');
  }
}

generate();
