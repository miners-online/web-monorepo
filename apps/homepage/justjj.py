# Just Jinja - a simple static site generator using Jinja2 templates
# 
# This project is free and open source software, licensed under the MIT License.
# You should have received a copy of the MIT License along with this project. If not, see <https://github.com/samuelh2005/just-jinja/blob/main/LICENSE>.
# 
# Copyright (c) 2026 Samuel Hulme.
#
# The above copyright notice shall be included in all copies or substantial portions of the Software.

from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from yaml import safe_load
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

env = Environment(
    loader=FileSystemLoader([
        str(PAGES_DIR),
        str(TEMPLATES_DIR)
    ])
)

with open(CONFIG_PATH, "r", encoding="utf-8") as f:
    config = safe_load(f)

DIST_DIR.mkdir(exist_ok=True)

BUILD_TIME = datetime.datetime.now()


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


def render_page(page_path: Path):
    template = env.get_template(template_name(page_path))

    current_url = page_url(page_path)

    html = template.render(
        config=config,
        current_url=current_url,
        build_time=BUILD_TIME
    )

    out_path = output_path_for(page_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    out_path.write_text(html, encoding="utf-8")


def build():
    for page in PAGES_DIR.rglob("*.html"):
        render_page(page)


if __name__ == "__main__":
    build()
