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
from pathlib import Path
from typing import Dict, List
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
    try:
        rel = page_path.relative_to(PAGES_DIR)
        return DIST_DIR / rel
    except ValueError:
        pass

    try:
        rel = page_path.relative_to(TEMPLATES_DIR)
        return DIST_DIR / rel
    except ValueError:
        pass

    # fallback (should not normally happen)
    return DIST_DIR / page_path.name


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
    roots: List[Path]
    priority = 0

    def __init__(self, roots: List[Path]):
        self.roots = roots

    @abstractmethod
    def matches(self, group: FileGroup) -> bool:
        ...

    @abstractmethod
    def process(self, group: FileGroup):
        ...


class HtmlWithYamlRule(Rule):
    priority = 100

    def matches(self, group: FileGroup) -> bool:
        allowed_suffixes = {".html", ".yaml", ".yml"}

        if ".html" not in group:
            return False

        if not any(ext in group for ext in (".yaml", ".yml")):
            return False

        for p in group.values():
            if not p.is_relative_to(PAGES_DIR):
                return False
            if p.suffix.lower() not in allowed_suffixes:
                return False

        return True

    def process(self, group: FileGroup):
        yaml = group.get(".yaml") or group.get(".yml")

        html_processor(
            group[".html"],
            yaml,
        )


class HtmlRule(Rule):
    priority = 90

    def matches(self, group: FileGroup) -> bool:
        allowed_suffixes = {".html", ".yaml", ".yml"}

        if ".html" not in group:
            return False

        for p in group.values():
            if not p.is_relative_to(PAGES_DIR):
                return False
            if p.suffix.lower() not in allowed_suffixes:
                return False

        return True

    def process(self, group: FileGroup):
        html_processor(
            group[".html"],
            None,
        )


class MarkdownRule(Rule):
    priority = 80

    def matches(self, group: FileGroup) -> bool:
        if ".md" not in group:
            return False

        for p in group.values():
            if not p.is_relative_to(PAGES_DIR):
                return False
            if p.suffix.lower() != ".md":
                return False

        return True

    def process(self, group: FileGroup):
        markdown_processor(
            group[".md"]
        )


class OtherRule(Rule):
    priority = -999999

    def matches(self, group: FileGroup) -> bool:
        forbidden_suffixes = {".yaml", ".yml"}

        for p in group.values():
            if p.suffix.lower() in forbidden_suffixes:
                return False
            if p.is_relative_to(TEMPLATES_DIR) and p.suffix.lower() == ".html":
                return False

        return True

    def process(self, group: FileGroup):

        for path in group.values():
            other_processor(path)


# ============================================================
# Router
# ============================================================

class Router:
    def __init__(self, rules: List[Rule]):
        self.rules = sorted(
            rules,
            key=lambda r: r.priority,
            reverse=True,
        )

    def run(self):
        all_roots: List[Path] = []
        for r in self.rules:
            for root in r.roots:
                if root not in all_roots:
                    all_roots.append(root)

        groups: Dict[Path, FileGroup] = {}

        for root in all_roots:
            for file_path in root.rglob("*"):
                if not file_path.is_file():
                    continue

                identity = file_path.with_suffix("")

                if identity not in groups:
                    groups[identity] = {}

                groups[identity][file_path.suffix.lower()] = file_path

        # Execute rules (single pass, first match wins)
        for group in groups.values():
            for rule in self.rules:
                if rule.matches(group):
                    rule.process(group)
                    break


# ============================================================
# Setup
# ============================================================

router = Router(
    [
        HtmlWithYamlRule(roots=[PAGES_DIR]),
        HtmlRule(roots=[PAGES_DIR]),
        MarkdownRule(roots=[PAGES_DIR]),
        OtherRule(roots=[PAGES_DIR, TEMPLATES_DIR]),
    ]
)

if __name__ == "__main__":
    router.run()
