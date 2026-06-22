# Just Jinja - a simple static site generator using Jinja2 templates
# 
# This project is free and open source software, licensed under the MIT License.
# You should have received a copy of the MIT License along with this project. If not, see <https://github.com/samuelh2005/just-jinja/blob/main/LICENSE>.
# 
# Copyright (c) 2026 Samuel Hulme.
#
# The above copyright notice shall be included in all copies or substantial portions of the Software.

from __future__ import annotations

from abc import ABC, abstractmethod
from collections import defaultdict
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from yaml import safe_load
from wenmode import Wenmode
import argparse
import datetime

__version__ = "0.1.0"
__copyright__ = "Copyright (c) 2026 Samuel Hulme. MIT License."

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--site-dir", type=Path, default=Path("."), help="Path to the site directory (default: current directory)")
parser.add_argument("-o", "--output-dir", type=Path, default=Path("dist"), help="Path to the output directory (default: dist)")
parser.add_argument("-v", "--version", action="version", version=f"%(prog)s {__version__} {__copyright__}")
args = parser.parse_args()

SITE_DIR = args.site_dir

# Check if the site directory exists
if not SITE_DIR.exists():
    print(f"Error: Site directory '{SITE_DIR}' does not exist. See '{parser.prog} --help' for usage.")
    exit(1)

PAGES_DIR = SITE_DIR.resolve() / "pages"
TEMPLATES_DIR = SITE_DIR.resolve() / "templates"
CONFIG_PATH = SITE_DIR.resolve() / "site.yaml"

# Check if config file exists

if not CONFIG_PATH.exists():
    print(f"Error: Config file '{CONFIG_PATH}' does not exist. See '{parser.prog} --help' for usage.")
    exit(1)

DIST_DIR = args.output_dir

with open(CONFIG_PATH, "r", encoding="utf-8") as f:
    config = safe_load(f)

DIST_DIR.mkdir(exist_ok=True)

BUILD_TIME = datetime.datetime.now()

env = Environment(
    loader=FileSystemLoader([
        str(PAGES_DIR),
        str(TEMPLATES_DIR)
    ])
)
wenmode = Wenmode()

def page_url(path: Path) -> str:
    """
    Convert pages/foo/bar.html -> /foo/bar/
    Convert pages/index.html -> /
    """
    rel = path.relative_to(PAGES_DIR)
    url = "/" + str(rel).replace("\\", "/")

    if url.endswith("/index.html"):
        url = url[:-10]
        if url == "":
            url = "/"

    return url


def output_path_for(page_path: Path) -> Path:
    """
    Preserve folder structure in dist/
    """
    rel = page_path.relative_to(PAGES_DIR)
    return DIST_DIR / rel


def template_name(page_path: Path) -> str:
    """
    Resolve template relative to loader roots.
    Pages are rendered as templates directly.
    """
    return str(page_path.relative_to(PAGES_DIR)).replace("\\", "/")

# ============================================================
# Processors
# ============================================================

def html_processor(path: Path, yaml: Path | None):
    print(f"Processing HTML path={path} yaml={yaml}")
    template = env.get_template(template_name(path))

    if yaml and yaml.exists():
        with open(yaml, "r", encoding="utf-8") as f:
            page_data = safe_load(f)
    else:
        page_data = None    

    current_url = page_url(path)

    content = template.render(
        config=config,
        page_data=page_data,
        current_url=current_url,
        build_time=BUILD_TIME
    )

    out_path = output_path_for(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    out_path.write_text(content, encoding="utf-8")
    print(f"Wrote {out_path}")

def markdown_processor(path: Path):
    print(f"Processing Markdown path={path}")
    with open(path, "r", encoding="utf-8") as f:
        markdown_content = f.read()

    # We need to get the frontmatter and content separately, so we can pass the frontmatter to the template.
    if markdown_content.startswith("---"):
        _, frontmatter, content = markdown_content.split("---", 2)
        frontmatter_data = safe_load(frontmatter)

        body_content = wenmode.render(content)
        # The template to use is specified in the frontmatter, and is resolved relative to the loader roots.
        template_name = frontmatter_data.get("template")
        if not template_name:
            print(f"Invalid markdown file {path}: missing 'template' in frontmatter. Skipping.")
            return
        
        template = env.get_template(template_name)
        # We pass the frontmatter data to the template as page_data, and the rendered content as content.   
        rendered_content = template.render(
            config=config,
            page_data=frontmatter_data,
            content=body_content,
            current_url=page_url(path),
            build_time=BUILD_TIME
        )

        out_path = output_path_for(path.with_suffix(".html"))
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(rendered_content, encoding="utf-8")
        print(f"Wrote {out_path}")
    else:
        print(f"Invalid markdown file {path}: missing frontmatter. Skipping.")


def other_processor(path: Path):
    print(f"Processing Other path={path}")
    out_path = output_path_for(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(path.read_bytes())
    print(f"Copied {path} to {out_path}")


# ============================================================
# Types
# ============================================================

# Example:
#
# {
#     ".html": Path("site/index.html"),
#     ".yaml": Path("site/index.yaml")
# }
#
FileGroup = dict[str, Path]


# ============================================================
# Rules
# ============================================================

class Rule(ABC):

    priority = 0

    @abstractmethod
    def matches(self, group: FileGroup) -> bool:
        ...

    @abstractmethod
    def process(self, group: FileGroup):
        ...


class HtmlWithYamlRule(Rule):

    priority = 100

    def matches(self, group: FileGroup) -> bool:
        return (
            ".html" in group
            and any(ext in group for ext in (".yaml", ".yml"))
        )

    def process(self, group: FileGroup):
        yaml = group.get(".yaml") or group.get(".yml")

        html_processor(
            group[".html"],
            yaml,
        )


class HtmlRule(Rule):

    priority = 90

    def matches(self, group: FileGroup) -> bool:
        return ".html" in group

    def process(self, group: FileGroup):
        html_processor(
            group[".html"],
            None,
        )


class MarkdownRule(Rule):

    priority = 80

    def matches(self, group: FileGroup) -> bool:
        return ".md" in group

    def process(self, group: FileGroup):
        markdown_processor(
            group[".md"]
        )


class OtherRule(Rule):

    priority = -999999

    def matches(self, group: FileGroup) -> bool:
        return True

    def process(self, group: FileGroup):

        for path in group.values():
            other_processor(path)


# ============================================================
# Router
# ============================================================

class Router:

    def __init__(self, rules: list[Rule]):

        self.rules = sorted(
            rules,
            key=lambda r: r.priority,
            reverse=True,
        )

    def route(self, group: FileGroup):

        for rule in self.rules:

            if rule.matches(group):
                rule.process(group)
                return

        raise RuntimeError(
            f"No rule matched {group}"
        )


# ============================================================
# Indexer
# ============================================================

class FileIndexer:

    def __init__(self, root: Path):

        self.root = Path(root)

    def build(self) -> dict[Path, FileGroup]:

        groups = defaultdict(dict)

        for path in self.root.rglob("*"):

            if not path.is_file():
                continue

            # site/index.html
            # -> site/index

            identity = path.with_suffix("")

            groups[identity][path.suffix.lower()] = path

        return dict(groups)


# ============================================================
# Engine
# ============================================================

class Engine:

    def __init__(
        self,
        root: Path,
        router: Router,
    ):

        self.root = Path(root)
        self.router = router

    def run(self):

        index = FileIndexer(
            self.root
        ).build()

        for group in index.values():
            self.router.route(group)


# ============================================================
# Setup
# ============================================================

router = Router(
    [
        HtmlWithYamlRule(),
        HtmlRule(),
        MarkdownRule(),
        OtherRule(),
    ]
)

engine = Engine(
    root=PAGES_DIR,
    router=router,
)

if __name__ == "__main__":
    engine.run()

