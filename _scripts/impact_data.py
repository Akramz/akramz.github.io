# Refresh the code section of _data/impact.yml: stars, last commit, weekly contributions.
# Contributions = commits + PRs opened + issues opened + PRs reviewed, by both GitHub accounts,
# counted from each repo's public date. Papers are kept as-is (update citations by hand).
# Usage: python3 _scripts/impact_data.py   (needs `gh` logged in; AI4G reads ../goodworks)
import collections, datetime as dt, json, pathlib, re, subprocess, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "_data" / "impact.yml"
GOODWORKS = ROOT.parent / "goodworks"
USERS = ["Akramz", "akramzaytar_microsoft"]


def gh(*args):
    return subprocess.check_output(["gh", "api", *args], text=True)


def weeks(dates, start):
    c = collections.Counter()
    for d in dates:
        if d >= start:
            x = dt.date.fromisoformat(d)
            c[max((x - dt.timedelta(days=x.weekday())).isoformat(), start)] += 1
    return sorted(c.items())


src = DATA.read_text()
head = src[: src.index("code:")]
papers = src[src.index("papers:"):]
projects = re.findall(r'name: "([^"]*)"\n    url: "([^"]*)"\n    desc: "([^"]*)"\n    public: "([^"]*)"', src)

events = collections.defaultdict(list)
for q in ["type:pr author:{u}", "type:issue author:{u}", "type:pr reviewed-by:{u} -author:{u}"]:
    for u in USERS:
        out = gh("-X", "GET", "search/issues", "-f", "q=" + q.format(u=u), "-f", "per_page=100", "--paginate",
                 "--jq", '.items[]|(.repository_url|sub(".*/repos/";""))+" "+.created_at[:10]')
        for line in out.splitlines():
            repo, d = line.split()
            events[repo.lower()].append(d)
        time.sleep(2)

rows = []
for name, url, desc, public in projects:
    if "github.com/" in url:
        repo = url.split("github.com/")[1]
        stars = json.loads(gh(f"repos/{repo}", "--jq", ".stargazers_count"))
        shas = {}
        for u in USERS:
            out = gh(f"repos/{repo}/commits?author={u}&per_page=100", "--paginate", "--jq", '.[]|.sha+" "+.commit.author.date[:10]')
            for line in out.splitlines():
                sha, d = line.split()
                shas[sha] = d
        commits = list(shas.values())
    else:
        repo, stars = "Akramz/goodworks", 0
        log = subprocess.check_output(["git", "-C", str(GOODWORKS), "log", "origin/HEAD", "--format=%ad %an", "--date=short"], text=True)
        commits = [line.split()[0] for line in log.splitlines() if "bot" not in line]
    other = events.get(repo.lower(), [])
    w = weeks(commits + other, public)
    last = max([d for d in commits if d >= public] or [d for d in other if d >= public] or [public])
    rows.append((last, name, url, desc, public, stars, sum(n for _, n in w), w))

rows.sort(reverse=True)
out = [head + "code:"]
for last, name, url, desc, public, stars, total, w in rows:
    act = ", ".join(f'["{d}", {n}]' for d, n in w)
    out.append(f'  - name: "{name}"\n    url: "{url}"\n    desc: "{desc}"\n    public: "{public}"\n    stars: {stars}\n'
               f'    total: {total}\n    last: "{last}"\n    weeks: [{act}]')
DATA.write_text("\n".join(out) + "\n\n" + papers)
print("\n".join(f"{r[0]}  {r[1]}" for r in rows))
